import { URL } from "node:url";
import { InvlaidURLError } from "./errors/invalid-url-error";

export function normalizeURL(urlString: string) {
  let url;

  try {
    url = new URL(urlString);
  } catch {
    throw new InvlaidURLError("Error: Invlaid URL");
  }

  if (!(url.protocol === "http:" || url.protocol === "https:")) {
    throw new InvlaidURLError("Error: Not a http URL");
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
