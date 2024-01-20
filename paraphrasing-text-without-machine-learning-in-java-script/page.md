# Paraphrasing Text without Machine Learning in JavaScript

Being able to summarize a article is super useful and surprisingly it doesn't require machine learning to accomplish. Here we will go over the concepts behind frequency analysis and implement it to build a text summerization api.

The type of summarization we will be doing here is called "extractive summarization", extractive summarization relies on selecting the most important sentences in the text and combining them in a way that makes sense. The advantage of using algorithmic summarization over a machine learning approach is speed and cost. Algorithmic summarization trades off quality over speed and accessibility. However, in most cases, the quality of the extracted summarization is high enough not to matter.

## How it works

The steps in extractive text summarization are first to break apart the sentences of the inputted text. This can be done using a regex approach like the one below.

```javascript
function breakSentence(sentences) {
  return sentences
    .replaceAll(/\s+/g, " ")
    .replace(/\[[0-9]+\]/g, "")
    .replace(/(?<!Mr|Mrs|Ms|Dr|Sr)([\.?\??\!?]) ([A-Z])/gi, "$1{break}$2")
    .split("{break}");
}
```

This function, I have found covers most edge cases when splitting text by sentences. The "easy" approach of splitting by periods falls short when you encounter a title like `Mr.` or when the sentence ends in another form of punctuation. The function will identify the end of a sentence by looking for a period, exclamation point, or a question mark that is not after a title and is followed by a space and an alphanumeric character. Some cases that this approach covers without explicitly defining them are titles like `Ph.D` as the period is not followed by a space and a character. Once the breakpoints are identified, they are replaced with the following text `{break}`. This was used as the break point as it would be very uncommon to see in normal text. After the breakpoints are inserted, the remaining text is split by the inserted text.

For the text summarization tool we will be making, we will use the code below to split our sentences and extract non-stopwords from the sentence.

```javascript
let doc = [];
let stoplist = [...] // This will be linked at the end
let paragraphs = text.split("\n").map((e, i) => {
    return {
        sentences: breakSentence(e),
        index: i,
    };
});

//Index sentences in the document
paragraphs.forEach((paragraph, pi) => {
    paragraph.sentences.forEach((sentence, index) => {
        var words = sentence
            .split(" ")
            .filter((n) => stoplist.indexOf(n) == -1);
        doc.push({
            sentence,
            words,
            index,
            paragraph: pi,
        });
    });
});
```

Currently, when breaking the text part, we are first breaking the text into paragraphs. This is not needed at this time (as long as you remove the paragraph spacing) but will be used once I figure out how I want to improve this algorithm. My idea is to identify the important sentences, then add context from the paragraphs they are found in. I have not completed this yet, but I plan to and will remove this once it is complete. If you would like to help feel free to improve it on the gist!

### Stopwords

Stopwords are words that do not add any meaningful context to a sentence, because of this we will need to remove them from each sentence so they do not skew the results. You can get lists of stop words anywhere, wordnet is typically the source for most of them. I get an NPM package for automatically removing stopwords is... [stopword](https://www.npmjs.com/package/stopword "Stopword"). However, we will not be using either instead to make things faster we will use a condensed word list that covers most bases (This will be contained in the GitHub gist link at the bottom).

### Assigning Sentence Frequencies

The rest of the process is calculating how frequently each non-stopword in a sentence shows up when compared to the entire document. To do this we need to loop through each word in each sentence and compare it to each word in every sentence. This has some overhead but is typically a pretty lightweight operation.

```javascript
//Assign word frequencies
doc.forEach((item) => {
  var count = 0;
  item.words.forEach((word) => {
    var match = word;
    doc.forEach((item2) => {
      item2.words.forEach((word2) => {
        if (word2 === match) count++;
      });
    });
  });
  count = count / item.words.length;
  item.frequency = count;
});

doc.sort((a, b) => {
  return b.frequency - a.frequency;
});
```

Once we have the word frequencies we need to sort them from highest to lowest. From here you can slice the amount you want from the front or you can set up the function to give you the best amount of sentences. If you want to have a set amount of sentences, you will need to extract the sentence property from the objects in the array and slice the amount you want.

To extract the "best" amount of sentences, you can use the method I talked about in my [last article](https://decode.sh/redirecting-users-to-the-correct-page-after-a-404-error) just slightly modified.

```javascript
let slicePoint = 0;

let scores = doc.map((e) => e.frequency);

let avg = average(scores);

for (let i = 0; i < scores.length; i++) {
  if (avg - average(scores.slice(i)) > 0.4) {
    slicePoint = i;
    break;
  }
}
doc = doc.slice(1, slicePoint);

return doc;
```

```javascript
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}
```

I go more into how this works in the other article, but the basic principle it operates on is we only want to select the sentences that have the most impact in the article. Selecting a set number of sentences can either miss context or include sentences that could be removed. So we calculate the average "score" in this case from the `frequency` property. Then remove elements from the array one at a time, starting from the highest value until the average of the array is `x` value lower than the original. In this example I ended up using `0.4`, but you can change it to keep more or less if you prefer.

[Here](https://gist.github.com/lakefox/f67e5c34ddbcafde2a4c5f030db55a70) is the gist containing the full code. If you would like to contribute to this please leave any changes in the gist.
