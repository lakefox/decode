# Using Canvas in Node JS
Have you ever wanted to generate dynamic images on the server side? With Node Canvas, it's easy! Node Canvas is a module that allows you to use the canvas element on the backend, making it simple to create images based on user input.

![Hero Image](https://decode.sh/og/post/Using%20Canvas%20in%20Node%20JS)

Node Canvas is a module that allows you to use the canvas element on the server side for generating dynamic images. You can see an example of this by going to the URL below and replacing `test-image` with any text to get a random image.

```
https://decode.sh/hero/Test%20Image
```

#### Installation
```
npm install canvas
```

Note: canvas uses Cairo, a 2D graphics library with support for multiple output devices, which you may need to install in order to get canvas working properly. Use the table below to install.

OS | Command
----- | -----
OS X | Using [Homebrew](https://brew.sh/):<br/>`brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman`
Ubuntu | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
Fedora | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
OpenBSD | `doas pkg_add cairo pango png jpeg giflib`
Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)
Others | See the [wiki](https://github.com/Automattic/node-canvas/wiki)

**Mac OS X v10.11+:** If you have recently updated to Mac OS X v10.11+ and are experiencing trouble when compiling, run the following command: `xcode-select --install`. Read more about the problem [on Stack Overflow](http://stackoverflow.com/a/32929012/148072).
If you have xcode 10.0 or higher installed, in order to build from source you need NPM 6.4.1 or higher.

#### Usage

To use `canvas`, you will first need to import `createCanvas` like this:
```
import { createCanvas } from "canvas";
```

Creating the canvas is as simple as with the native module
```
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
```

#### Example
Creating the canvas is as easy as with the native module. Here is an example from the official documentation that draws the word 'Awesome!' along with an image of a cat wearing a lime helmet:
```
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('examples/images/lime-cat.jpg').then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)

  console.log('<img src="' + canvas.toDataURL() + '" />')
})
```

#### Exporting
To send the image to the client, you can use the non-standard API's in the [documentation](https://github.com/Automattic/node-canvas) to convert the image to a buffer and return it in the Response object like this:

##### Svelte example
Using the same code as above, to send the image to the client all you have to do is convert the image to a buffer and return it in the `Response` object.

###### Converting the canvas to a buffer
```
canvas.toBuffer("image/jpeg")
```
###### Full code example
```
import { error } from '@sveltejs/kit';
import { createCanvas } from "canvas";

export function GET({ params, url }) {
    return new Promise((resolve, reject) => {
       	ctx.font = '30px Impact'
		ctx.rotate(0.1)
		ctx.fillText('Awesome!', 50, 100)

		// Draw line under text
		var text = ctx.measureText('Awesome!')
		ctx.strokeStyle = 'rgba(0,0,0,0.5)'
		ctx.beginPath()
		ctx.lineTo(50, 102)
		ctx.lineTo(50 + text.width, 102)
		ctx.stroke()

		// Draw cat with lime helmet
		loadImage('examples/images/lime-cat.jpg').then((image) => {
 		 ctx.drawImage(image, 50, 0, 70, 70)

        resolve(new Response(canvas.toBuffer("image/jpeg")));
    }).catch(() => {
        throw error(404, 'Not found');
    })
}
```
