# Redirecting Users to the Correct Page After a 404 Error
Properly addressing 404 errors is crucial in preventing the loss of traffic to your website. In this tutorial learn how to rectify this error and redirect users to the right page.

In this tutorial, we won't be discussing how to create a 404 page as it's a relatively simple process and can be personalized to your liking. Instead, I'll be addressing a common issue - when a user enters a wrong URL, how can we redirect them to their intended destination? This is crucial in terms of both user experience and overall usability. As a website owner, I want to ensure that my users can access my content with ease, and I'll share some effective methods to achieve this.

First off you will need a list of every accessible URL on your site, this can be an RSS feed or a `sitemap.xml` for this site. I will be using a [RSS feed](/rss) for this example but it doesn't matter what it is. We will take the feed and use RegExp to parse the URLs from the text like below.

```javascript
let urls = rss_feed.match(
                /\b((https?|ftp|file):\/\/|(www|ftp)\.)[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/gi
            );
```

This gives us a raw list of URLs with newline characters and other unwanted characters. To clean it up we can map over the array converting the string into a `URL` object the returning the pathname. After we have cleaned the URL pathnames we will want to remove any duplicates. We can do this using a `Set` and then converting the Set into an array again with the spread operator.

```javascript
let urls = [
    ...new Set(
        txt
            .match(
                /\b((https?|ftp|file):\/\/|(www|ftp)\.)[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/gi
            )
            .map((e) => new URL(e.trim()).pathname)
    )
];
```

Once we have an array of pathnames, the problem of finding the site the user wanted to go to becomes a searching problem. For the rest of this tutorial, we will focus on finding the URL that the user indented to go to. 

### Finding the best match

Finding the "best" match is a difficult problem as the best match can change depending on what you are looking to find. You could say the best match is the closest match using [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance). This algorithm calculates how similar words are to each other, but if you were to try this it wouldn't give you the results you want. Levenshtein distance is calculated by comparing the letters and the positions of the letters between the different strings.

This does not work well when trying to find which string is most like the inputted string. Instead what I did was build an algorithm that compares all possible combinations of a string to the base string and counts the number of matching strings as the "score". Here is an example of the scoring algorithm:

```javascript
function getScore(target, item) {
    let matchingParts = 0;
    for (let a = 0; a < target.length; a++) {
        for (let b = a; b < target.length; b++) {
            if (item.indexOf(target.slice(a, b)) != -1) {
                matchingParts++;
            }
        }
    }
    return matchingParts;
}
```

After we have a scoring algorithm made we can take the URLs and sort them by how well they match to the target URL.

```javascript
let sorted = urls.sort((a, b) => {
	return getScore(b) - getScore(a);
});
```

This gives us a list of sorted URLs with the most like URL first. Now you will want to take this list and display the most like URLs to the user so they can find the correct page. To do this you could slice a set amount off the front of the array and call it a day but in my opinion, that is a sloppy way to do it. 

If there is one URL that scores way higher than the rest I would just want to show that one or if there are a couple that equally could be the target URL I want to show all of the options. I found this to be one of the most interesting problems with creating this. To better show this problem here are some outputs from this site's URL list with the scores shown. This will help you better understand what we are trying to do.

The miss-typed URL is `https://decode.sh/installing`, these are the suggested URLs that the `sorted` variable contains.
```javascript
['/installing-nginx-on-ubuntu', '/installing-node-js-on-digital-ocean-using-nvm-node-version-manager', '/installing-deno-js', '/install-tailwind-css-svelte', '/install-pico-css-with-svelte',...]
```

To pick out the URLs that we want, we need to rerun the scoring function on the sorted URLs like this:

```javascript
let scores = sorted.map((e) => getScore(e));
```
Here's the output of the `scores` variable:

```javascript
[66, 66, 66, 50, 50,...]
```

> To simplify the results I only included the first five results of the arrays but it will contain all of the URLs in the actual code.

Looking at the scores we can see that they drop to 50 after the first three and if we look at the corresponding item in the `sorted` array we can see they stop containing the word `installing` which is the target word. So ideally we would only want to take the first three from the array and return those to the user. To do this I found the simplest way is to take the average of all the scores using an averaging function and remove items until the average score drops. This will let us select the items that have the largest effect on the average score, these are the most important URLs. Here we are defining our averaging function and calculating the average of the `scores` array.

```javascript
function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
}
let avg = average(scores);
```

In the example above, including all scores, the average ends up being `23.03`. Then if we loop through the scores remove one from the front each time and recalculating the average. The average score drops each time; when the recalculated average is one less than the initial average score, break the loop and slice the array from 0 to that point. The code version of this looks like this:

```javascript
let slicePoint = 0;

for (let i = 0; i < scores.length; i++) {
    if (avg - average(scores.slice(i)) > 1) {
        slicePoint = i;
        break;
    }
}

return sorted.slice(0, slicePoint);
```

The returned value is an array that contains the "best" matches to the given query that you can display to the user. The final function that does each of these steps is below. It takes two arguments, the first one being the mistyped URL and the second is the list of URL pathnames from the RegExp function.

```javascript
function findBestMatches(target, list) {
    let sorted = list.sort((a, b) => {
        return getScore(b) - getScore(a);
    });

    let scores = sorted.map((e) => getScore(e));
    let avg = average(scores);
    let slicePoint = 0;

    for (let i = 0; i < scores.length; i++) {
        if (avg - average(scores.slice(i)) > 1) {
            slicePoint = i;
            break;
        }
    }

    return sorted.slice(0, slicePoint);

    function getScore(item) {
        let matchingParts = 0;
        for (let a = 0; a < target.length; a++) {
            for (let b = a; b < target.length; b++) {
                if (item.indexOf(target.slice(a, b)) != -1) {
                    matchingParts++;
                }
            }
        }
        return matchingParts;
    }
    function average(array) {
        return array.reduce((a, b) => a + b) / array.length;
    }
}
```

If you want to see this working, it is implemented on this site. Just miss-type a URL and see what shows up! If you have any questions add them to the comments below, if you want a reply check the `Notify` button and add your email.