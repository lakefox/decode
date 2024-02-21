# GraphQL: The basics

GraphQL is a data aggregation framework designed to make accessing, updating, and creating data easier. It acts very similar to REST in the sense that it is a design spec on how to structure your API, like REST there are pre-built solutions you can implement which we will go over later in this post.

### Syntax

The syntax is based on extracting information from an endpoint and returning it in a JSON object. The querying syntax looks the same as the object you want to receive back.

```graphql
{
  me {
    name
  }
}
```

##### Returns

```JSON
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

### Getting the data

Now you might be wondering how GraphQL is able to access the data and return it. This is done via getter functions, the functions are defined like below:

```javascript
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

These functions will get the user `me` using the `Query_me` function, then pass that data to the `User_name` function to grab the user's name.

### GraphQL VS REST

| Features | GraphQL | REST |
|-|-|-|
| Create | X | X |
| Update | X | X |
| Read | X | X |
| Fine Control over data | X |  |

GraphQL and REST are very similar, the main difference is GraphQL lets you control the data you are getting. Because of this you don't need to make multiple REST endpoints to collect the data you need, all of it can be sent as needed from a single endpoint.

### Database

GraphQL is not a database, it is only a query language. Here are a few databases that support GraphQL:

* MongoDB
* Redis
* SQL
If you want to know how to use these databases with GraphQL, you can visit [this](https://graphql.guide/background/databases/ "Graph QL Database Guide") resource to learn more.

### Where to use GraphQL

GraphQL can be used on the front end or the back end, using it on the front end can be a great way to speed up requests. This is done by only requesting the data you need from the server and batching it all into one request. It also works great for backend-to-backend API requests, by benefiting from the same savings.

### When to use GraphQL

GraphQL really only makes a difference when complexity grows in an application. It doesn't make sense to use it for small applications or applications where the data being requested is simple. Companies that use it are Shopify, Facebook, GitHub, and Pinterest. For them it makes sense, they are searching complex datasets and have a massive amount of data to store.
