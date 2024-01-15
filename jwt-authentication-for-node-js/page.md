# JWT Authentication for Node.JS
Here's a step-by-step tutorial on how to create a JSON Web Token (JWT) middleware for Express in Node.js.

### Step 1: Install Dependencies
To create a JWT middleware, we'll need to install two npm packages: `jsonwebtoken` and `express`. You can install them by running the following command in your terminal:

```
npm install jsonwebtoken express
```

### Step 2: Create a JWT Utility Function
We'll start by creating a utility function that will handle the creation and verification of JWTs. This function will be used by the middleware to sign and verify tokens.

Create a new file in your project and name it `jwt.js`. Add the following code to the file:
```
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
```
Here, we've defined two functions: `createToken()` and `verifyToken()`. `createToken()` takes a payload and returns a JWT signed with a secret key. `verifyToken()` takes a JWT and returns the decoded payload if the signature is valid. We've also defined a `JWT_SECRET` constant, which will be used as the secret key for signing and verifying tokens.

Note: Make sure to replace `your_jwt_secret` with a secret of your own choice. This secret should be kept secret and not shared publicly. Optionally you can modify this utility function to accept a secret as a parameter and pass the secret through an environment variable.

### Step 3: Create a Middleware Function
Now that we have our utility functions, we can create a middleware function that will use them to verify JWTs. This middleware function will be used to protect routes that require authentication.

Create a new file in your project and name it `jwtMiddleware.js`. Add the following code to the file:
```
const { verifyToken } = require('./jwt');

function jwtMiddleware(req, res, next) {
    // Get the token from the request headers
    // Add '.split(" ").pop()' to remove any text before the token
    // i.e. `Bearer`
    const token = req.headers.authorization.split(" ").pop();
    console.log(token);
    if (!token) {
        // If there's no token, return an error
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch (err) {
        // If the token is invalid, return an error
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = jwtMiddleware;
```
Here, we've defined a middleware function called `jwtMiddleware()`. This function takes a request object, a response object, and a `next` function as arguments. It first gets the token from the request headers and verifies it using the `verifyToken()` function we defined earlier. If the token is valid, it sets the decoded payload as the user property of the request object and calls the next function. If the token is invalid, it returns a 401 Unauthorized error.

### Step 4: Use the Middleware
To use the JWT middleware, simply require it in your Express app and use it as a middleware for routes that require authentication.

Here's an example of how to use the middleware in your app:
```
const express = require('express');
const jwtMiddleware = require('./jwtMiddleware');
const { createToken } = require('./jwt');

const app = express();

// Protected route
app.get('/protected', jwtMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the protected route!' });
});

// Unprotected route
app.get('/public', (req, res) => {
    res.json({ message: 'Welcome'});
});

app.get('/register', (req, res) => {
    res.json({token: createToken({
        username: "john",
        password: "example"
    })})
});

app.listen(3000);
```
Now that we have our middleware defined, let's see how to use it.

As you may have noticed, we are passing `jwtMiddleware` as a second argument to the `/protected` route. This means that this route will be protected and will only be accessible by clients who include a valid JWT in the Authorization header.

We can test this by using Postman, cURL or any other tool to make an HTTP request to our protected route.

Assuming our Express app is running on `localhost:3000`, we can make an HTTP GET request to `http://localhost:3000/protected` with an Authorization header that includes a valid JWT.

Here's an example using cURL:
```
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJwYXNzd29yZCI6ImV4YW1wbGUiLCJpYXQiOjE2NzY1ODUyODF9.Xc6dv57JDjlNrJsLQEtYBKn5l2QUzeVmIYCQFyJdw44" http://localhost:3000/protected
```
> To create your own JWT use the example route `/register` to build your own JWT token API. This token is the same token that will be generated if you were to run the code as is.

If the JWT is valid, the server will respond with a JSON object containing the message `"Welcome to the protected route!"`. If the JWT is invalid, the server will respond with a 401 Unauthorized error.

### Conclusion
In this tutorial, we've created a JWT middleware for Express in Node.js. We've used the `jsonwebtoken` library to create and verify JWTs, and we've defined a middleware function that uses this library to protect routes that require authentication.

Using middleware like this, we can easily secure our Express API and ensure that only authenticated clients can access protected resources.

Note that this is just one example of how to implement JWT authentication in Node.js. There are many other ways to do this, and you may want to consider using a more robust library or framework, such as Passport.js, to handle authentication and authorization in your app.