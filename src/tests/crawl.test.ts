import { expect, test } from 'vitest'
import { normalizeURL } from '../crawl'
import { InvlaidURLError } from '../errors/invalid-url-error'

// 0. Invlaid URL 
test("invlaid url", () => {
  expect(() => {
    normalizeURL("hello, world!")
}).toThrow(InvlaidURLError); 
})

// 1. with / in the end (https)
test("with / in the end (https)", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

// 2. without / in the end (https)
test("without / in the end (https)", () => {
  expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

// 3. with / in the end (http)
test("with / in the end (http)", () => {
  expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

// 4. without in the end (http)
test("without in the end (http)", () => {
  expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})