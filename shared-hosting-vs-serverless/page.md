# Shared Hosting vs Serverless
When building a web service should you build your application on a shared hosting plan like Digital Ocean, or should you use a service like AWS Lambda or Cloudflare's Workers?

When starting your MVP, you may think building on serverless is the way to go, but it can add complexity to your application and slow development time. Remember, your goal is to create a minimum working product, and building on a shared hosting platform can reduce complexity by providing an environment similar to your development setup. Once you've moved beyond the MVP stage, you can build a serverless version with the advantage of already having the kinks ironed out.

### Advantages of Serverless
Serverless is superior to shared hosting in terms of pricing, speed, and availability. When using a service like Lambda or Workers you only pay for what you use and with Workers, you are able to deploy your function across Cloudflare's entire network.

### Why use Shared Hosting
While serverless offers advantages such as superior pricing, speed, and availability compared to shared hosting, it may not be the best choice for new developers or those with limited experience with serverless systems. Shared hosting provides a fixed cost to run your application while still providing more than enough computing power. When dealing with serverless applications, there are enough differences between traditional and serverless development that you may get stuck at some point and spend more time learning and debugging instead of building features for your application.

