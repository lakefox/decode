# Deno JS: Oak Routing
Oak is a middleware framework for Deno that provides a simple and modular way to handle HTTP requests and responses. Here is how to setup basic routing.

In Oak, URL routing is handled by creating a router and defining routes using the Router class. Here's an example:
```
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "Hello, world!";
    })
    .get("/users", (context) => {
        context.response.body = "List of users";
    })
    .post("/users", async (context) => {
        const body = await context.request.body();
        console.log(body.value);
        context.response.body = "User created";
    });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
```

Save the file into `server.ts` and start using the command below:
```
deno --allow-net server.ts
```

In this example, we create a new Router instance and define three routes: `GET /`, `GET /users`, and `POST /users`. Each route handler takes a context object as an argument, which contains information about the incoming request and response. In the first route handler, we simply set the response body to a greeting. In the second route handler, we set the response body to a list of users. In the third route handler, we retrieve the request body and log it, then set the response body to indicate that a user was created.

Finally, we create a new `Application` instance and use the router's `routes` method and `allowedMethods` method as middleware for handling requests. The `routes` method maps incoming requests to the appropriate route handler based on the HTTP method and URL path, while the `allowedMethods` method sends an appropriate response for requests with unsupported HTTP methods.

When we run this application and make requests to the appropriate URLs, the appropriate route handlers will be invoked and the response will be sent back to the client.