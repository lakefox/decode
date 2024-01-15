# Svelte Import Non-Svelte Scripts
Importing non-Svelte libraries into a Svelte project can be confusing. Here's a guide on how to import both NPM and non-NPM JavaScript modules into your Svelte project.

Svelte uses ES6 modules for importing all modules, if the package you are trying to use does not have an ES6 version of it you will not be able to use the library. Luckily most packages have a workaround that is custom to the specific package Here's how to import the modules into svelte:

### Pure ES6 Module
Here's the basic importing of an ES6 NPM package.
```
import { function } from "package"
```

### Non ES6 with a Seperate ES6 File
If the package you are using has an ES6 file in it, use `/package` in place of `/node_modules/package` to select which file you want to import.
```
import { function } from "package/dist/es6"
```

### Using the Head 
If you are unable to import the module another way to use it is to load the script using the `head` element like below:
```
<svelte:head>
	<script src="path_to_file"></script>
</svelte:head>
```

This will allow you to interact with the package just as if you loaded it from the `app.html` file. If you choose this method you will be unable to server-side render anything that requires the package. To separate the code and prevent it from running before loaded you can use the `onMount` function like below:
```
import { onMount } from 'svelte';
	
onMount(() => {
	console.log("Document Loaded")
});
```