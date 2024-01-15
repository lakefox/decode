# Fetch API
The Fetch API is a interface for making http requests using javascript in the browser and with node version +18. If you are familiar with the XMLHttpRequest or ajax() from jQuery this will feel familiar.

#### Concepts
The fetch api is built on [promises](https://decode.sh/promises-vs-callbacks "Promises VS Callbacks") and returns a `Response` object that will need further processing depending on the data parsing you want. The `fetch()` function takes two arguments, the request URL and the parameters. Then returns a `Response` object that will further process your data.

#### Usage
Here is a simple example of a fetch request to an RSS feed. The RSS feed is in plain text so we process it using the `response.text()` method. There is also `.json()`, `.blob()`, `.formData()` and `.arrayBuffer()`.
```
fetch('https://decode.sh/rss")
  .then((response) => response.text())
  .then((data) => console.log(data));
```

#### Fetching an image
When fetching binary data, like an image, you will want to convert it to a blob. Then you can create an object URL and use it like a file.
```
const image = document.querySelector("#image");
fetch("https://decode.sh/favicon.png")
  .then((response) => response.blob())
  .then((blob) => {
    const objectURL = URL.createObjectURL(blob);
    image.src = objectURL;
  });
```

#### Adding Parameters
Along with the URL, fetch takes an options parameter, this allows you to set headers and make POST requests. Here's a breakdown of what can be added to the options.
* method
	* The request method (GET or POST).
* headers
	* Any headers you want to include.
* body
	* The body you want to send. Can be a Blob, ArrayBuffer, TypedArray, DataView, FormData, URLSearchParams, a string object or literal, or a ReadableStream
* mode
	* The request mode you want to use i.e. (cors, no-cors...)
* credentials
	* Controls what the browser does with credentials.


For a more exhaustive list of fetch parameters see:
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters "Fetch API Documentation")

#### Fetch POST Request
Here is a basic POST request example, it is broken out into a function that can be reused and returns the `Response` object that the `fetch` function returns.

Check out: [HTTP Headers Basics](https://decode.sh/http-headers-basics "Basics of headers")
```
async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response;
    }

// NOTE: this URL is not a real URL
postDate("https://decode.sh/post/example", {
	test: "Hello"
}).then(res => res.json())
.then((data) => {
	console.log(data);
})
```