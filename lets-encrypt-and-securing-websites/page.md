# LetsEncrypt and Securing Websites

Let's Encrypt is a free alternative to paid SSL Certificate Authorities. Learn what they do and how to get started.

## What's a Certificate Authority?

A certificate Authority also commonly called a "CA", is an organization that acts as a third party between your website and the user's browser to manage the website's encryption. The role of managing the website's encryption is done via issuing SSL/TLS certificates. The certificates need a third party to sign them, this should be a trusted source, if you have seen other sites offer signed certificates this is what they are selling. Let's Encrypt does this same thing for free but its scope is more limited.

## Let's Encrypt vs Paid SSL

Paid SSL and Let's Encrypt certificates vary a bit, mainly in the authentication. Other paid SSL certificates can verify the owner of the website is actually who they are claiming got be by using manual verification processes. Let's Encrypt's process is completely automated and only provides domain ownership verification. Domain ownership verification just proves that the server that sent the information owns the domain you are trying to connect to.

## SSL/TLS Certificates and SEO

SSL/TLS certificates do increase SEO performance, but only slightly. Google does consider HTTPS encryption as a signal when ranking pages. This will not do a ton for you however it is worth it as setting up Let's Encrypt is a very easy way to boost your site.

## Setting up Let's Encrypt

This tutorial will cover how to secure your site using the CLI tool on Ubuntu. Let's Encrypt has a very simple tool called `certbot` which is a python script that walks you through the entire process and automatically renews the certificate for you.

### Step 1

Install `certbot`

```bash
sudo apt install certbot python3-certbot-nginx
```

### Step 2

Run the following command to register your cert, make sure to replace `domain.sh` with your domain. If you have any subdomains include them in this command by adding another `-d www.domain.sh` argument.

```bash
sudo certbot --nginx -d domain.sh
```
