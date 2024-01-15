# Installing Node.js on DigitalOcean using NVM (Node Version Manager)
Node.js is a popular, open-source JavaScript runtime environment that is used for building scalable, high-performance applications. In this tutorial, you'll learn how to install Node.js on a DigitalOcean droplet using NVM (Node Version Manager), a popular tool for managing multiple Node.js versions on a single machine.

Before you begin, you'll need to have the following:

* A DigitalOcean account and a droplet with a fresh installation of Ubuntu.
* Access to a terminal on your droplet, either through the DigitalOcean control panel or by using an SSH client.

### Installing Node.JS

To install NVM on your droplet, you'll need to run a series of commands in your terminal. Start by logging into your droplet using the terminal or an SSH client.

Download `NVM` via curl and install it.
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
After the installation is complete, you'll need to run the following command to load the NVM environment variables into your shell:

```
export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
Restart your terminal
```
source ~/.bash_profile
```
Install Node.js's latest `lts` version
```
nvm install --lts
```

To install a specific version of Node.js, use the following command:
```
nvm install <version>
```
> Replace `<version>` with the version number of Node.js that you want to install.

Once you have installed a specific version of Node.js, you can switch to that version by running the following command:
```
nvm use <version>
```
> Again replace `<version>` with the version number of Node.js that you want to install.

By using NVM, you can easily manage multiple versions of Node.js on a single machine, making it easier to switch between different versions as needed. With Node.js installed, you are ready to start building your next great application!