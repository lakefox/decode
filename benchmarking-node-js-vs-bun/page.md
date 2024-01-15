# Benchmarking Node JS vs Bun
Recently Bun added a compiling feature in version 0.6.1. Curious about its functionality, I conducted a comparison between compiled and uncompiled versions as a baseline. I also tested it against Node JS compiled with pkg. Here are the results!

### Results
#{spreadsheet}
	Stat | Node | Bun | Compiled Node | Compiled Bun
	Requests/sec | 80333.19 | 201346.62 | 77023.24 | 200285.12
	Transfer/sec | 10.65MB | 25.15MB | 10.21MB | 25.02MB
	Total Requests | 2418249 | 6061438 | 2313736 | 6029319
	||
	Difference % | | =TRUNC(C4/B4*100) || =TRUNC(E4/D4*100)
     

The results above show that uncompiled Bun code is the fastest of the four tested methods and it is `250%` faster than the second fastest, uncompiled Node.

### Methodology

In this test, I ran four benchmarks on Node JS and Bun default HTTP modules using the `wrk` command below.

#### Benchmark
```bash
wrk -t12 -c400 -d30s http://127.0.0.1:3000
```

* Bun 
	* Version 0.6.1
* Node
	* Version 18.6.0

### Servers
Here's the code that each test used respectively, I keep things as simple as possible to focus on the core HTTP performance of each framework.

#### Bun
```javascript
Bun.serve({
  port: 3000,
  async fetch(request) {
    return new Response("Welcome to Bun!");
  },
});
```

#### Node
```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Welcome to Node!");
});
server.listen(3000, "localhost");
```
### Uncompiled Benchmarks

#### Bun
```text
Running 30s test @ http://127.0.0.1:3000
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.19ms  190.99us  11.61ms   92.16%
    Req/Sec    16.88k     5.16k   33.84k    57.33%
  6061438 requests in 30.10s, 757.26MB read
  Socket errors: connect 155, read 93, write 0, timeout 0
Requests/sec: 201346.62
Transfer/sec:     25.15MB
```

#### Node
```text
Running 30s test @ http://127.0.0.1:3000
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.00ms  352.38us  27.28ms   98.85%
    Req/Sec     6.74k     2.01k   16.86k    67.48%
  2418249 requests in 30.10s, 320.56MB read
  Socket errors: connect 155, read 113, write 0, timeout 0
Requests/sec:  80333.19
Transfer/sec:     10.65MB
```

### Compiled Benchmarks

#### Bun
To compile the server using Bun, I used the following command.

```text
bun build --compile bun_server.js
```

##### Results

```text
Running 30s test @ http://127.0.0.1:3000
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.18ms  194.89us   8.22ms   92.22%
    Req/Sec    16.80k     6.94k   49.71k    60.40%
  6029319 requests in 30.10s, 753.25MB read
  Socket errors: connect 157, read 96, write 0, timeout 0
Requests/sec: 200285.12
Transfer/sec:     25.02MB
```

#### Node
To compile a Node JS application into a single binary file I used the package `pkg` which was created by the founder of Vercel. It supports making a compile script that is able to automatically compile the server when run but for this test, I used the CLI command like below.

```text
pkg node_server.js
```

For more information and installation instructions on `pkg` see [the official NPM page.](https://www.npmjs.com/package/pkg)

##### Results
```text
Running 30s test @ http://127.0.0.1:3000
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.13ms  265.98us  21.10ms   98.80%
    Req/Sec     6.46k     2.26k   10.97k    66.47%
  2313736 requests in 30.04s, 306.71MB read
  Socket errors: connect 155, read 108, write 0, timeout 0
Requests/sec:  77023.24
Transfer/sec:     10.21MB
```

### Takeaways
Bun can be a lot faster than Node and it's going to be very exciting to see the further development of the project. This does not take away from Node however, Bun is still unstable as good as it is and it has a pretty different style that takes getting used to. I know that I will be using Bun in future projects but will stay with Node for anything that needs reliability. One thing that does need to be addressed before Bun can be seen as a competitor to Node is the documentation. 
