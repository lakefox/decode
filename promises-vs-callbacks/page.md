# Promises VS Callbacks

Promises and callbacks are both ways to handle asynchronous code in JavaScript. A callback is a function passed as an argument to another function and executed after the first function has been completed. A Promise is an object that is returned immediately, representing a value that may not be available yet. Promises are more powerful than callbacks because they provide a way to compose asynchronous operations and methods to handle errors. Promises also provide better readability and maintainability by eliminating the need for nested code blocks.

## Promises

Promises are object that are returned as soon as you call them allow the thread to continue processing and will return once the process inside the promise is complete. Here is a simple example:

```javascript
function oneSecond(msg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(msg);
    }, 1000);
  });
}

oneSecond("Hello World").then((msg) => {
  console.log(msg);
});
console.log("Promise called!");
```

The expected output of this should look like this:

```text
> "Promise called!"
> "Hello Word"
```

As you can see the main process has continued to run letting the code in the promise complete in its own time.

## Callbacks

Callbacks work similarly to promises, below is the same example written with a callback instead.

```javascript
function oneSecond(msg, callback) {
  setTimeout(() => {
    callback(msg);
  }, 1000);
}

oneSecond("Hello World", (msg) => {
  console.log(msg);
});
console.log("Callback called!");
```

## Differences

Promises are returned by the main function while callbacks are not called until the code inside has been completed. Promises also have a couple of other features like the ability to run asynchronously and synchronously using the `await` keyword. Below is an example using the same `oneSecond()` function above.

```javascript
let msg = await oneSecond("Hello World");
console.log(msg);
console.log("Promise called");
```

The output would look like this because the thread waits for the promise to fulfill itself before continuing.

```text
> "Hellow World"
> "Promise called"
```

Another feature of promises is the ability to reject the promise if an error occurs.

```javascript
function oneSecond(msg) {
  return new Promise((resolve, reject) => {
    if (msg.length < 5) {
      setTimeout(() => {
        resolve(msg);
      }, 1000);
    } else {
      reject("Message too long");
    }
  });
}

oneSecond("Hello World")
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.log(err);
  });
console.log("Promise called!");
```

The output would look like this.

```text
> "Message too long"
> "Promise called"
```

The error message shows first because the if statement doesn't ever call the `setTimeout` function because the message is greater than 5 characters. When the reject function is called, the output skips all of the `then` statements and just to the `catch` statement that handles all rejections.
