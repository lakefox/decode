# Extracting URL Parts
JavaScript provides several built-in methods that can be used to extract different parts of a URL. Here is a tutorial on how to extract the protocol, hostname, pathname, and query parameters of a URL in JavaScript.

To extract the protocol (e.g. "HTTP" or "HTTPS") of a URL, you can use the protocol property of the URL object. For example:
```
let url = new URL("https://decode.sh/extracting-url-parts?query=false");
let protocol = url.protocol;
console.log(protocol); // "https:"
```
To extract a URL's hostname (e.g. "decode.sh"), you can use the hostname property of the URL object. For example:
```
let url = new URL("https://decode.sh/extracting-url-parts?query=false");
let hostname = url.hostname;
console.log(hostname); // "decode.sh"
```
To extract the pathname (e.g. "/extracting-url-parts") of a URL, you can use the pathname property of the URL object. For example:
```
let url = new URL("https://decode.sh/extracting-url-parts?query=false");
let pathname = url.pathname;
console.log(pathname); // "/extracting-url-parts"
```
To extract the query parameters of a URL, you can use the searchParams object of the URL object. This object provides methods for working with the query string of a URL. For example, you can use the get() method to get the value of a specific query parameter.
```
let url = new URL("https://decode.sh/extracting-url-parts?query=false");
let query = url.searchParams.get("query");
console.log(query); // "false"
```
To extract the fragment or hash of a URL, you can use the hash property of the URL object.
```
let url = new URL("https://decode.sh/extracting-url-parts?query=false#fragment");
let fragment = url.hash;
console.log(fragment); // "#fragment"
```

Note that the URL object is not supported in some older browsers, so you might need a polyfill or a third-party library such as URL-parse if you need to keep those browsers.