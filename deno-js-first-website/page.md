# Deno JS: First Website
Deno is a runtime for JavaScript and TypeScript that allows developers to build web applications with the use of its built-in module system. One of the most popular web frameworks for Deno is Oak, which provides a simple and intuitive API for building web applications. In this tutorial, we will learn how to set up a basic Deno website using the Oak package.

First, you will need to initialize a new Deno project in a folder you have created for your project. Type the following command to initialize a new Deno project:
```
deno init
```
###### Output
```
✅ Project initialized

Run these commands to get started

  # Run the program
  deno run main.ts

  # Run the program and watch for file changes
  deno task dev

  # Run the tests
  deno test

  # Run the benchmarks
  deno bench
```

### Oak
Deno does not require you to install packages and is able to `import` any modules from just a URL passed in the `import` statement. To import the most current version of Oak, the webserver library for Deno, you will use an import statement like below:
```
import { Application } from "https://deno.land/x/oak/mod.ts";
```
The Application class coordinates managing the HTTP server, running middleware, and handling errors that occur when processing requests. Two methods are generally used: .use() and .listen(). Middleware is added via the .use() method and the .listen() method will start the server and start processing requests with the registered middleware.

### Hello World
```
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```
If you are familiar with Node.JS's package express, the syntax of Oak will feel very familiar. In the code above the `Application` class is defined, then a router is defined that will process the request.
> This is the example from the documentation, in further tutorials we will dive into the `Router` class that will enable `GET` and `POST` requests with dynamic routing

To start the server `app.listen` is called with the port passed in with in the options parameter.

### CTX
The CTX parameter passed in the `app.use` function provides context about the current request and response to middleware functions. It provides three methods, `request`, `response`, and `cookies`.
* Request
	* Information about the request.
* Response
	* Information about the response.
* Cookies
	* Cookies are stored here.

### Running
```
deno run  --allow-net main.ts
```
In Deno, by default, network access is disabled for security reasons. This means that if you try to make any network requests in your Deno application without enabling network access, the application will throw an error.

In the case of using Oak as a server, it needs to be able to listen for incoming requests and respond to them over the network. By default, Deno will not allow this behavior without explicit permission from the user.

Therefore, to use Oak as a server in Deno, you need to add the --allow-net flag when running your application. This flag tells Deno to allow network access for your application, which enables Oak to listen for incoming requests and respond to them over the network.

It's important to note that while enabling network access does open up a potential security risk, the --allow-net flag only allows network access to the specific domain or IP address specified in the application. This means that even with --allow-net enabled, your application will only be able to communicate with the specified domain or IP address, and not any other external servers.