# Svelte Static Site Generation

Svelte is a great platform to create any type of site. If you want to create a site and host it on Github Pages, you can use Svelte to generate a static site and upload the files to the desired GitHub repository. Here's how!

## Adapter

Install the static adapter with the command below:

```sh
npm i -D @sveltejs/adapter-static
```

## Configuration

Replace your `svetle.config.js` file with the contents below:

```javascript
import adapter from "@sveltejs/adapter-static";

export default {
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: false,
      strict: true,
    }),
  },
};
```
