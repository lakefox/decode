# Using Sever Sent Events as Light Weight "WebSockets"

Until recently I never completely understood what server-sent events were. Of course, I had a general idea of how they work, they acted as a websocket that works in one direction, allowing you to send data at different times throughout a request. What I didn't realize is how simple they were to implement and how powerfull they could be.

Let's look at the implementation of server-sent events, how they work, and the cool features built in. Along with the good attributes of server-sent events, we will also look at when NOT to use them and their limitations.

## Creating an SSE

Later on in this article, we will use the express library as our HTTP router, but let's first look at an implementation using the raw HTTP library in Node.

```javascript
const http = require("http");

function handle(req, res) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  setInterval(() => {
    let msg = `data: ${JSON.stringify({ data: Date.now() })}\n\n`;
    res.write(msg);
  }, 1000);

  req.on("close", () => {
    console.log("Closed");
  });
}

const server = http.createServer(handle);
server.listen(8080, "localhost", () => {
  console.log(`Server is running on http://localhost:8080`);
});
```

This is a very basic server but highlights the two things that need to occur for a server-sent event. The first is setting the proper header that tells the client to wait for the response. The other is to send data using the `res.write` command instead of `.end`. If you open `http://localhost:8080` in your browser you will see the data populate once every second.

## Receiving Data

If you were to use fetch to make this request you would never get a response as the request is left open. To get the data as it comes in you need to use a `EventSource` instance. This will open a request to the server, provide methods to access the data in real-time, and end the connection.

```javascript
const eventSource = new EventSource("//localhost:8080/api");

eventSource.onmessage = (e) => {
  console.log(e);
};

// eventSource.close();
```

The default event is `message` if you would like to create custom-named events you can use `addEventListener`. To send the events from the server you will need to add a line before the `data: \n\n` with an event name like below.

```text
event: time
data: "{data: 3892173289}"
```

On the client side, the `EventSource` code would look like this.

```javascript
const eventSource = new EventSource("//localhost:8080/api");

eventSource.addEventListener("time", (e) => {
  console.log(e);
});
```

## Using Express

Implementing server-sent events in Express (and most other frameworks) is the same process as above. Below is a Express server that works the same as the example above just with the Express syntax. The only thing that changed in this is the method we use to set the headers.

```javascript
app.get("/time", async function (req, res) {
  res.set({
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  res.flushHeaders();

  setInterval(() => {
    let msg = `event: time\ndata: ${JSON.stringify({
      data: Date.now(),
    })}\n\n`;
    res.write(msg);
  }, 1000);
});
```

## When Not to Use SSEs

Server-sent events are a great tool for lightweight real-time communication however, they are not a silver bullet. SSEs are only one direction, server to client, if you need to seed data both ways you should use WebSockets as that is what they are built for. If you need to send data that is not UTF-8 encodable, server-sent events are not the right tool. Lastly, server-sent events are limited by the browser, a user can only have six connections open on the browser at any given time. If you have a case where WebSockets would be a better fit, then you should stick with them. This does not mean don't use SSE, just use them as you need them.
