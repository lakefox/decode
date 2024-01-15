# Node JS Read File Directory
Reading a directory in Node JS can be useful for many reasons, here's a quick way to get all the file paths in an array.

```
function getFiles(dir) {
    return fs.readdirSync(dir).flatMap((item) => {
        const path = `${dir}/${item}`;
        if (fs.statSync(path).isDirectory()) {
            return getFiles(path);
        }

        return path;
    });
}
```
This is a JavaScript function that takes in a single argument, dir, which is a string representing a directory path. The function uses the fs (file system) module to read the contents of the directory specified by dir using fs.readdirSync(dir). The resulting array of items is then passed to the Array.prototype.flatMap() method, which applies a function to each element of the array, and then flattens the resulting arrays into a single array.

The function passed to flatMap checks whether each item in the directory is a directory or a file. If it's a directory, it calls the getFiles function recursively with the path to that directory as an argument, otherwise, it returns the file's path. The result is an array of all the file paths in the directory and all its subdirectories.

## Example
```
const dir = '/Users/johndoe/documents';
const files = getFiles(dir);
console.log(files);
```
##### Output
```
['/Users/johndoe/documents/notes.txt',
'/Users/johndoe/documents/projects/project1/tasks.txt',
'/Users/johndoe/documents/projects/project1/report.pdf',
'/Users/johndoe/documents/projects/project2/proposal.docx',
'/Users/johndoe/documents/photos/vacation/IMG_0123.jpg',
'/Users/johndoe/documents/photos/vacation/IMG_0124.jpg',
'/Users/johndoe/documents/photos/vacation/IMG_0125.jpg']
```