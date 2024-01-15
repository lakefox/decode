# Setting Up GitHub Pages
GitHub Pages is a free service offered by GitHub that allows you to create a website or blog for your project, personal brand, or business. By default, GitHub Pages provides a subdomain for your site, such as username.github.io. However, you can also use a custom domain name for your site, which can help you establish your brand and make your site more memorable.

In this tutorial, we will guide you through the steps to set up GitHub Pages with a custom domain.

### Prerequisites
Before you begin, you will need the following:

* A GitHub account
* A GitHub repository with your website files
* A custom domain name that you own

### Create a CNAME file
The first step is to create a CNAME file in the root of your repository. This file tells GitHub Pages which domain name to use for your site. To create the CNAME file, follow these steps:

* In your local repository, create a new file named `CNAME` (all uppercase).
* Open the file in a text editor.
* Add your custom domain name on a new line, without any prefixes like "http://" or "www". Then save the file.

For example, if your custom domain is "example.com", the contents of the file should be:

```
example.com
```

### Configure DNS settings
The next step is to configure the DNS settings for your custom domain name. You will need to add two DNS records: one for the root domain (e.g., example.com) and one for the www subdomain (e.g., www.example.com).

Here's how to do it:

* Log in to your domain registrar's website and navigate to the DNS settings for your domain.
* Create a new A record with your root domain (e.g., example.com) as the host and the IP address 185.199.108.153.
* Create three more A records with your root domain as the host and the following IP addresses:

```
185.199.109.153
185.199.110.153
185.199.111.153
```

These four IP addresses belong to GitHub's servers, and they are used to host your website files.

> Note: The DNS changes may take some time to propagate, so it may take a few hours for your custom domain to start working with GitHub Pages.

### Update GitHub Pages settings
The final step is to update the GitHub Pages settings for your repository to use your custom domain name.

Here's how to do it:

* In your GitHub repository, click on "Settings" at the top.
* Scroll down to the "GitHub Pages" section.
* Under "Custom domain", enter your custom domain name (e.g., example.com).
* Click "Save".
After a few minutes, your website should be accessible using your custom domain name.

### Conclusion
Congratulations! You have successfully set up GitHub Pages with a custom domain. With this setup, you can create a professional-looking website or blog that reflects your brand or business.