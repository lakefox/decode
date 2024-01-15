# Getting started with Bun
Bun is a lightweight JavaScript runtime built on top of JavaScriptCore engine with a goal to provide a fast and efficient environment for running JavaScript code.

### What is Bun
Bun is a new JavaScript runtime that's built from the ground up for running code outside of the browser. It allows developers to write and run JavaScript code just like they would with Node.js but with a focus on performance and efficiency.

### Why is Bun Fast
Bun is built on top of the JavaScriptCore engine, which is the same engine that powers Safari. It's optimized for running JavaScript code quickly and efficiently, making Bun a fast runtime. In addition, the JavaScriptCore engine starts quicker and performs faster than the v8 engine that powers Node.JS and the Chrome browser.

### Is Bun Production Ready:
Yes, Bun is at a stable version however, it has not hit its 1.0.0 as of writing, so there is a possibility things might change as the engine develops. It is safe to assume if you are starting a new project that Bun would be a good fit, if you are migrating your existing app with a large user base, I would recommend waiting until the engine is at a full version release.

### Why Use Bun
Bun offers a lightweight, fast, and efficient environment for running JavaScript code. It's especially useful for building high-performance web applications, microservices, and serverless applications. In addition, because it's built on top of JavaScriptCore (the Webkit engine), it offers excellent compatibility with modern JavaScript features and libraries. It comes out of the box with features such as `fetch` and `websockets` without installing 3rd party libraries.

### Is Bun Faster Than Rust
Bun and Rust are two different things. Rust is a systems programming language, while Bun is a JavaScript runtime. Comparing their speed is not really meaningful. If you want a fair comparison, here are the stats from Bun.sh comparing Bun to Node and Deno.

![Node VS Bun VS Deno](/assets/07s58p2mozhdiex/e1vaaeuy4oc2sa3/bun_MvkHQbuEcG.webp)

### What Can Bun Run On:
Bun can run on a variety of platforms including Linux, MacOS, but not Windows.

### How to Install Bun on Ubuntu/MacOS:
To install Bun on Ubuntu/MacOS, you can use the following commands in your terminal:

```
$ curl -fsSL https://bun.sh/install | bash
```

> Bun is unable to be installed on Windows currently

Bun is a fast, lightweight, and efficient JavaScript runtime that offers an alternative to Node.js. It's production-ready and can be used to build a variety of applications. With its focus on performance and compatibility with modern JavaScript features, it's definitely worth exploring for your next project.