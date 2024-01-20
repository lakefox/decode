# Svelte Markdown Component

Using markdown with Svelte allows you to create super simple websites that require almost no-coding. The svelte-markdown component makes this easy with one line of Svelte.

## Install

Use NPM to install `svelte-markdown` to your project.

```sh
npm i svelte-markdown
```

## Importing

The `svelte-markdown` library is a component that can be used just like an HTML tag. First, you need to import it from the `node_modules` where you installed it.

```html
<script>
  import SvelteMarkdown from "svelte-markdown";
</script>
```

## Usage

Once it's imported create you can either create a variable with your markdown document in it called source and pass it to the component like below:

```html
<SvelteMarkdown {source} />
```

or you can name the variable anything you like and pass it like this

```html
<SvelteMarkdown source="{markdown}" />
```

`svelte-markdown` is a great tool for making a blog that is easy to update and write posts. Markdown is a great alternative to HTML if you want the feel of a WYSIWYG editor like [TipTap](/install-and-configure-tip-tap) without the extra steps of setting it up. You can read more about `svelte-markdown` on its GitHub [here](https://github.com/pablo-abc/svelte-markdown "Svelte Markdown GitHub")
