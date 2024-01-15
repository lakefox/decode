# Ditch Algolia, Create Your Own Content Search Engine
Build a full-text search engine with autocorrect for the content of your website that directly connects to your database. Users being able to find the content they want on your site is essential. Out-of-the-box solutions like Algolia are great, but it probably isn't the best use of resources for a small website. With this tutorial, we will use flexsearch to search documents and use some custom code to make the result 10x better.

This tutorial is designed to be platform-neutral and can be used with any database, server, or framework. While we'll be focusing on setting up an express server, the search function can easily be adapted to work in any part of your application. After configuring the server, we'll implement the autocorrect feature and leverage flexsearch to locate relevant documents.

### Dependences
```text
npm i express flexsearch stopword closest-match
```

* `express`
	* Acts as a middleware for our web server
* `flexsearch`
	* Implements a full-text search algorithm that allows for quick querying
* `stopword`
	* Removes stopwords from the search query
* `closest-match`
	* Used to create autocorrect 

### Express Server
###### `/server.js`
Here's a basic express server that utilizes `express.json()` to extract data from POST requests. We import the search function at the beginning and pass it into a POST route after the JSON parser. This not only works as a standalone express app but can be used with Svelte when built for Node JS. All of this code should be put into your main server file, I use `server.js`.

```javascript
import { search } from './search.js';
import express from 'express';

const app = express();
app.use(express.json());

// The search route
app.post('/search', search);

// Other Routes for your website

app.listen(5173, () => {
	console.log('listening on port 5173');
});

```

To utilize the search feature in your application, you must send a POST request to the server provided. Please note that this cannot be utilized as a SvelteKit/React endpoint since the searchable documents' entire database must be stored in memory. Otherwise, you would have to read the entire database and index the documents every time you conduct a search query.

### Populating the Index
###### `/search.js`

We will be using the flexsearch `Document` index because this site is based on a document model however if your data looks different pick the one that fits the best. To initiate the server we need to first load all of our documents from our database into flexsearch. I will be using pseudo code for the database part, just adapt it to your database. 

```javascript
import Document from "flexsearch/src/document.js";
import { Autocorrect } from "./autocorrect.js";

let corrector = new Autocorrect();

// Initiate your Document index with the correct indexable fields
let findDocument = new Document({
	document: {
		// Add your own fields
		index: ['title', 'description', 'content']
	}
});

// Fetch all searchable documents from the database
let docs = DB.getAll("Documents");

// Add the documents to the "findDocuments" index and the autocorrect function
for (let i = 0; i < docs.length; i++) {
	findDocument.add(docs[i]);
	corrector.add(docs[i].title);
	corrector.add(docs[i].description);
	corrector.add(docs[i].content);
}
```

### Auto Correct
###### `/autocorrect.js`

Our autocorrect function works by taking every word in all of the documents and comparing the search query to each one to find the most likely match to the intended query. This is based on the assumption that every word is spelled correctly. An added benefit of this method is that if the word the user searches is not in the database, it will find the closest match to the word and still send results.
```javascript
import { closestMatch } from 'closest-match';

export function Autocorrect() {
	let words = [];
	// The add function takes a string of text and replaces any non-alphanumeric
	// character and split the string by spaces
	this.add = (document) => {
		words.push(
			...document
				.replace(/[^A-Za-z0-9\s]/g, '')
				.toLowerCase()
				.split(' ')
		);
		// Store the new string in the "words" bank and remove any repeating words
		words = [...new Set(words)];
	};
	
	// The fix function also removes non-alphanumeric characters and splits the string
	// by spaces. Then is loops through each word and compares the word to the 
	// word bank then returns the fixed query
	this.fix = (text) => {
		let query = text
			.replace(/[^A-Za-z0-9\s]/g, '')
			.toLowerCase()
			.split(' ');
		for (let i = 0; i < query.length; i++) {
			query[i] = closestMatch(query[i], words);
		}
		return query.join(' ');
	};
}
```

### Search Function
###### `/search.js`

Now getting into the actual searching part, we need to create the search function. We will use the npm package `stopword` to remove stopwords (filler words) from our query. This improves the search results because documents with words like "the" will not be weighted in the search results. All this code goes into the same `search.js` file as above so we have already loaded all of the documents into the database and the autocorrecter.

```javascript
import { removeStopwords } from "stopword/dist/stopword.esm.mjs";

export function search(req, res) {
  // The first step is to get and clean the query from the "req" using req.body.search
  // Then use the corrector to fix the misspelled words and also remove stopwords
  let query = removeStopwords(corrector.fix(req.body.search).split(" ")).join(
    " "
  );

  // Search the findDocument index for the query and extract the document ids from
  // the results, removing all repeating ids by creating a Set object.
  let ids = [
    ...new Set(
      findDocument
        .search(query)
        .map((e) => e.result)
        .flat()
    ),
  ];
  // If no ids are returned, send an empty results object
  if (ids.length == 0) {
    res.end({ results: [] });
  } else {
	// If ids are returned, get the documents from the database and send them to the client
    let results = DB.getRecordsById(ids);
    res.end({ results });
  }
}

```