# TF-IDF Visualizer

TF-IDF stands for Term Frequency - Inverse Document Frequency, the formula we will be going over in this document is used to measure the importance of a word in a sentence. This is heavily used in machine learning and data mining to identify stopwords and select sentence that can be used to form a summary.

Below are three documents (Lorem ipsum) and a target word selector, the target word is the word you want to calculate the TF-IDF for. Further down, we will go over how to calculate the weights and what they mean.

<article>

@[target:text]{est} Target Word

#{column}
@[#ta:textarea]{Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.} Document 1
===
@[#ta:textarea]{Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.} Document 2
===
@[#ta:textarea]{Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?} Document 3

</article>

> [ta1M]{[...@{ta}[0].matchAll(@{target})].length};
> [ta1T]{@{ta}[0].split(" ").length};
> [tf1]{@{ta1M}/@{ta1T}};

> [ta2M]{[...@{ta}[1].matchAll(@{target})].length};
> [ta2T]{@{ta}[1].split(" ").length};
> [tf2]{@{ta2M}/@{ta2T}};

> [ta3M]{[...@{ta}[2].matchAll(@{target})].length};
> [ta3T]{@{ta}[2].split(" ").length};
> [tf3]{@{ta3M}/@{ta3T}};

### Term Frequency

Term Frequency or how often the target word appears in a document compared to the total words within a document. Shows us how important the target is in the document. In the example above, the `TF` for the word "@{target}" in document one is @{tf1}, this is because "@{target}" appears @{ta1M} times and there are @{ta1T} words total. Below is the term frequencies calculated for all three documents, feel free to change the contents of the documents and the target word and see how they change.

```text
Document 1:
	"@{target}" appears @{ta1M} time(s)
	Total Words: @{ta1T}
	TF: (@{ta1M}/@{ta1T}) = @{tf1}
Document 2:
	"@{target}" appears @{ta2M} time(s)
	Total Words: @{ta2T}
	TF: (@{ta2M}/@{ta2T}) = @{tf2}
Document 3:
	"@{target}" appears @{ta3M} time(s)
	Total Words: @{ta3T}
	TF: (@{ta3M}/@{ta3T}) = @{tf3}
```

### Inverse Document Frequency

Inverse document frequency is a single calculation for all documents, as it calculates how important the target word is for all the documents. In this example, we have 3 documents and "@{target}" appears in >{Math.ceil(@{tf1})+Math.ceil(@{tf2})+Math.ceil(@{tf3})} of them. The formula for the IDF is `Math.log10(NumberOfDocuments/DocumentsTargetAppearsIn)`. Below is the IDK for the above documents.

> [idf]{Math.log10(3/(Math.ceil(@{tf1})+Math.ceil(@{tf2})+Math.ceil(@{tf3})))};

```text
IDF: @{idf}
```

### TF-IDF Weight Calculation

TF-IDF is calculated by multiplying the term frequency by the inverse document frequency. Below is the TF-IDF calculated for Each document:

> [tfidf1]{@{tf1} _ @{idf}};
> [tfidf2]{@{tf2} _ @{idf}};
> [tfidf3]{@{tf3} \* @{idf}};

```text
TF-IDF weight for Document 1
@{tfidf1}

TF-IDF weight for Document 2
@{tfidf2}

TF-IDF weight for Document 3
@{tfidf3}
```

### Using TF-IDF

Below is an example of TF-IDF implemented in javascript, it works by taking the target word as the first argument and the documents as the second. The function then outputs the weights using the algorithm discussed above.

```javascript
function tfidf(target, documents) {
  let tf = documents.map(
    (e) => [...e.matchAll(target)].length / e.split(" ").length
  );
  let idf = Math.log10(documents.length / tf.filter((e) => e > 0).length);
  return tf.map((e) => e * idf);
}

// Usage

const docs = ["@{ta}[0]", "@{ta}[1]", "@{ta}[2]"];

let weights = tfidf("@{target}", docs);

// [@{tfidf1},@{tfidf2},@{tfidf3}]
```

In the next tutorial we will use TF-IDF to perform extractive text summarization.
