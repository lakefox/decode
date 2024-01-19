# DuckDuckGo Search JS

Scraping search results from DuckDuckGo's Lite page using Node.js is a great way to gather data on a specific topic or group of keywords. In this blog post, we will walk through the process of scraping search results from DuckDuckGo's Lite page using the Node.js fetch and JSDOM libraries.

First, install JSDOM by running the following command in your terminal:

```sh
npm install jsdom
```

We will then use the native fetch library to send a GET request to DuckDuckGo's Lite page, passing in the search query as a parameter. The response from the server will be passed to the JSDOM, which allows us to navigate and extract data from the HTML using the DOM syntax.

```javascript
import { JSDOM } from "jsdom";

/**
 * It fetches the HTML of the DuckDuckGo search page, parses it, and returns the results
 * @param query - The query to search for
 * @returns An array of objects with the following properties:
 *     title: The title of the result
 *     description: The description of the result
 *     url: The url of the result
 */
export async function search(query) {
  const html = await cache(
    `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`,
    "text"
  );
  let doc = new JSDOM(html);
  let document = doc.window.document;
  let sponsored = [
    ...document.querySelectorAll("tr[class='result-sponsored']"),
  ].pop();
  let trs = [...document.querySelectorAll("tr")];
  let rawRes = [...chunks(trs.slice(trs.indexOf(sponsored) + 1), 4)];

  let results = [];
  for (let i = 0; i < rawRes.length; i++) {
    const group = rawRes[i];
    if (group.length == 4) {
      results.push({
        title: group[1].querySelector("a").textContent,
        description: group[2].querySelector("td[class='result-snippet']")
          .textContent,
        url:
          "http://" +
          group[3].querySelector("span[class='link-text']").textContent,
      });
    }
  }
  return results;
}
```

This uses the chunking function below:

```javascript
function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
```
