# Install PicoCSS with Svelte
Pico CSS is a classless CSS framework that auto add styles to default HTML elements allowing you to effortlessly build beautiful websites. Here's how to install and use it in Svelte or SvelteKit.

#### Install Pico
Pico CSS can be installed with NPM using the command below:
```bash
npm i @picocss/pico
```
#### Import to Layout
To import Pico CSS into your Svelte application, add an import statement in your `+layout.svelte` file. The `+layout.svelte` should be located at the top of the routes folder in the source of the application.
```html
// +layout.svelte
<script>
  import '@picocss/pico'
  ...
</script>

<slot />
```

#### Customization 
Pico CSS provides built-in customization using CSS variables, for a full guide check out the docs [here](https://picocss.com/docs/customization.html "Pico CSS Offical Documentation"). All the variables should be contained inside of a `:root` selector and be put into the `app.css` file.

To dynamically change the variables with JavaScript you can use the `setProperty` method like [here](https://decode.sh/pico-css-dynamic-templates "Using Dynamic Templates With PicoCSS")
```css
/* app.css */
:root {
	/* Get a list of themes from the PicoCSS website
  --primary: aqua;
}
```

#### Usage
```html
<!-- +page.svelte -->

<!-- Dropdown -->
<details role="list">
  <summary aria-haspopup="listbox">Dropdown</summary>
  <ul role="listbox">
    <li><a>Action</a></li>
    <li><a>Another action</a></li>
    <li><a>Something else here</a></li>
  </ul>
</details>
```