# PocketBase list all records in a collection
When using the getList() method to fetch queries from your collection, you can run into issues where as your database grows, you are no longer collecting all the records. To fix this you can use the getFullList method.

### getFullList 
`getFullList` is a method of the `collection` used to fetch the entire contents of a collection. It returns when all the records are fetched. It takes two arguments, the first is the batch size and the second one is the sort/filter object. The batch size is the number of records to fetch at a time. Regardless of the batch size, all the records will be fetched, but the batch size does affect how long the function takes to return all of the records. If your records contain a lot of data in each one, I would recommend setting the batch size lower so as to not error out each request, but if your records are fairly small, it is best to set the batch size higher. Below is an example of using the `getFullList` method to fetch records out of a collection name `posts`.
```
const results = await pb.collection('posts').getFullList(200, {
			filter: `author = "${user.id}"`
		});
```
The output will be different from the `.getList` method, which returns an object with the records being stored in `.items`. Instead, it will return an array with all of your records.