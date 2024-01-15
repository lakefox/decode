# Svelte Environment Varibles

Environment variables are values that can be passed to an application at runtime, that influence the behavior or configuration of the application. They are stored in key-value pairs and can be used to store sensitive information, such as passwords, API keys, or configuration settings. This information is made available to the application through the operating system, so the application can use it without having to hardcode the values into the codebase.

![Svelte + Env](./svelte_env_FsR372L332.webp)

In Svelte, you can use environment variables by accessing the process.env object, which holds all the environment variables available to your application.

For example, to use an environment variable named API_KEY in a Svelte component, you would do the following:

```javascript
<script>import {API_KEY} from '$env/static/private';</script>
```

```text
NOTE: Svelte will not allow environment variables to be sent to the client side
```

With Svelte Kit, you can use environment variables during the build process by adding a .env file to the root of your project, and then referencing the variables via `$env/static/private`. The environment variables declared in the .env file will be made available to your application at run time.

Here's an example .env file:

```sh
API_KEY=abc123
SITE_NAME=decode.sh
```

## Client-Side Environment Variables

Svelte will block access to any variable stored in your `.env` file if you are using the above method. If you know what you are potentially doing you can use the method below to send variables to the client side, be careful not to leak any sensitive data out this way.

```javascript
import * as dotenv from "dotenv";
dotenv.config();
let { SITE_NAME } = process.env;
```
