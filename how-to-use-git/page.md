# How to use Git
Git is a popular version control system that allows developers to keep track of changes in their codebase and collaborate with others. Here is a step-by-step tutorial on how to use Git.

### Install Git
The first step in using Git is to install it on your computer. Git is available for Windows, Mac, and Linux operating systems. You can download the installer from the official Git website [here](https://git-scm.com/downloads "Git SCM").

### Set up Git
After installing Git, you need to set up your name and email address in Git's configuration file. This information is used to identify who made each change to the codebase.

To set up your name and email address, open a command prompt or terminal window and enter the following commands:

```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

Replace "Your Name" and "youremail@example.com" with your actual name and email address.

### Create a Git repository
A Git repository is a directory that contains all the files and folders for your project. To create a Git repository, navigate to the directory where you want to store your project and enter the following command:

```bash
git init
```

This will initialize a new Git repository in the current directory.

### Add files to the repository
Once you have a Git repository set up, you can start adding files to it. To add a file to the repository, use the following command:

```bash
git add filename
```

Replace "filename" with the name of the file you want to add. You can also use the following command to add all the files in the current directory and its subdirectories:

```bash
git add .
```

### Commit changes
After adding files to the repository, you need to commit the changes. A commit is a snapshot of the code at a particular point in time, along with a message that describes the changes you made.

To commit changes, use the following command:

```bash
git commit -m "Commit message"
```

Replace "Commit message" with a brief description of the changes you made.

Step 6: Check the status of the repository
To check the status of the repository, use the following command:

```bash
git status
```

This will show you which files have been modified, which files have been staged for the next commit, and which files are not being tracked by Git.

### Push changes to a remote repository
If you are collaborating with others on a project, you may need to push your changes to a remote repository, such as GitHub or Bitbucket.

To push changes to a remote repository, use the following command:

```bash
git push remote branch
```

Replace "remote" with the name of the remote repository, and "branch" with the name of the branch you want to push changes to.

### Pull changes from a remote repository
If someone else has made changes to the codebase, you may need to pull their changes into your local repository.

To pull changes from a remote repository, use the following command:

```bash
git pull remote branch
```

Replace "remote" with the name of the remote repository, and "branch" with the name of the branch you want to pull changes from.

### Branching and Merging
If you want to experiment with a new feature, you can create a new branch in your Git repository. A branch is a copy of the codebase that you can modify without affecting the original code. Once you are done with the changes, you can merge the branch back into the main codebase.

To create a new branch, use the following command:

```bash
git branch new_branch
```

Replace "new_branch" with the name of the new branch.

To switch to the new branch, use the following command:

```bash
git checkout new_branch
```

Once you have made changes in the new branch and want to merge it back to the main branch, switch to the main branch and use the following command:

```bash
git merge new_branch
```

### Review the commit history
You can review the commit history of a Git repository using the following command:

```bash
git log
```

This will show you a list of all the commits that have been made to the repository, along with their commit messages and other information.

### Undo changes
If you make a mistake or need to undo changes, you can use the following commands:

To discard changes that have not been staged for the next commit, use:

```bash
git checkout -- filename
```

To undo changes that have been staged for the next commit, use:

```bash
git reset filename
```

To undo a commit, use:

```bash
git reset HEAD^
```

Git is a powerful tool that can help you keep track of changes in your codebase and collaborate with others. This tutorial has covered the basics of using Git, including creating a repository, adding files, committing changes, pushing and pulling changes, branching and merging, reviewing the commit history, and undoing changes. With practice, you can become proficient in using Git and take advantage of its many features.