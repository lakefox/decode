# CSS Pseudo Elements

CSS pseudo elements allow web developers to add specific elements to their webpages without having to write additional HTML or JavaScript. These elements are created by adding a colon and a keyword to the end of a CSS selector. Some of the most commonly used pseudo elements are :before and :after which can be used to add content before or after an element, :first-letter which can be used to style the first letter of a paragraph, and :hover which can be used to add interactive effects when a user hovers their mouse over an element.

These pseudo-elements provide a great way for developers to add extra style and functionality to their websites without writing additional code. With the right combination of CSS and pseudo-elements, developers can create unique and exciting web pages that are both visually appealing and functional.

## Example

Here is an example of pseudo-elements being used to make a copy-and-pastable code snippet. This is the code used on this site also!

### HTML

```html
<code data-before-"COPY">
 // Some Code
</code>
```

### CSS

```css
code:hover:before {
  content: attr(data-before);
  font-family: var(--font-family);
  font-size: 13px;
  font-weight: 500;
  color: var(--code-color);
  float: right;
  cursor: pointer;
  padding: 3px;
}
```

## How it works

The way these works is by creating a CSS pseudo-element using the `:before` element when a use hovers over the `<code>` block. The contents of the pseudo-element are set using the `attr()` function in CSS to assign the contents of the `:before` element to the value of the `data-before` attribute of the element. This could be set to anything you want. The reason this is set using the `attr()` function vs just setting the value of the contents to copy is to allow the message to be dynamic. On this page I have it set up to change to `COPIED!` on a click, this is done using the function below:

```javascript
function parseCodes() {
  let code = document.querySelectorAll("code");
  for (let i = 0; i < code.length; i++) {
    code[i].setAttribute("data-before", "COPY");
    code[i].onclick = (e) => {
      navigator.clipboard.writeText(code[i].innerText);
      e.target.setAttribute("data-before", "COPIED!");
    };
    code[i].onmouseleave = (e) => {
      e.target.setAttribute("data-before", "COPY");
    };
  }
}
```

The `parseCodes()` function is run once the page is loaded. Once the user (you) moves their mouse out of the `<code>` tag the text is set back to `COPY` for the next time.
