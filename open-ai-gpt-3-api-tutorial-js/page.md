# Open AI GPT-3 API Tutorial JS
How to use the GPT-3 API in Node JS to generate text for any use.

## Installation
```bash
npm install openai
```

## Authentication
The OpenAI API uses API keys for authentication, the best practice is to store the key in an environment variable to prevent accidental exposure to the web. You can get your API key from the [API keys](https://beta.openai.com/account/api-keys) page on OpenAI's website.

The code below show's the basics of authenticating with the JS SDK, the API key is pulled from the environment variable set using `process.env`. Then the configuration object if passed to the `OpenAIApi` class.
```javascript
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
```

## Creating a Request
GPT-3 is a General Purpose Text model designed to complete chunks of text, to use it with the JS SDK call the `OpenAIAPI` classes method `createCompletion`. The `createCompletion` method has a configuration object where you can pass in [arguments](https://beta.openai.com/docs/api-reference/completions/create). 

The code below is an example of a completion, type the text you want to be completed to generate a runnable code snippet.
##### Input
@[text]{Say this is a test}

```javascript
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "@{text}",
  max_tokens: 7,
  temperature: 0,
});
```
### Response
This is an example response of a completion with a prompt of `Say this is a test`. The result is stored in the  `choices` array with other meta data in the object.
```javascript
{
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "text-davinci-003",
  "choices": [
    {
      "text": "\n\nThis is indeed a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}

```

This is just the basics of getting started with the GPT-3 API, in the next post we will talk about how to generate images using DALLE-2 using the JS SDK.