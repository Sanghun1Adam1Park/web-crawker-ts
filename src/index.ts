import { getHTML, getURLsFromHTML, normalizeURL } from "./crawl";

async function main() {
  const args = process.argv;
  if (args.length !== 3) {
    console.error("node index.ts [url]");
    process.exit(1);
  }

  const data = await getHTML(args[2]);
  console.log(`Recieved Data: ${data}`)
  process.exit(0);
}

main();