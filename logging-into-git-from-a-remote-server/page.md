# Logging into Git from a Remote Server
Git remote server setup can be tricky with the updated rules Github has, here we will dive into the basics of logging in while keeping your keys secure.

There are two ways to "login" to Git the first way to to fill out the two commands below:
```
git config --global user.name "your_username"
```
and
```
git config --global user.email "your_email_address@example.com"
```
This method however is outdated if you are trying to log in to a GitHub repository. To login to a GitHub repo will have to install the `gh` tools you can do that by pasting the following command into a terminal connected to the remote server.
```
type -p curl >/dev/null || sudo apt install curl -y
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y
``` 
This comes from the installation guide [here](https://github.com/cli/cli/blob/trunk/docs/install_linux.md "Installation Guide") and works for Linux, if your remote server is not Linux you can follow the guide [here](https://cli.github.com/manual/installation "Alterative Installation Guide").

After the `gh` tools finish installing you will need to run this:
```
gh auth login
```

This will bring up a login wizard, if you are on a remote server it will try to open the link it gives you on the device. you will need to copy and paste this link onto your local machine and type the code that is also provided. Once you log in you are set up to use `git` as normal.