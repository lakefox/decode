# Basic's of Networking Protocalls
There are several networking protocols that can be used on the web, and each one serves a specific purpose. Here are some of the most common protocols.

### REST (Representational State Transfer)
This is a protocol for building web services that are scalable and easy to maintain. It uses HTTP methods like GET, POST, PUT, and DELETE to manipulate resources identified by URIs. Here's an example of a RESTful API call in JavaScript using the fetch API:

```javascript
fetch('https://example.com/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

This code sends a GET request to the URL https://example.com/api/users and logs the response data to the console.

### WebSockets with Socket.IO
This is a protocol that provides real-time, bidirectional communication between a client and a server. It's particularly useful for chat applications, multiplayer games, and other applications that require real-time updates. Here's an example of a Socket.IO connection in JavaScript:

```javascript
const io = require('socket.io-client');

const socket = io('https://example.com');

socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.on('message', (data) => {
  console.log(`Received message: ${data}`);
});

socket.emit('message', 'Hello, server!');
```

This code connects to a Socket.IO server at the URL https://example.com and logs a message to the console when the connection is established. It also listens for incoming messages and logs them to the console, and sends a message to the server with the content "Hello, server!".

> Note that in order to run this code, you'll need to have Socket.IO installed on both the client and server side. You can install it using npm:

```bash
npm install socket.io-client
```

On the server side, you can use the following code to set up a Socket.IO server:

```javascript
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Client connected!');
  socket.emit('message', 'Hello, client!');

  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
```

This code creates a new HTTP server and a Socket.IO server using the http and socket.io modules. It listens for incoming connections and logs a message to the console when a client connects. It also sends a message to the client with the content "Hello, client!", and listens for incoming messages from the client and logs them to the console. The server listens on port 3000 for incoming connections.

### RPC (Remote Procedure Call)
This is a protocol that allows a client to call a function on a remote server as if it were a local function. The client sends a request containing the function name and parameters, and the server returns a response with the result. Here's an example of an RPC call in JavaScript using the JSON-RPC library:

```javascript
const { jsonrpc } = require('jsonrpc');

const client = jsonrpc('https://example.com/api/rpc');

client.request('add', [2, 3])
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

This code creates a JSON-RPC client that sends a request to the URL https://example.com/api/rpc with the method name "add" and the parameters [2, 3], and logs the result to the console.