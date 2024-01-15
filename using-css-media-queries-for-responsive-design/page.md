# Using CSS Media Queries for Responsive Design
Media queries in CSS are a powerful tool that allow you to adjust the layout and design of your website based on the characteristics of the device that is being used to view it. In this tutorial, we will cover the basics of using media queries in CSS.

### What is a media query?
A media query is a block of CSS code that is used to apply certain styles to a web page based on the characteristics of the device that is being used to view it. For example, you might want to adjust the layout of your page when it is viewed on a mobile device, or you might want to apply different styles to a page when it is printed.

### Using media queries in CSS
To use media queries in CSS, you need to follow a few simple steps.

1. Define the media query
The first step is to define the media query using the `@media` rule. The syntax for the `@media` rule is as follows:

```
@media media-type and (media-feature) {
  /* CSS styles go here */
}
```

The `media-type` is optional, but can be used to specify the type of media that the query is targeting. Common media types include `screen` (for computer screens), `print` (for printed pages), and `speech` (for screen readers).

The `media-feature` is the characteristic of the device that the query is targeting. Common media features include `max-width` (the maximum width of the device), `min-width` (the minimum width of the device), `orientation` (the orientation of the device), and `resolution` (the resolution of the device).

2. Write CSS styles for the media query
Once you have defined the media query, you can write the CSS styles that you want to apply to the page when the media query is triggered. For example, you might want to adjust the font size and layout of your page when it is viewed on a mobile device.

```
@media screen and (max-width: 480px) {
  body {
    font-size: 16px;
  }
  .container {
    width: 100%;
    padding: 0;
  }
}
```

In this example, the media query targets screens with a maximum width of 480 pixels. The CSS styles inside the block will be applied to the page when the media query is triggered. The `font-size` of the body element will be set to 16 pixels, and the `width` and `padding` of the `.container` element will be adjusted to fit the smaller screen.

3. Test the media query
Once you have written your media query and CSS styles, it's important to test them on different devices to make sure they are working correctly. You can use a tool like the Chrome DevTools to test your media queries and see how your page will look on different devices.

Conclusion
Media queries are an essential part of modern web design, and they allow you to create responsive and adaptable websites that look great on any device. By following the steps outlined in this tutorial, you can start using media queries in your own CSS code and take your web design skills to the next level.