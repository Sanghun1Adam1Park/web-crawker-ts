# Web Crawler CLI Application

> A command-line interface application for crawling websites and generating reports on internal links.

## Table of Contents

* [About The Project](#about-the-project)
* [Key Features](#key-features)
* [Built With](#built-with)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [How to Use](#how-to-use)
* [Example](#example)
* [Roadmap](#roadmap)
* [Acknowledgments](#acknowledgments)

## About The Project

This project is a custom-built command-line web crawler written in TypeScript. It is designed to generate an "internal links" report for any given website. The application starts at a specified base URL, recursively crawls all pages on the same domain, and keeps a count of how many times each internal page is linked to.

To handle network latency and improve performance, the crawler makes concurrent HTTP requests with a configurable limit, allowing for much faster site analysis compared to a sequential approach.

## Key Features

* **Concurrent Crawling:** Utilizes concurrent network requests to significantly speed up the process of crawling a website.
* **Internal Link Reporting:** Generates a clean, readable report detailing the number of internal links found for each page on the crawled site.
* **URL Normalization:** Implements a URL normalization function to ensure that different URLs pointing to the same page are treated as one.
* **CLI Operation:** Runs entirely from the command line, accepting a target URL as an argument.
* **HTML Parsing:** Uses JSDOM to reliably parse HTML content and extract all relevant links.

## Built With

* TypeScript
* Node.js
* JSDOM
* p-limit

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn

### Installation

1.  Clone this repository:
    ```bash
    git clone [https://github.com/Sanghun1Adam1Park/web-crawker-ts](https://github.com/Sanghun1Adam1Park/web-crawker-ts)
    ```
2.  Navigate to the project directory:
    ```bash
    cd web-crawker-ts
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## How to Use

The application is run via the command line and requires a single argument: the base URL of the website you wish to crawl.

From the project root, start the web crawler:

```bash
npm start <baseURL>
```

Replace `baseURL` with the full URL of the target website (e.g., https://wagslane.dev).

## Example

Here is an example of how to run the crawler on a blog and what the output might look like:

Run the command:
```bash
npm start [https://wagslane.dev](https://wagslane.dev)
```

Example output:
```bash 
crawling [https://wagslane.dev/](https://wagslane.dev/)
crawling [https://wagslane.dev/posts/things-i-dont-want-to-do-to-grow-my-blog/](https://wagslane.dev/posts/things-i-dont-want-to-do-to-grow-my-blog/)
crawling [https://wagslane.dev/posts/zen-of-prolific-creativity/](https://wagslane.dev/posts/zen-of-prolific-creativity/)
...

=============================
REPORT for wagslane.dev
=============================
Found 78 internal linkes to wagslane.dev
Found 2 internal linkes to wagslane.dev/about
Found 1 internal linkes to wagslane.dev/posts/leave-a-legacy
Found 1 internal linkes to wagslane.dev/posts/developers-cant-be-trusted
...
```

## Roadmap

Ideas for Extending the Project:

* Make the script run on a timer and deploy it to a server. Have it email you every so often with a report.
* Add more robust error checking so that you can crawl larger sites without issues.
* Count external links, as well as internal links, and add them to the report.
* Save the report as a CSV spreadsheet rather than printing it to the console.
* Use a graphics library to create an image that shows the links between the pages as a graph visualization.
* Make requests concurrently to speed up the crawling process.

## Acknowledgments

* Boot.dev - Backend dev Tutorial 
