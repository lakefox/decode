# Mapping Wildcard Paths - Express Endpoints
Learn how to map wildcard paths to system paths for Svelte like endpoints in Express.

This is a continuation of a series on how to build a routing system like Svelte with Express JS.

### Previous Tutorials
* [Node JS Read File Directory](https://decode.sh/node-js-read-file-directory)

The previous tutorial gives you a function that is able to pull all of the file paths from a directory and put them into an array. In this tutorial, we will map the file routes to endpoints that we can call and return with express.

##### The End Goal
The end goal is to take paths from the file system like below and extract any variables and return the full URL and variables in an object. The variables will be defined by putting the variable name inside of square brackets and the endpoint function will be a file in the last folder named `+server.js`.
```
[
	'./src/accounts/create',
	'./src/accounts/delete',
	'./src/assets/[collection][name]',
	'./src/templates/[name]'
]
```

##### Code
Here is the function I used to take the file paths and collapse them into paths that can be matched by our routing function in the next tutorial. I've added comments explaining how it works line by line.
```
// paths are the file paths from the getFiles() function in the last tutorial
function collapsePaths(paths) {
	// We will store the Objects that contain the URL and Params here
    let collapsed = [];
	// Loop through the paths
    for (let i = 0; i < paths.length; i++) {
        const path = paths[I];
		// Use RegExp to get all the [variables] from the path
		// vals will only contain the variable names not the square brackets
        let vals = path.match(/([^[]+(?=]))/g);
		// If you have the directories setup correctly each path should end in 
		// "+server.js" here we will remove that
        let ast = path.replace("+server.js", "").slice(5);
		// Here's where we check if the path has varibles
        if (vals) {
			// If it does we need to replace them with the wildcard indicator "*"
            for (let i = 0; i < vals.length; i++) {
                ast = ast.replace(`[${vals[i]}]`, "*");
            }
        }
		// Add the processed path to the array
        collapsed.push({
            url: ast,
            params: vals
        });
    }
    return collapsed;
}
```

This function will only be run once to get the location and variables of the endpoints on the server for further processing. In the next tutorial, we will take the collapsed paths and feed them into a function the will match them to any incoming request to our server.