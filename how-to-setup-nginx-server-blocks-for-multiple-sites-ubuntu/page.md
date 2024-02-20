# How to setup Nginx server blocks for multiple sites - Ubuntu

Setting up nginx server blocks is a process that allows you to host multiple websites on a single server. It is a useful technique for those who want to host multiple websites or applications on a single machine, as it allows you to use a single IP address and port to host multiple domains. In this article, we will explain how to set up nginx server blocks on a Ubuntu server.

![Nginx Logo](./nginx_default_featured_2020_IpfrM28b8W.png)

## Prerequisites

- [Install Nginx for Ubuntu](/installing-nginx-on-ubuntu)

## Step 1

Allow Nginx to pass through your firewall.

```sh
sudo ufw allow 'Nginx HTTP'
```

### Replace

Replace with your domain name to auto generate the correct commands for your system.

<input type="url" value="decode.sh" name="domain">

## Step 2

Create a directory for your site and configuration files.

```text
sudo mkdir -p /var/www/@{domain}/html
```

Set the ownership of the directory to the `$USER` environment variable.

```text
sudo chown -R $USER:$USER /var/www/@{domain}/html
```

This allows you to read, write, and execute the files and lets other users read and execute files.

```text
sudo chmod -R 755 /var/www/@{domain}
```

Make a sample page in the directory you just created.

```text
sudo nano /var/www/@{domain}/html/index.html
```

Add this sample HTML file

```html
<html>
  <head>
    <title>Welcome to @{domain}!!</title>
  </head>
  <body>
    <h1>Success! The example.com server block is working!</h1>
  </body>
</html>
```

## Step 3

### Creating the server block

```text
sudo nano /etc/nginx/sites-available/@{domain}
```

Add this to the created file. Change the `www` to any sub-domain you want.

#### Port:

Replace with the correct port you want to be set.

<input type="number" value="3000" name="port">

```nginx
server {
        listen 80;
        listen [::]:80;

        root /var/www/@{domain}/html;
        index index.html index.htm index.nginx-debian.html;

        server_name @{domain};

		location / {
    	    proxy_pass http://localhost:@{port};
   		   	proxy_http_version 1.1;
        		proxy_set_header Upgrade $http_upgrade;
        		proxy_set_header Connection 'upgrade';
        		proxy_set_header Host $host;
        		proxy_cache_bypass $http_upgrade;
    	}
}
```

Once added save the file and then we need to link the configuration file to the `sites-enabled` directory

```sh
sudo ln -s /etc/nginx/sites-available/@{domain}/etc/nginx/sites-enabled/
```

This will keep both configuration files in sync between `sites-available` and `sites-enabled`

Next to prevent a possible hash bucket memory problem, open `/etc/nginx/nginx.conf`.

```sh
sudo nano /etc/nginx/nginx.conf
```

un-comment the line below in the `http` block

```sh
server_names_hash_bucket_size 64;
```

## Step 4

Now everything should be set up, you can run the command to make sure all the formatting is done properly.

```sh
sudo nginx -t
```

If no warning show up you are good to restart the server.

```sh
sudo systemctl restart nginx
```

### Setting up multiple sites

To configure more than one domain on the same server just repeat steps 2-4.

#### Next learn how to set up Node.JS for production.

[Setting up Node.JS for Production](/setting-up-node-js-for-production)

<script src="/plugins/mdxt.js"></script>
