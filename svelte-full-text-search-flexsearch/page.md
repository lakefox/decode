# Svelte Full Text Search - flexsearch

"flexsearch" is a JavaScript library for fast, flexible, and robust search and indexing. It provides a high-performance search engine that is optimized for search and indexing, and can be used in both client-side and server-side applications. It supports a range of features including full-text search, fuzzy search, query highlighting, and auto-suggestions. Here's how to implement it into a Svelte project.

## Install

```text
npm install flexsearch
```

## Importing into your project

`flexsearch` has three types of indexes:

- Index is a flat high performance index that stores id-content-pairs.
- Worker / WorkerIndex is a flat index that stores id-content pairs but runs in the background as a dedicated worker thread.
- Document is a multi-field index that can store complex JSON documents (could also exist of worker indexes).

Most of you probably need just one of them according to your scenario. To import via the npm package you will need to import just the single index you want below is an example of `Index` and `Document` being imported into a project:

```javascript
import Document from "flexsearch/src/document";
import Index from "flexsearch/src/index";
```

> NOTE: if you are importing into Svelte you will need to edit the `package.json` of the module and add `"type": "module"` or Svelte will not allow it to be imported

## Using it in Svelte

### Adding the documents

`new Document` will create a `flexsearch` document index that allows you to add your documents to the index. It takes a document descriptor which contains a document object with the index field being the key of the object you want indexed.

```javascript
let findDocument = new Document({
  document: {
    index: ["title", "description", "content"],
  },
});
for (let i = 0; i < data.docs.length; i++) {
  findDocument.add(docs[i]);
}
```

### Search functions

To search the document index use the index you created, in this case, `findDocument`. Use the `.search` function and pass your search query to the function. This will return an object with the keys being the same as the index field of the `document` you passed upon initiation. The keys will contain arrays of the ids of the documents that match the search query. Here I am flattening the object into an array of IDs and then filtering them using svelte in the `{#each }` loop only if there is a search query.

```javascript
let search = "";
let results = [];
function findDocuments() {
  results = findDocument
    .search(search)
    .map((e) => e.result)
    .flat();
}
```

### Svelte elements

```javascript
<input
 type="search"
 id="search"
 placeholder="Search"
 bind:value={search}
 on:keydown={findDocuments}
/>

// Filter the documents if the search term is not blank
{#each docs as doc}
 {#if search == '' || results.indexOf(doc.id) != -1}
  // Search Results
 {/if}
{/each}
```
