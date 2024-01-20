# Node JS Reading Files

In Node.js, there are various ways to read files from the file system. In this tutorial, we will explore the most commonly used methods to read files in Node.js.

## Reading files synchronously

The simplest way to read a file in Node.js is to use the `fs.readFileSync` method. This method reads the entire file synchronously and returns the contents of the file as a Buffer or a string.

Here's an example of how to use it:

```javascript
const fs = require("fs");
const filePath = "./file.txt";
const contents = fs.readFileSync(filePath, "utf8");
console.log(contents);
```

In this example, we require the `fs` module and then read the contents of the `file.txt` file using the `readFileSync` method. We specify the file path and encoding as parameters. The method returns the contents of the file as a string, which we log to the console.

Note that the synchronous method blocks the event loop until the file is completely read. Therefore, it is not recommended for reading large files or when performance is a concern.

## Reading files asynchronously

A better approach for reading files in Node.js is to use the `fs.readFile` method, which reads the file asynchronously. This method accepts a callback function as a parameter, which is called with an error object and the contents of the file when the file has been read.

Here's an example of how to use it:

```javascript
const fs = require("fs");
const filePath = "./file.txt";
fs.readFile(filePath, "utf8", (err, contents) => {
  if (err) throw err;
  console.log(contents);
});
```

In this example, we use the `fs.readFile` method to read the contents of the `ile.txt` file. We specify the file path, encoding, and a callback function as parameters. The callback function is called with an error object and the contents of the file when the file has been read. If there is an error, we throw it. Otherwise, we log the contents of the file to the console.

This method is preferred over the synchronous method because it does not block the event loop and is more efficient when dealing with large files.

## Reading files using streams

Node.js provides a built-in module called `fs.ReadStream` that allows us to read files as streams. This is useful when we want to read large files without having to load the entire file into memory.

Here's an example of how to use it:

```javascript
const fs = require("fs");
const filePath = "./file.txt";
const readStream = fs.createReadStream(filePath, "utf8");
readStream.on("data", (chunk) => {
  console.log(chunk);
});
```

In this example, we use the `fs.createReadStream` method to create a readable stream from the `file.txt` file. We specify the file path and encoding as parameters. We then attach an event listener to the stream's data event, which is called every time the stream emits a chunk of data. We log each chunk to the console.

This method is useful when dealing with large files because it reads the file in chunks instead of loading the entire file into memory.

## Reading files using promises

Node.js provides a promises API for the `fs` module, which allows us to read files using promises. This is useful when we want to avoid using callbacks and handle errors using `try/catch` blocks.

Here's an example of how to use it:

```javascript
const fs = require("fs").promises;
const filePath = "./file.txt";
async function readFile() {
  try {
    const contents = await fs.readFile(filePath, "utf8");
    console.log(contents);
  } catch (e) {
    console.error(e);
  }
}
```

## Using the Import Syntax

The `fs` Module has support for both `require` and `import` use the following syntax to import any function from the `fs` module:

```javascript
import { readFileSync } from ‘fs’;
```
