import { normalizeURL } from "./crawl";

export function getReport(url: string, pages: Record<string, number>) {
  let result = `
=============================
REPORT for ${normalizeURL(url)}
=============================
  `
  for (const [key, value] of Object.entries(pages)) {
    result += `Found ${value} internal linkes to ${key}\n`; 
  }

  return result; 
}