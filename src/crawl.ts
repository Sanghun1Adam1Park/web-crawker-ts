import { URL } from "node:url";
import { InvlaidURLError } from "./errors/invalid-url-error";
import { JSDOM } from 'jsdom'
import { InvlaidHTMLError } from "./errors/invalid-html-error";

export function normalizeURL(urlString: string) {
  let url;

  try {
    url = new URL(urlString);
  } catch {
    console.error("Error: Invlaid URL");
    return; 
  }

  if (!(url.protocol === "http:" || url.protocol === "https:")) {
    console.error("Error: Not a http URL");
    return;
  }

  const normalizedURL = `${url.hostname}${removeTrailingSlash(url.pathname)}`
  return normalizedURL; 
}

function removeTrailingSlash(pathName: string): string {
  if (pathName.endsWith('/')) {
    return pathName.slice(0, -1);
  }
  return pathName;
}

export function getURLsFromHTML(html: string, baseURL: string) {
  const foundURLs = []; 
  let dom;

  try {
    dom = new JSDOM(html);
  } catch {
    console.error("Error: Invlaid HTML");
    return;
  }

  const anchors = dom.window.document.querySelectorAll('a'); 
  for (const anchor of anchors) {
    if (!anchor.hostname) { // relative
      foundURLs.push(`${baseURL}${anchor.toString()}`);
    } else { // absolute
      foundURLs.push(anchor.toString());
    }
  }

  return foundURLs; 
}

export async function getHTML(urlString: string) {
  try {
    const res = await fetch(urlString);

    const status = res.status;
    if (status >= 400) {
      console.error(`${status}:${res.statusText}`);
      return;
    }

    const contentTypeHeader = res.headers.get("content-type");
    if (!contentTypeHeader) {
      console.error("Malformed Response");
      return; 
    }
    
    const contentTypeHeaderContents = contentTypeHeader.split("; ");
    const contentType = contentTypeHeaderContents[0];
    const charset = contentTypeHeaderContents[1].split("=")[1];
    if (contentType !== 'text/html') {
      console.error(`Not sutialbe content type.`);
      return;
    }

    if (!res.body) {
      console.error("Empty body");
      return; 
    }
  
    let html = "";
    const decoder = new TextDecoder(charset); 

    for await (const chunk of res.body) {
      html += decoder.decode(chunk, { stream: true });
    }

    return html;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}