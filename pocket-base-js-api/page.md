# PocketBase JS API

Unlock the full potential of PocketBase's JS SDK with this comprehensive guide covering everything you need to know to avoid confusion.

![pocketbase](./untitled_cVi0LEjGOG.webp)

## Prerequisite

- [PocketBase Installation on Digital Ocean](pocket-base-installation-on-digital-ocean)

## Install

### Browser (manuel)

You can use any NPM CDN to load the SDK or you can download it and host it yourself.

```javascript
<script src="https://unpkg.com/pocketbase/dist/pocketbase.umd.js"</script>
```

#### Import as a Module

```javascript
<script type="module">
  import PocketBase from 'https://unpkg.com/pocketbase/dist/pocketbase.umd.js'
  ...
</script>
```

##### NPM

```sh
npm i pocketbase
```

```javascript
// Using ES modules (default)
import PocketBase from "pocketbase";

// OR if you are using CommonJS modules
const PocketBase = require("pocketbase/cjs");
```

### Usage

Connecting to your PocketBase instance is very straightforward, after importing the module create a `new` PocketBase instance and pass your DataBase URL as the first argument.

```javascript
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
```

#### Collections

Every PocketBase request will start by first defining which collection you want to pull or put information in.

```javascript
const collection = await pb.collection("example");
```

In this example, we are getting the collection `example`. The collection object has methods for searching and authentication.

##### Getting Information

```javascript
const result = await pb.collection("example").getList(1, 20);
```

This will get the first 20 results from the `example` collection. If you want to filter your results the `getList` method allows for a configuration object to be passed.

```javascript
const result = await pb.collection("example").getList(1, 20, {
  filter: 'status = true && created > "2022-08-01 10:00:00"',
});
```

PocketBase uses standard SQL syntax for the filtering.

##### Authentication

PocketBase has built-in methods for account creation and authentication. Once you authenticate a user at the `pb` object level the user will remain authenticated until you deauth them. This is great if you have permissions set for a user, they will not be able to access collections you don't want them in.

Here is an example of logging in a user with their email and password:

```javascript
const userData = await pb
  .collection("users")
  .authWithPassword("test@example.com", "123456");
```

After authentication, the promise will return the user's data so there is no need to make an additional request. If you want to deauth a user call the function below anywhere and it will clear out the authStore:

```javascript
pb.authStore.clear();
```

#### File Uploading

```javascript
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

...

const formData = new FormData();

const fileInput = document.getElementById('fileInput');

// listen to file input changes and add the selected files to the form data
fileInput.addEventListener('change', function () {
    for (let file of fileInput.files) {
        formData.append('documents', file);
    }
});

// set some other regular text field value
formData.append('title', 'Hello world!');

...

// upload and create new record
const createdRecord = await pb.collection('example').create(formData);
```

Here is the code from the documentation on how to upload files. I did not realize this at first but the `fromData` becomes the source for all the data you are uploading so if you were uploading an image and you wanted to give it a title you follow this example and use `.append` with the name of the field in your database and then the value you want to store. Also, another note is the field where you are putting the documents DOES NOT need to be called `documents`. This confused me at first.

Now that you have uploaded the files you will probably want to access them, you can use the following URL format to get them.

```text
http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
```

- COLLECTION_ID_OR_NAME
  - You can get the collection ID from the `.collectionId` field of the image
- RECORD_ID
  - This will be `.id` of the record
- FILENAME
  - This is stored under the object key that has the same name as the file collum in the collection

If you have any questions please put them below and I will answer them, or you can email `contact@low.sh` and I will update this tutorial with any missing information.
