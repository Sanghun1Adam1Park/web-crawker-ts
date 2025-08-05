import { expect, test } from 'vitest'
import { normalizeURL, getURLsFromHTML } from '../crawl'

test("normalizeURL: with / in the end (https)", () => {
  const inputURL = "https://blog.boot.dev/path/";
  const acutal = normalizeURL(inputURL);
  const expected = "blog.boot.dev/path";
  expect(acutal).toBe(expected)
})

test("normalizeURL: without / in the end (https)", () => {
  const inputURL = "https://blog.boot.dev/path";
  const acutal = normalizeURL(inputURL);
  const expected = "blog.boot.dev/path";
  expect(acutal).toBe(expected)})

test("normalizeURL: with / in the end (http)", () => {
  const inputURL = "http://blog.boot.dev/path/";
  const acutal = normalizeURL(inputURL);
  const expected = "blog.boot.dev/path";
  expect(acutal).toBe(expected)})

test("normalizeURL: without in the end (http)", () => {
  const inputURL = "http://blog.boot.dev/path";
  const acutal = normalizeURL(inputURL);
  const expected = "blog.boot.dev/path";
  expect(acutal).toBe(expected)})

test("getURLsFromHTML: absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML: relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML: both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});