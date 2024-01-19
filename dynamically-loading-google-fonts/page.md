# Dynamically loading Google Fonts

Google Fonts is a great tool for web developers, it allows you to load in almost any font on to you website and use it with only a few lines of code. However, sometimes you need to load in a font after the page loads. Here is a quick way to do it.

Google Fonts are loaded in the `head` tag of your page using a `link` tag, this is typically done when the page loads. If you want to load in a font after you can still just insert a `link` tag using some javascript. Here's how:

```javascript
function loadFont(fontName) {
  // First check if the element is in the page
  if (
    document.querySelector(
      `link[href="https://fonts.googleapis.com/css?family=${fontName.replace(
        /\s/g,
        "+"
      )}"]`
    ) == null
  ) {
    // If not create a new link tag
    const link = document.createElement("link");
    // set the rel property to stylesheet
    link.rel = "stylesheet";
    // Set the href to the google fonts URL with your custom font name
    link.href = `https://fonts.googleapis.com/css?family=${fontName.replace(
      /\s/g,
      "+"
    )}`;
    // Append the new element to the head of the document
    document.head.appendChild(link);
  }
}
```

What this function does is take a font name i.e. `Open Sans`, and checks if the font is already loaded on the page. Then if it's not it creates a new font tag and inserts it in the `head` of the document. Once the font is loaded in any elements with the `Open Sans` font family set will automatically change, this also works in the canvas element. One thing to note is in the URL the spaces in the font name need to be replaced with pluses, which is taken care of using a RegExp.
