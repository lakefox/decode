# Using Media Queries in JS
With media queries, developers can ensure that a website looks good and is easy to use on all types of devices, from smartphones to tablets to desktop computers. By optimizing the layout and design for each device, users can enjoy a seamless browsing experience no matter where they are accessing the website from.

Media Queries are defined and used in CSS to transform your page based on user-set criteria. CSS might not be able to adapt your design perfectly, instead, you might consider using JavaScript. The traditional way of determining if a device meets the Media Query criteria would be to use DOM attributes like `innerWidth`. However, now you are able to use Media Queries in JavaScript using the `window.matchMedia` function.

### matchMedia
The `window.matchMedia` function in JavaScript is used to check if a particular media query applies to the current device or browser window. It returns a `MediaQueryList` object that contains information about the media query, such as the media type, media features, and whether the query matches the current device or not. Using the `addEventListener` method you can listen for changes to the media query and execute different code based on the result.

```
window.matchMedia('(max-width: 600px)');
// MediaQueryList {media: '(max-width: 600px)', matches: false, onchange: null}
```

### Listening for changes
The `matchMedia` function returns a `MediaQueryList` that defines the current state of the query. The `MediaQueryList` also has a `onchange` event that will fire once the media query has been met. Below is an example of it in use.

```
let mq = window.matchMedia('(max-width: 600px)');

mq.onchange = (e) => {
	console.log(e);
}

// MediaQueryListEvent {isTrusted: true, media: '(max-width: 600px)', matches: true, type: 'change', target: MediaQueryList, …}
```