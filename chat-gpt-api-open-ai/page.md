# Chat GPT API OpenAI
OpenAI has just released their Chat GPT api, it is a cheap to use language model that allow you to harness the power of Chat GPT in your own application.

### What is the Chat GPT API
The Chat GPT API gives you access to the language model that powers the super popular application of the same name. The API SDK is currently only available for Python and Node.JS however, there is also an HTTP API that you can build a wrapper around to use in your language of choice.

#### Pricing
|Model | Usage |
|-------|-------|
| gpt-3.5-turbo | $0.002 / 1K tokens |

The `gpt-3.5-turbo` model is the model used in Chat GPT, the cost per 1k tokens is significantly cheap than previous models like `gpt-3`. This is a good sign that the more powerful model will most likely come down in price as newer cheaper models are released. 

Queries are priced using a `token` model, tokens don't translate directly into words but they are pieces of words. For a quick reference number, you can assume that about 750 words are 1K tokens and you are charged for the prompt you send to the API and for the response.

### What can the Chat GPT API be used for?
It can be used for any task you can put directly into the Chat GPT application for example, using it to convert between data types or to parse user input from a paragraph of text into a JSON object.

#### Using the API
The API is very straightforward to use if you are using Python or Node.JS you can follow the steps below to install the SDK and get your first prompt going:

##### Installing
**Python**
```bash
pip install openai
```

**Node.JS**
```bash
npm install openai
```

##### Usage
To use the API SDK in either language, you will first need an API key, which you can get from [here](https://openai.com "Link to Open AI's website"). Replace `OPEN_API_KEY` with the key you get from OpenAI, do not share this with anyone!

**Python**
```python
import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")
completion = openai.ChatCompletion.create(
model="gpt-3.5-turbo",
messages=[
        {"role": "user", "content": "Hello!"}
]
)

print(completion.choices[0].message)
```

**Node.JS**
```javascript
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
    
const completion = await openai.createChatCompletion({
model: "gpt-3.5-turbo",
messages: [{role: "user", content: "Hello world"}],
});
console.log(completion.data.choices[0].message);
```

##### Using the API with an SDK
The HTTP API can work with any language that can make POST requests, use the following `curl` example to try it yourself:
```bash
curl https://api.openai.com/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
  "model": "gpt-3.5-turbo",
  "messages": [{"role": "user", "content": "Hello!"}]
}'
```

### Who owns the content
Do you own the content that is produced using the API? Well that's kind of a weird question, OpenAI in their TOS in section 3 has this to say:
> Your Content. You may provide input to the Services (“Input”), and receive output generated and returned by the Services based on the Input (“Output”). Input and Output are collectively “Content.” As between the parties and to the extent permitted by applicable law, you own all Input, and subject to your compliance with these Terms, OpenAI hereby assigns to you all its rights, title, and interest in and to Output. OpenAI may use Content as necessary to provide and maintain the Services, comply with applicable laws, and enforce our policies. You are responsible for Content, including for ensuring that it does not violate any applicable law or these Terms.

So the answer is YES you do own it however, you only own it because OpenAI has given it to you.

### Limitations
The API has default limitations set (4096 - prompt tokens), however, you are able to set a higher number using the API and passing in a `max_tokens` parameter.