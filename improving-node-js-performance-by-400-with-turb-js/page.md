# Improving Node JS performance by 400% with Turb.js

Turb.js is a function caching server that turbo charges your application with safe and fast memory management. Today we will use Turb to increase the performance of static assets in our PocketBase database. Although this example is for PocketBase, Turb can be used anywhere in your application to speed up long processes.

From the description we know that turb is a function caching server, but what does that mean? Turb acts as an intermediate layer between your database's SDK and your application by storing each function call in memory. After the response is stored in memory, you won't have to request the asset from your database again! After I added turb to this site, I saw a 4x decrease in load times.

### Installing Turb

```text
npm i turb
```

#### Building the server

```text
git clone https://github.com/lakefox/turb.git
cd turb
npm run build
```

> After the executable is built I moved turb to the top of my application and deleted the repository.

In the folder you move the executable, create a `config.json` that looks like below. This will create a single shard named "PocketBase" that is allocated 50MB of storage.

```json
{
    "shards": {
        "PocketBase": {
            "size": 50000000
        }
    },
    "hostname": "0.0.0.0",
    "port": 6748
}
```

### PocketBase API layer

This is just a simple wrapper for the PocketBase JS SDK that will grab a post from the collection posts, filtering the request by the slug attribute. You might have your own way of querying your database but this is the way I like to do it as it gives me a direct function to get what I need.

```javascript
export async function getPost(slug) {
 return new Promise((resolve) => {
  resolve(
   pb.collection('posts').getFullList(200, {
    filter: `slug = "${hostname}" && active = true`
   })
  );
 });
}
```

Now we will use this module as the function we will cache using turb. Below shows the basics of importing the module, registering a function, and calling the function. The register step is the key part of the script, it creates an exact duplicate of the function provided and when called it handles the caching system.

> If you want to learn more about how the caching system works, visit the NPM page [here](https://www.npmjs.com/package/turb).

```javascript
import { turb } from "turb";
import { getPost } from "./pocketbase.wrapper.js";

// Initiate the turb module
let turb0 = new Turb({
 shard: "PocketBase"
});

// Register the function
let turb0GetPost = turb0.register(getPost);

let slug = "improving-pocket-base-performance-by-400-with-turb-js";

console.time();
// Non cached version
let post1 = await getPost(slug);
console.timeEnd();

console.time();
// Cached version
let post2 = await turb0GetPost(slug);
console.timeEnd();
```

When this is run twice, the results are very significant obviously this example will not work for you unless you have access to this site database. However, before I implemented turb into this site, I benchmarked it using the `wrk` command and this is what I got.

### Results

#### Before

```text
Running 30s test @ https://decode.sh
12 threads and 400 connections
Thread Stats   Avg      Stdev     Max   +/- Stdev
Latency     0.00us    0.00us   0.00us     nan%
Req/Sec     2.81      4.59    20.00     82.22%
104 requests in 30.09s, 7.31MB read
Socket errors: connect 157, read 0, write 0, timeout 104
Requests/sec:      3.46
Transfer/sec:    248.94KB
```

#### After

```text
Running 30s test @ https://decode.sh
12 threads and 400 connections
Thread Stats   Avg      Stdev     Max   +/- Stdev
Latency     1.22s   592.91ms   1.84s    66.67%
Req/Sec     4.59      4.80    30.00     79.56%
421 requests in 30.08s, 29.61MB read
Socket errors: connect 157, read 0, write 0, timeout 415
Requests/sec:     14.00
Transfer/sec:      0.98MB
```

As you can see turb improved performance by over 400%! If you have any questions on how turb works feel free to drop them in the comments or create an issue on the GitHub repository.
