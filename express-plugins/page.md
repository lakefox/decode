# Express Plugins
Express plugins can be used to process POST body data, serve static files, or serve content with CORS enabled. Learn the basics of app.use.

First, we will start off with parsing a POST requests body. If you are familiar with Express v3.x you with know about `body-parser` in Express v4.x has been replaced with `urlencoded`, here's how to use it:
```
app.use(express.urlencoded({ extended: true }));
```
This will parse the POST request and add the data to your request object's `.body` property. 

If your data is in a JSON format you will need to add another built-in function to parse it like below.
```
app.use(express.json());
```

If you want to serve static files like HTML documents, CSS, JS, or Media files you will need to use the `.static` adapter with the directory you want to pull from as the first argument.
```
app.use(express.static('public'));
```

Those are the most important built-in functions to know how to use, however, there are a few that don't come along with express but are helpful to know how to use.

##### CORS
Cross-Origin Resource Sharing or CORS is the way you can share resources from different websites. This data is set in the Head of the HTTP request to automatically do this Express has the `cors` module.
###### Installation
```
npm i cors
```
###### Usage
```
const cors = require("cors");
app.use(cors());
```
##### GZIP
If you want to compress your data before sending it to the client Express has the `compression` module that auto-compresses all out bound data.
###### Installation
```
npm i compression
```
###### Usage
```
app.use(compression());
```
