# Implementing GraphQL
Learn to build a GraphQL query server in Node JS. Enable dynamic/high speed API endpoints with GraphQL and Express.

To get started with GraphQl in Node Js first you will need to install the `graphql.js` library by the GraphQL foundation. GraphQL.js helps with building queries and allows you to build APIs with Express.

### Installing
```bash
npm install graphql --save
```

### Building Schema's
```javascript
import { buildSchema }  from 'graphql';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
```
Building a schema with the javascript SDK is shown above, use the `buildSchema` method imported from the `graphql` package. Then pass a schema using the GraphQL language ([more here](https://decode.sh/graph-ql-the-basics "Basics of Graph QL")), note that the schema passed is in a template literal. 

### Creating Resolvers
```javascript
// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return 'Hello world!';
  },
};
```
After the schema is created, you can create a resolver to fill in the information asked in the query. A resolver is an object of functions with the keys corresponding to the values queried. In the resolver above the parameter `hello` will be filled by `"Hello World"`.

### Running Queries
```javascript
import { graphql } from 'graphql';
// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: '{ hello }',
  rootValue
}).then((response) => {
  console.log(response);
});
```

Using the `graphql` function from the module of the same name, you are able to execute queries on the server against the schema you created. For the first argument pass in an object with the schema, the query (as the source), and the resolver. The `source` in the query you are trying to execute, in this case, we are asking for the resolver that is named `hello` from the `rootValue` resolver.

### Running Queries with Express
Getting express running with GraphQL is done by installing the adapter `express-graphql`.

```bash
npm install express-graphql --save
```

For this example, we will use the same code above just adding in an express server along with it.

```javascript
import express from "express";
import { graphqlHTTP } from 'express-graphql';

// Code from above goes here

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
```

This will start a sever on port `4000` running your GraphQL server on it. The `graphqlHTTP` function is passed into express as middleware so you are still able to keep any traditional REST API endpoints you have created previously. The expected response will be a JSON object with the response data inside of it like below.

```json
{
	"data":
		{
			"hello": "Hello World"		
		}
}
```

The `graphiql: true` argument passed in the `graphqlHTTP` middleware will create an interface using the GraphiQL tool that lets you experiment with your new API. When using the API make sure to disable this feature so it works properly.

If you want to add authentication using JSON web tokens you can pass in the middleware from [this](https://decode.sh/jwt-authentication-for-node-js) tutorial and your routes will be protected.