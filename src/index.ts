import { crawlSiteAsync } from "./concurrent-crawler";

async function main() {
  const args = process.argv;
  if (args.length !== 3) {
    console.error("node index.ts [url]");
    process.exit(1);
  }

  const data = await crawlSiteAsync(args[2], 10);
  console.log(data);
  process.exit(0);
}

main();