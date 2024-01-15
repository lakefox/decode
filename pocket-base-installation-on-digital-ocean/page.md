# PocketBase Installation on Digital Ocean
PocketBase is a fast growing beginner friendly database built in GO.

### Installation
PocketBase is a single file database that includes an admin GUI and is ready out of the box. Simply use curl to download it to your server.
```
curl https://github.com/pocketbase/pocketbase/releases/download/v0.12.2/pocketbase_0.12.2_linux_amd64.zip
```

### Configuration
PocketBase supports flags for changing the host and the port to run PocketBase use this command, adding the flags is optional.
```
./pocketbase serve —http=127.0.0.1 —port=8080
```
Optionally you can add this command to a shell script if you are using a service like `PM2`.

### Using a reverse proxy
PocketBase can be used like any server out there, to use NGINX you can follow the guide below to set up NGNIX for you server. Make sure to use the correct port when serving the database.
* [Installing NGNIX on Ubuntu](/installing-nginx-on-ubuntu)
* [How to setup NGNIX server block for multiple sites](/how-to-setup-nginx-server-blocks-for-multiple-sites-ubuntu)