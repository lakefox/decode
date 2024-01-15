# Using Different Servers with Svelte
Svelte by default uses the Node.JS http module as it's router. Here we will talk about using Express or Polka as middleware to implement API routes.

### Assumptions
We won't go over installing Express or Polka here.

### Using adapter-node
* [Building SvelteKit for Node JS](https://decode.sh/building-svelte-kit-for-node-js)
To use an alternative Node.JS server first, you will need to build your application for Node using the `adapter-node` package. Follow the linked tutorial, then proceed.

### Using Express
After building the application for node, Svelte will output two files, `handler.js` and `index.js`. The `handler.js` file will be the file you pass into Express as middleware.

Next, make a new file and paste the following code into it. This import the `handler.js` file into an express server and adds a `/healthcheck` route then starts the server on port `3000`. If you built the application in a different directory make sure to change the `./build/handler.js` route.

```javascript
import { handler } from './build/handler.js';
import express from 'express';
 
const app = express();
 
// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});
 
// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
 
app.listen(3000, () => {
  console.log('listening on port 3000');
});
```

### Using Polka
Polka and Express have very simular APIs, which makes using them interchangeably very easy. To use polka simply replace the import statement for express with polka and everything will work.