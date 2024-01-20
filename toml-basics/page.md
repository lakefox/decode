# TOML Basics

TOML is a configuration file format that is designed to be easy to read and write for both humans and machines. It stands for "Tom's Obvious, Minimal Language" and was created by Tom Preston-Werner, the co-founder of GitHub. In this tutorial, we will explore how to use TOML.

## Installing TOML

TOML is a simple file format, so you don't need to install any specific software to use it. You can create and edit TOML files using any plain text editor such as Notepad, Sublime Text, or Atom.

## Creating a TOML file

To create a new TOML file, simply create a new text file with the ".toml" extension. For example, if you want to create a configuration file for your application, you can create a file named "config.toml".

## Basic syntax of TOML

The basic syntax of TOML is simple and easy to learn. Here's an example of a TOML file:

```toml
title = "My Awesome Website"
language = "en-US"

[owner]
name = "John Doe"
dob = 1980-01-01T00:00:00Z

[database]
server = "localhost"
port = 3306
user = "username"
password = "password"
database = "my_database"'
```

The above TOML file has three sections, `title`, `owner`, and `database`, and each section contains one or more key-value pairs. The key-value pairs are separated by the equal sign (=) and each key-value pair must be on its own line. The values can be of different types such as strings, numbers, and booleans.

You can also define nested sections in TOML using square brackets ([]). In the above example, the `owner` and `database` sections are nested under the main section.

## Reading a TOML file

To read a TOML file in your application, you can use a TOML parser. There are several TOML parsers available for different programming languages. Here's an example of how to read the above TOML file in Python:

```javascript
import toml

config = toml.load('config.toml')
print(config['title'])
print(config['owner']['name'])
print(config['database']['database'])
```

The above code imports the `toml` module and uses the load function to read the contents of the `config.toml` file. The load function returns a dictionary object that contains all the key-value pairs defined in the TOML file.

## Conclusion

TOML is a simple and intuitive file format for configuration files. Its syntax is easy to learn and it is supported by many programming languages. If you need to store configuration data for your application, TOML is a great choice.
