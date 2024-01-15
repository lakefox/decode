# Node JS Express Server
Even though Node JS has a built in HTTP request handler using a web server framework can reduce the amount of code and increase the reliability of your site. There are many options to choose from however express is one of the most popular for it's easy to use syntax and wide support.

#### Installation
```
npm install express --save
```

##### Hello World
Here is a simple `Hello World` server that listens on port 3000. To start a server create an instance of `express()`, like in line 2. Add the listeners, `app.get` for get requests and `app.post` for post requests. If you followed the [Node JS HTTP Webserver](https://decode.sh/node-js-http-webserver) tutorial, express works very simular however all you need to send data is `res.send`. To start the server call `app.listen(port)` just like using the HTTP module.
```
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
```
##### Routing
Express makes routing easy with the `.get`/`.post` functions, the first argument, in this case `'/hello'` is the path. In this example, if you were to go to `http://localhost:3000/hello` you would see `You're on /hello!`.
```
app.get('/hello', function (req, res) {
  res.send('You're on /hello!');
});
```
If you want to add wildcard paths you can add a wildcard marker `*` at any point in your path. This will route to anything with `/hello/` in front of it. To see what URL you are serving use `req.url`.
```
app.get('/hello/*', function (req, res) {
  res.send('You're on " + req.url);
});
```
 This is a very basic tutorial on how to use express to process `POST` body data, serve static files, or serve content with CORS enabled check out our tutorial on [Express Plugins](https://decode.sh/express-plugins).