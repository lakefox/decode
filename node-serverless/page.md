# Node Serverless
Serverless computing has gained immense popularity in recent years, especially with the rise of cloud computing. With the help of serverless architecture, developers can now focus more on the business logic of their applications rather than worrying about the infrastructure setup. In this tutorial, we will discuss how to make serverless APIs in Node.js using the Serverless Framework.

### Why is it called serverless?
The term serverless doesn't mean there aren't any servers involved; instead, it means that the developer doesn't have to manage the servers. In traditional server-based architectures, developers need to manage servers, including their maintenance, scaling, and security. In serverless architecture, the cloud provider manages the servers, and the developer only focuses on the application code.

### What language is Serverless Framework?
Serverless Framework is a tool for building serverless applications in various programming languages, including Node.js, Python, Java, and Go. It provides a simple and intuitive way to deploy serverless applications on popular cloud providers like AWS, Azure, and Google Cloud Platform.

### What does Serverless Framework do?
The Serverless Framework simplifies the process of building, deploying and managing serverless applications. It provides a command-line interface (CLI) for creating, testing, and deploying serverless functions and APIs. It also allows developers to specify the required resources, such as AWS Lambda functions, API Gateway endpoints, and Amazon S3 buckets, in a serverless.yml file.

### Pro's
> The primary benefit of serverless architecture is that it frees developers from managing servers, allowing them to focus on the application code. Serverless computing also provides automatic scaling, reduces infrastructure costs, and enables faster time-to-market. 

### Con's
> One of the biggest disadvantages of serverless computing is that it can be challenging to test and debug serverless functions locally. Another drawback is that serverless computing introduces more complexity to the application architecture, making it harder to manage and monitor.

### What is an example of serverless?
One of the most common use cases for serverless computing is building APIs. For example, a developer can use AWS Lambda functions and API Gateway endpoints to build a serverless API that responds to HTTP requests. The Lambda function can be triggered by the API Gateway endpoint and return the required response.

### When should you not be serverless?
Serverless computing may not be suitable for every use case. If you need to manage and maintain long-lived connections or stateful services, you may want to consider a traditional server-based architecture. Additionally, if you need low latency or high throughput, serverless may not be the best option, as there is an inherent cold-start delay when invoking serverless functions for the first time.