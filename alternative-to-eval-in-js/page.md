# Alternative to Eval in JS

The Eval function is super useful but extremely dangerous to use here's a simple alternative to in.

When you think of a function you usually think of using it by its keyword like this:

```javascript
function myFunction() {
  // code
}
```

However this isn't the only way to use it, function is also its own function `Function` to use it to evaluate code for you you can do something like this:

```javascript
let code = `(test) => {
 console.log(test);
}`;

let value = new Function("return " + code);
```

This will return a function that returns your function back. To use your function you will have to first call the `new Function` and then use your function.

```javascript
value()("Hello");
// "Hello"
```
