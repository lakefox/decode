# Svelte: Building for Deno

Svelte is a popular web application framework that allows you to build reactive and dynamic web applications using JavaScript. Deno, on the other hand, is a secure runtime for JavaScript and TypeScript that aims to provide a modern and secure environment for running server-side applications. In this tutorial, we will walk through the steps to build a Svelte application to run on Deno.

![Deno Svelte](./sh6h5xld5jwncms/denosvelte_FLPOac7KWP.webp)

To build Svelte for Deno we will be using the package `svelte-adapter-deno`, it will build Svelte for Deno just like `@sveltejs/adapter-node`. The step are simular for both. Once the package is installed, copy the command below, you will need to edit the `svelte.config.js` to build the site correctly.

## Install

```sh
npm i -D svelte-adapter-deno
```

## Configure

To configure your project, import the adapter from `svelte-adapter-deno` and replace the default adapter configuration with the code below.

```javascript
// svelte.config.js
import adapter from 'svelte-adapter-deno';

export default {
  kit: {
    adapter: adapter()
  }
};
```

## Running

Deno makes you explicitly define the permissions given, using svelte you will need to enable everything while running use the command that best fits your situation.

```sh
# with the default build directory
deno run --allow-env --allow-read --allow-net build/index.js

# with a custom build directory
deno run --allow-env --allow-read --allow-net path/to/build/index.js
```
