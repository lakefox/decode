# CSS Marquee Replacement
The HTML marquee tag, which was used to create scrolling text or images on a web page, has been deprecated and is no longer supported in modern web development. This means that while it may still work in some older web browsers, it is not considered a valid HTML element in current web development standards and should not be used in new or updated websites.

There are several reasons why the `<marquee>` tag was deprecated:

1. Accessibility: Scrolling text or images can be distracting for users and can make it difficult for users with visual impairments to read the content on a page.

2. User experience: The scrolling effect can also be distracting and annoying for users, and can make it difficult to read the content.

3. Compatibility: The `<marquee>` tag is not well supported across different web browsers, and can cause inconsistencies in the way the page is displayed.

The main reason however was that HTML was never meant to act as a styling language, it is a markup language. 

Modern alternatives: There are more modern and flexible ways to achieve similar effects, such as using CSS and JavaScript. These methods provide more control and customization options and are better supported across different web browsers.

Here is an example of how you can achieve the same effect as the HTML `<marquee>` tag using CSS:

##### HTML
```
<div class="marquee" data-text="This is some scrolling text!"/>
```

##### CSS
```
.marquee {
  width: 300px;
  height: 50px;
  overflow: hidden;
  position: relative;
}

.marquee:before {
  content: attr(data-text);
  display: block;
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  animation: marquee 5s linear infinite;
}

@keyframes marquee {
  from {
    left: 100%;
  }
  to {
    left: -100%;
  }
}
```

In this example, the text is  added to the content of the :before pseudo-element using `attr` to get the contents of the `data-text` attribute. The animation then moves the text from right to left until it disappears completely off the left edge of the container.