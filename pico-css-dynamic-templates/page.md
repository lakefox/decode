# PicoCSS Dynamic Templates

Pico CSS has the ability to customize the dark and light templates here is how to change the template colors with JS.

The Pico CSS template utilizes CSS variables to dynamically alter the appearance of the website. In this scenario, the intention was to extract the color information from a database and dynamically customize the visual presentation of the site. All CSS variables are defined at the `:root` level and can be manipulated using JavaScript's `setProperty` method, as demonstrated below.

```javascript
let color = "#00A1FE";

let root = document.querySelector(":root");
root.style.setProperty("--primary", color);
root.style.setProperty("--primary-hover", color);
root.style.setProperty("--primary-focus", color + "40");
root.style.setProperty("--primary-inverse", "#fff");
```

To ensure that the template colors are not pre-loaded prior to dynamically setting them, it is recommended to set the template colors to transparent, as demonstrated below:

```css
/* Deep-purple Light scheme (Default) */
/* Can be forced with data-theme="light" */
:root:not([data-theme="dark"]),
[data-theme="light"] {
  --primary: #00000000;
  --primary-hover: #00000000;
  --primary-focus: #00000000;
  --primary-inverse: #fff;
  --logo-text: #000;
}

/* Deep-purple Dark scheme (Auto) */
/* Automatically enabled if user has Dark mode enabled */
@media only screen and (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --primary: #00000000;
    --primary-hover: #00000000;
    --primary-focus: #00000000;
    --primary-inverse: #fff;
    --logo-text: #fff;
  }
}

/* Deep-purple Dark scheme (Forced) */
/* Enabled if forced with data-theme="dark" */
[data-theme="dark"] {
  --primary: #00000000;
  --primary-hover: #00000000;
  --primary-focus: #00000000;
  --primary-inverse: #fff;
  --logo-text: #fff;
}

/* Deep-purple (Common styles) */
:root {
  --form-element-active-border-color: var(--primary);
  --form-element-focus-color: var(--primary-focus);
  --switch-color: var(--primary-inverse);
  --switch-checked-background-color: var(--primary);
}
```
