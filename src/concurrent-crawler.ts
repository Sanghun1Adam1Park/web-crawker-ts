import pLimit, { LimitFunction } from "p-limit";
import { getURLsFromHTML, normalizeURL } from "./crawl";

class ConcurrentCrawler {
  private baseURL: string;
  private pages: Record<string, number>;
  private limit: LimitFunction;

  constructor(baseURL: string, maxConcurrency: number = 5) {
    this.baseURL = baseURL;
    this.pages = {};
    this.limit = pLimit(maxConcurrency);
  }

  private addPageVisit(normalizedURL: string): boolean {
    if (this.pages[normalizedURL]) {
      this.pages[normalizedURL]++;
      return false;
    } else {
      this.pages[normalizedURL] = 1;
      return true;
    }
  }

  private async getHTML(currentURL: string): Promise<string> {
    return await this.limit(async () => {
      let res;
      try {
        res = await fetch(currentURL);
      } catch (err) {
        throw new Error(`Got Network error: ${(err as Error).message}`);
      }

      if (res.status > 399) {
        throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("text/html")) {
        throw new Error(`Got non-HTML response: ${contentType}`);
      }

      return res.text();
    });
  }

  private async crawlPage(currentURL: string): Promise<void> {
    const currentURLObj = new URL(currentURL);
    const baseURLObj = new URL(this.baseURL);
    if (currentURLObj.hostname !== baseURLObj.hostname) {
      return;
    }

    const normalizedURL = normalizeURL(currentURL);

    if (!this.addPageVisit(normalizedURL)) {
      return;
    }

    console.log(`crawling ${currentURL}`);
    let html = "";
    try {
      html = await this.getHTML(currentURL);
    } catch (err) {
      console.log(`${(err as Error).message}`);
      return;
    }

    const nextURLs = getURLsFromHTML(html, this.baseURL);

    const crawlPromises = nextURLs.map((nextURL) => this.crawlPage(nextURL));

    await Promise.all(crawlPromises);
  }

  async crawl(): Promise<Record<string, number>> {
    await this.crawlPage(this.baseURL);
    return this.pages;
  }
}

export async function crawlSiteAsync(
  baseURL: string,
  maxConcurrency: number = 5,
): Promise<Record<string, number>> {
  const crawler = new ConcurrentCrawler(baseURL, maxConcurrency);
  return await crawler.crawl();
}