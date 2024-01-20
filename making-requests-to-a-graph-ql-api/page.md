# Making Requests to a GraphQL API

Interfacing with a GraphQL API can be done with dedicated libraries, or with custom helper functions you create. We will only be covering the custom method here.

## Prerequisite

- [GraphQL: The basics](https://decode.sh/graph-ql-the-basics)
- [Implementing GraphQL](https://decode.sh/implementing-graph-ql)
- [Building GraphQL Resolvers](https://decode.sh/building-graph-ql-resolvers)

This tutorial is based on the previous three tutorials in this series, all examples here will be based on the last GraphQL server we made.

## Requests

GraphQL is a POST-based API that takes a JSON object as the request's body with your query inside. The best way to make this request is to use the [fetch](https://decode.sh/fetch-api) API. Here is the function I use to make requests

```javascript
function graph(request) {
  return new Promise((resolve, reject) => {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: request[0] }),
    })
      .then((r) => r.json())
      .then((e) => resolve(e.data))
      .catch(reject);
  });
}
```

This function takes the query as the `request` parameter the returns a Promise that makes a fetch request with the payload. This function is hard coded with the API route built-in, if you are not using `/graphql` as the API endpoint then change it to what you are using.

## Usage

```javascript
graph`{
    all {
        title
    }
}`.then(console.log);
```

Here we are using a tagged template to pass the query to the `graph` function. This function is asynchronous, so we handle the returned value just like you normally would with a Promise. If you are not calling this function from the top level, you can use the async/await syntax like below.

```javascript
let data = await graph`{
    all {
        title
    }
}`;
console.log(data);
```
