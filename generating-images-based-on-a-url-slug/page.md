# Generating Images Based on a URL Slug
Welcome to our tutorial on dynamically generating images using Node.js! In this post, we'll be exploring a technique for creating images on the fly based on the URL slug of a webpage. This can be a powerful tool for creating personalized, dynamic content for your website or application. Whether you're looking to create unique product images, customized social media graphics, or any other type of dynamic image, this tutorial will show you how to get started with Node.js. So let's dive in!

### Prerequisites
* [Generating Random Colors on a Range](/generating-random-colors-on-a-range)
* [Using Canvas in Node JS](/using-canvas-in-node-js)
* [Seeded Random Number Generator in JS](/seeded-random-number-generator-in-js)

![Hero](/og/post/Generating%20Images%20Based%20on%20a%20URL%20Slug)

Generating images based on a URL slug is useful to give your content a fresh look without having to manually create and upload images every time. In this tutorial, we will learn how to create a svelte endpoint that generates images like the one above.

This is how the endpoint will work once complete:
```
<image src="https://decode.sh/hero/Generating%20Images%20Based%20on%20a%20URL%20Slug"></image>
```

The prerequisites linked above cover most of what we will be using, however, there is one part we will need to add first to tie everything together. The seeded random number generator needs an integer as a seed so we will need to convert our slug into an integer. We can take our slug and loop through each character getting their keycodes and adding them to an integer. You could add them to a variable set to `0` to get a cumulative number, however, that can easily over lap reducing the amount of different images you can generate. To fix this we will get their char codes using `charCodeAt()`, then store that in an array, join the array, and parse the integer from there. This can be done in "one" line like below:
```
let seed = parseInt(params.slug.split('').map((e) => {
            return e.charCodeAt();
        }).join(''));
```

### Helper functions
As a reminder, I've taken the seeded random and the color generator functions and put them below, if you would like to learn more read the prerequisites.

##### Seeded Random
```
function random(seed) {
    var m = 2 ** 35 - 31
    var a = 185852
    var s = seed % m
    return function () {
        return (s = s * a % m) / m
    }
}
```

##### Color Generator
The Color function has an update, because we need to use the seeded random function we will need to pass it to the function each time we call it.
```
function color(min, max, rng) {
    let c = [min, max, Math.floor(rng() * (max - min)) + min].sort(() =>
        rng() > 0.5 ? 1 : -1
    );
    return `rgb(${c[0]},${c[1]},${c[2]})`;
}
```

### Setting up
Here is the basic Svelte endpoint format we will be using with all the modules imported and the helper functions defined. For the rest of the tutorial assume the code examples are going in the promise function where it says `your code`.
```
import { error } from '@sveltejs/kit';
import { createCanvas } from "canvas";

export function GET({ params, url }) {
    return new Promise((resolve, reject) => {
		// your code
    }).catch(() => {
        throw error(404, 'Not found');
    })
}

function random(seed) {
    var m = 2 ** 35 - 31
    var a = 185852
    var s = seed % m
    return function () {
        return (s = s * a % m) / m
    }
}

function color(min, max, rng) {
    let c = [min, max, Math.floor(rng() * (max - min)) + min].sort(() =>
        rng() > 0.5 ? 1 : -1
    );
    return `rgb(${c[0]},${c[1]},${c[2]})`;
}
```
### Initiating the Canvas
Use the `createCanvas` function in the `canvas` module to create a server-side canvas, then create a 2d context just like you would in the browser.
```
let width = 900;
let height = 400;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
```
### Seeding the random number generator
`params` is an object passed to us from the endpoint that contains the URL information.
```
let seed = parseInt(params.slug.split('').map((e) => {
            return e.charCodeAt();
        }).join(''));
let rng = random(seed);
```
### Drawing the image
We firsts need to set the `min` and `max` variables for the color function. Then we can draw three rectangles using `fillRect` that are each a third apart from each other and are the height of the canvas.
```
let min = 54;
let max = 177;

ctx.fillStyle = color(min, max, rng);
ctx.fillRect(0, 0, 300, height);
ctx.fillStyle = color(min, max, rng);
ctx.fillRect(width / 3, 0, 300, height);
ctx.fillStyle = color(min, max, rng);
ctx.fillRect((width / 3) * 2, 0, 300, height);
```
### Sending the Image to the Client
Sending the image as a buffer to the client can be done by converting the canvas into a buffer and resolving the promise with a `Response` object.
```
resolve(new Response(canvas.toBuffer("image/jpeg")));
```