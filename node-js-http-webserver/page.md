# Node JS HTTP Webserver
Node JS comes out of the box with a built in HTTP module that can handle Hypertext Transfer Protocol requests. You can use this to build a web server without installing anything.

The HTTP module can be used to create an HTTP server that can process requests can write back to the client.
##### Importing HTTP
```
const http = require("http");
```
##### Processing Requests
Here is a basic HTTP server using the HTTP module in Node JS. To create the server use the `http.createServer` function in the HTTP library. You need to pass in a function to handle the request and the response. The request will provide you the information on what has been sent to you and the response will be what goes to the user. Responses need to have content written to them, you can use `res.write` to add any type of data. Then to send it you close the response with `res.end`. To set the port the server listens to and to start the sever, add `.listen(port)` to the `http.createServer` function.
```
const http = require("http");

//create a server object:
http.createServer((req, res) => {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
```

##### Adding Headers
It is important to the client what type of data is being sent, you can do this using headers. To learn more about what types of headers there are you can read [this article](https://decode.sh/http-headers-basics). Just as you use `res.write` to write the body information of the request, you use `res.writeHead` to write headers and statuses to the head of the request.
```
// 200 is the HTTP status code for `OK`
// The second argument is the headers you want to set
res.writeHead(200, {'Content-Type': 'text/html'});
```

##### Routing Requests
For any web server to send information you need to know where the data needs to be sent. All of that data is in the request variable, you can read the [docs](https://nodejs.org/api/http.html) to learn all methods but we will go over the main ones that can help you route your requests.
###### Headers
* To see the headers passed from the browser use `req.getHeaders()`.
```
const headers = req.getHeaders();
// headers === { foo: 'bar' }
```
###### URL
* The URL contains the full URL sent to your web server to access use `req.url`
```
const url = req.url;
// path === "/node-js-http-webserver"
```
###### Method
* Knowing the method of the request is important so you aren't treating a `GET` request as a `POST` request or vice versa. To see the method use `req.method`.
```
const method = req.method;
// method === "GET"
```
##### Parsing the URL
To better handle the request you can use the `url` module built into Node JS here's an example of using it to parse a URL.
```
var url = require('url');
var adr = 'https://decode.sh/node-js-http-webserver?admin=false';
var q = url.parse(adr, true);

console.log(q.host); //returns 'decode.sh'
console.log(q.pathname); //returns '/node-js-http-webserver'
console.log(q.search); //returns '?admin=false'

var qdata = q.query; //returns an object: { admin: false }
console.log(qdata.admin); //returns false
```