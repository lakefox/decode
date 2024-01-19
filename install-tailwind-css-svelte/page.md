# Install Tailwind CSS Svelte

Tailwind CSS is a CSS framework designed to be used with modular predefined classes instead of custom classes for each element. We will go over how to install Tailwind CSS and set it up to build with Svelte.

## Install Tailwind

First you need to install Tailwind and it's dependences then run the Tailwind `npx` command to setup your project.

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init tailwind.config.cjs -p
```

## Configuration

To properly setup Tailwind you need to make a few changes to your files. In the `svelte.config.js` file add the line below, below the `import adapter` line.

```javascript
import { vitePreprocess } from "@sveltejs/kit/vite";
```

Set the preprocessor by adding `preprocess: vitePreprocess()` to the config object in `svelte.config.js` like below:

```javascript
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
};
```

After running the `npx` command, you should have a `tailwind.config.cjs` file, add `content: ['./src/**/*.{html,js,svelte,ts}'],` to the `module.exports` object to enable auto parsing for Tailwind.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Importing Tailwind into Svelte

To import tailwind classes into you app, add the following Tailwind directives into your `app.css` file.

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then import the `app.css` file into your `+layout.svelte`.

```html
<script>
  import "../app.css";
</script>

<slot />
```

### Running

Now Tailwind should be up and running, test it by running the following command.

```sh
npm run dev
```
