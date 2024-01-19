# Bundling NPM packages for the browser

How to bundle your NPM package for production

When building [Kod.js](https://decode.sh/kod-js) I wanted it to work on both Node and in the browser. I had to be careful not to use modules that aren't compatible with both environments. However, once the code was written it still relied on external packages that had to be loaded separately, this clearly isn't a good way to create a package. After doing a bit of research I came across module bundlers like browserify that could make my code into one big file. Here's how to do the same:

## Installing Browserify

Browserify is an open-source javascript bundler that runs as an OS-level command so you will want to install it globally.

```sh
npm install -g browserify
```

## Using ES6 import

Out of the box, browserify doesn't support ES6 modules, you will need to install `esmify` to be able to bundle using browserify.

```sh
npm install -g esmify
```

## Minifying your bundle

When bundling code you will notice there is a lot of code all in one file, to reduce the file size you can use a code minifying tool like `terser` that can compress your bundle by replacing all the variables with the smallest name possible.

```sh
npm install -g terser
```

## Using it all together

Below is the command I have set in my `package.json` to build my web bundle for `Kod.js`.

```sh
npx browserify -p esmify index.mjs | terser --compress --mangle > ./dist/kod.min.js
```
