# Building SvelteKit for Node JS

SvelteKit is a powerful tool that is great for making all types of websites, with out of the box support for services like Vercel. In this tutorial you will learn how to setup up SvelteKit for Node JS to run on a platform like Digital Ocean.

## Installing the Correct Adapter

Out of the box, Svelte comes with the auto adapter, to build your app for Node Js you will have to install `adapter-node`.

```bash
npm i @sveltejs/adapter-node
```

## Configuring Svelte

The `svelte.config.js` contains all of your adapter settings to build for Node you can set up your file like this.

### Output Directory

```javascript
import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ out: "./dist" }),
  },
};

export default config;
```

## Building

To build your app for Node JS you can use the `npm` commands that Svetle already provides for you.

```bash
npm run build
```

## Running

```bash
node ./dist/index
```

## Changing the host and port

If you want to change either the host or the port the built app pass the variables `HOST` and `PORT` to the index file like this.

```bash
PORT=4000 HOST=127.0.0.1 node ./dist/index
```

An easy way to do this in one command is to create a `./server.sh` file in your root directory with the line above and run the following command.

```bash
chmod u+x ./server.sh
```

to run the new script you created type the following command:

```bash
./server.sh
```
