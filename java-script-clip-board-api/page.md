# JavaScript ClipBoard API
The JavaScript clipboard API provide the ability to programmatically interface with the devices clipboard, enabling cutting, copying, and pasting without user input.

### Checking for clipboard access
The first step in using any `navigator` feature is to make sure you have the correct permissions to use the feature. To check the `clipboard` feature use `navigator.permissions.query` and pass an object with the key of `write-on-clipboard`. This will return `granted` if the user has granted permission.

```javascript
navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
	if (result.state == "granted" || result.state == "prompt") {
	alert("Write access granted!");
}
});
```

### Reading from the clipboard
Reading from the clipboard uses the `readText` method which return a promise with the resulting values.
```javascript
navigator.clipboard
	.readText()
	.then(console.log)
	.catch(console.error);
```

### Writing to the clipboard
Writing to the clip board is the same as reading from the clipboard. Use the `writeText` method and pass the text you want to be written.
```javascript
navigator.clipboard
	.writeText(text)
	.catch(console.error);
```

The clipboard API is an awesome tool to use to improve the user experience of your application and reduce the friction a user has to go through. DECODE uses this function for code copying and pasting. If you want to learn how we do it read the post below, we use CSS pseudo-element to render the `COPY` text in the right-hand corner and listen for a click event, then code the code to the clipboard.
* [CSS Pseudo Elements](/css-pseudo-elements)