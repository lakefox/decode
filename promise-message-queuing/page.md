# Promise Message Queuing

When building an application, if you are like me, you make multiple requests to your database per request. I recently ran into an issue with syncing the fetching of data from my database and returning a response as soon as possible. Here's how I fixed it.

## The Problem

Three database queries are running on the server side of this website's homepage. One to get the site's styling, one to get the posts, and the last to get the series listed on the sidebar. Previously, I was chaining the queries to run one after another, in hindsight this is a bad idea because you have to wait the sum of the three requests time before the site responds. This causes the initial response from the server to be slow, but it was nothing too crazy. Here is the code version of how it was laid out.

```javascript
DB.get("styles").then(() => {
  DB.get("posts").then(() => {
    DB.get("series").then(() => {
      /* send the data to the client */
    });
  });
});
```

> Note: this is not the actual code for this site, I use PocketBase as the database and SvelteKit as the framework. Writing out the actual code provides nothing.

## What I did

I knew the best approach to loading the database queries is to start them all at the same time and then when the last one finishes, send the response to the client. So I built a little helper class that you can "register" a promise and a finishing event to. Here's what I came up with:

```javascript
export class pQue {
  constructor() {
    let tasks = 0;
    let complete = 0;
    let store = {};
    let resolve = () => {};
    this.register = (promise) => {
      tasks++;
      promise.then((data) => {
        complete++;
        store = Object.assign(store, data);
        if (complete == tasks) {
          resolve(store);
        }
      });
    };
    this.then = (cb) => {
      resolve = cb;
    };
  }
}
```

Here's the function in use with the previous example:

```javascript
let queue = new pQue();

// Handle the data once all promises are complete
queue.then((data) => {
  res.send(data);
});

queue.register(DB.get("styles"));
queue.register(DB.get("posts"));
queue.register(DB.get("series"));
```

When the class is initiated, the constructor creates a "task manager" of sorts, that keeps track of how many promises have been registered and how many are completed. The `register` function takes a promise as an argument and updates the task variable to keep track of the promises still hanging. When the promise completes, the `.then` function of the `pQue` class is used to update the completed promises tracker and then maps the values of the promise to the store variable. Once all promises are complete, the `.then` function of the `pQue` function is then called with the `store` variable passed.
