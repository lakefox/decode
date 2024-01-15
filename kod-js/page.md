# Kod.js

Kod.js is a code preview image generator that runs both in the browser and on Node JS. It is built using highlight.js and uses it for the themes and syntax highlighting.

![Kod.js client or server generated code captures](./download_Vm0BO0hxzw.png)

## Basic Usage

Here's a basic example that generates an image with `console.log("Hello World")` in it.

### Node JS

```javascript
import fs from "fs";
// Import the canvas module from NPM
import { createCanvas } from "canvas";
import kod from "kodjs";

// Make a blank canvas that will be the main node
// NOTE: This can be any size kod auto resizes the canvas to fit the code
const canvas = createCanvas(100, 100);
// Create a new kod instance;
let k = new kod();

// Initialize passing the canvas created eariler, the language the code is in, the theme (see highlightjs.org for a list of themes), and the background color
k.init(canvas, "javascript", "atom-one-dark", "#212121").then(() => {
  // Once kod is initialized use the print function to generate your canvas
  // pass your code as the first argument
  k.print(`console.log("Hello World")`)
    // This returns a promise, when resolved it passes back the new canvas size as an object
    .then((size) => {
      console.log("printed", size);
      // To export the image use the canvas module's toBuffer method and write it to a file
      let buf = canvas.toBuffer("image/png", {
        compressionLevel: 3,
        filters: canvas.PNG_FILTER_NONE,
      });
      fs.writeFile("./test.png", buf, () => {
        console.log("done");
      });
    });
});
```

#### Browser

Include the script and add a canvas element to your document.

```html
<canvas></canvas>
<script src="https://unpkg.com/kodjs/dist/kod.min.js">
```

This works the same as the Node JS one.

```javascript
const canvas = document.querySelector("canvas");
let k = new kod();
k.init(canvas, "javascript", "atom-one-dark", "#212121").then(() => {
  k.print(`console.log("Hello World")`).then((size) => {
    console.log("printed", size);
  });
});
```
