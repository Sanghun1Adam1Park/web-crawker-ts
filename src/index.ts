import { crawlSiteAsync } from "./concurrent-crawler";
import { getReport } from "./report";

async function main() {
  const args = process.argv;
  if (args.length !== 3) {
    console.error("node index.ts [url]");
    process.exit(1);
  }

  const requestedURL = args[2];
  const data = await crawlSiteAsync(requestedURL, 10);
  console.log(getReport(requestedURL, data));
  process.exit(0);
}

main();