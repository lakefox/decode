# Lazy Loading Images
Lazy loading is a technique that defers the loading of images until they are needed, rather than loading them all at once when the page first loads. This can help improve the performance and user experience of a webpage, particularly on sites with a large number of images.

To lazy load an image in HTML, you will need to use the loading attribute of the img element. The loading attribute has three possible values: lazy, eager, and auto.

lazy: This value tells the browser to only load the image when it is needed, such as when the image comes into view as the user scrolls down the page. This is the recommended value for lazy loading images.

eager: This value tells the browser to load the image immediately, regardless of whether or not it is needed. This is the opposite of lazy loading and should generally be avoided.

auto: This value tells the browser to use its own heuristics to decide whether or not to lazy load the image. This is the default value and is generally not recommended for lazy loading images.

To use the loading attribute to lazy load an image, you can simply add it to the img element like this:
```
<img src="image.jpg" loading="lazy" alt="A description of the image">
```

You can also use the loading attribute with the picture element to specify different sources for different display conditions, such as screen width or pixel density. For example:
```
<picture>
  <source srcset="image-large.jpg" media="(min-width: 1000px)">
  <source srcset="image-medium.jpg" media="(min-width: 500px)">
  <img src="image-small.jpg" loading="lazy" alt="A description of the image">
</picture>
```
In this example, the browser will use the image-large.jpg file for screens with a width of 1000 pixels or more, the image-medium.jpg file for screens with a width of 500 pixels or more, and the image-small.jpg file for all other screens. All of the images will be lazy loaded using the loading attribute.

Lazy loading images can be an effective way to improve the performance and user experience of your website, particularly if you have a large number of images. By using the loading attribute, you can easily control when and how images are loaded on your webpage.