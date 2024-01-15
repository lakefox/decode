# Building GraphQL Resolvers
Figuring out how to make GraphQL resolvers is tricky when you get past the basic static routes. Here's a straight forward tutorial that goes over creating resolvers.

### Prerequisite
* [GraphQL: The basics](https://decode.sh/graph-ql-the-basics)
* [Implementing GraphQL](https://decode.sh/implementing-graph-ql)

The previous tutorials cover what GraphQL is and how to implement it in an express server. In this tutorial, we will try to establish how GrpahQL uses resolvers to fill data in a request and how to write the resolvers. 

### Setting up the Schema
Building a modular schema is fundamental to building a good API. The first step in building a good schema is knowing what the data you want to get out looks like. Here we will want to be able to make three types of queries, the first being pulling information about a book. The second and third are filtering books by authors and getting all of the books we have in the database. We will be using the following JSON object as our "database".
```javascript
// Some dummy data
const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
  },
];
```

Before building the `Query` object let's define what a book looks like so we are able to return the books as a result. Our book object `Book` will match the shape of the array items in the database, having an `id`, `title`, and `author` like below.
```javascript
type Book {
    id: Int
    title: String
    author: String
 }
```

For the `Query` object we will define which routes we want to make available and what data the resolvers will need to function. The `book` route is the route that can get a book by its `id`. The exclamation point after the `Int` for the `id` argument tells GraphQL that a parameter is required. The `book` route then returns a `Book` object which is the same object defined above. The next route is the `books` route, which takes the author of the book and filters out any non-matching books. As you can see this parameter is required also. The last route we will have is the `all` route which can return our entire database to the client. The brackets around `Book` tells GraphQL that the response should be an array of `Book` objects.
```javascript
type Query {
    book(id: Int!): Book
    books(author: String!): [Book]
    all: [Book]
  }
```

#### Where to put this at?
Up to this point, the code examples have not been "full" code examples. When it comes to building the schema for your API you need to put these objects inside of the `buildSchema` function.
```javascript
// Construct a schema using GraphQL schema language
const schema = buildSchema(`
type Query {
  book(id: Int!): Book
  books(author: String!): [Book]
  all: [Book]
}

type Book {
  id: Int
  title: String
  author: String
}
`);
```

### Building the Resolvers
Resolvers act as the keys in the query, to better understand this here is a GraphQL query.
```javascript
{
  book(id: 3) {
    title
  }
}
```

This query is asking to get data from the `book` function and passes `id` as a parameter with a value of one to it. Then it takes the response of the `book` function and extracts the `title` parameter from it then returns the data.

To build a resolver start with an new object, typically this is called `root`, and add the functions you laid out in the previous steps like below.
```javascript
// Define the resolvers
const root = {
  book: ({ id }) => books.find((book) => book.id === id),
  books: ({ author }) => books.filter((book) => book.author === author),
  all: () => books
};
```
The `root` object contains the `book` function that takes the book id as a parameter and then finds the correct book entree to send back. To extract data from the returned object in a resolver you don't have to add a thing. GraphQL automatically handles the extraction of data. For example, now that we have resolvers defined, we can pass the query above and it would return then following:
```javascript
{
  "data": {
    "book": {
      "title": "1984"
    }
  }
}
```

### Full Code Example
```javascript
import express from "express";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Construct a schema using GraphQL schema language
const schema = buildSchema(`
  type Query {
    book(id: Int!): Book
    books(author: String!): [Book]
    all: [Book]
  }

  type Book {
    id: Int
    title: String
    author: String
  }
`);

// Some dummy data
const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
  },
];

// Define the resolvers
const root = {
  book: ({ id }) => books.find((book) => book.id === id),
  books: ({ author }) => books.filter((book) => book.author === author),
  all: () => books
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
```