# Installing Deno JS

Deno is a JavaScript and TypeScript runtime environment that was created as an alternative to Node.js. It is designed to be simple, secure, and fast, with a focus on making it easier for developers to build scalable and efficient applications.

Deno was created by Ryan Dahl, the same person who created Node.js, and it addresses some of the issues he saw with Node.js. One of the main differences between the two is that Deno does not have a centralized package manager like npm, which can lead to security and compatibility issues. Instead, Deno includes many built-in modules, and developers can use external modules by importing them directly from their source code on the web.

Deno also includes security features that allow it to run scripts in a sandboxed environment, which helps to prevent malicious scripts from accessing sensitive parts of the system. Additionally, Deno supports modern features such as Web Assembly and asynchronous programming out of the box, making it easier to create fast and efficient applications.

Overall, Deno provides a modern and efficient way to build JavaScript and TypeScript applications, with a focus on security and simplicity.

## Installation

### Using Shell (macOS and Linux)

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

### Using PowerShell (Windows)

```sh
irm https://deno.land/install.ps1 | iex
```

### Using Homebrew (macOS)

```sh
brew install deno
```

### Using Nix (macOS and Linux)

- [Install Nix](/nix-package-manager)

```sh
nix-shell -p deno
```

After installing you will get a message simular to this one, prompting you to add manually add Deno to your terminal. Paste the command they provide you then continue.

```sh
######################################################################## 100.0%
Archive:  /Users/name/.deno/bin/deno.zip
  inflating: /Users/name/.deno/bin/deno
Deno was installed successfully to /Users/name/.deno/bin/deno
Manually add the directory to your $HOME/.zshrc (or similar)
  export DENO_INSTALL="/Users/name/.deno"
  export PATH="$DENO_INSTALL/bin:$PATH"
Run '/Users/name/.deno/bin/deno --help' to get started

Stuck? Join our Discord https://discord.gg/deno
```

To test that Deno was installed correctly, run the following command:

```sh
deno --version
```

## Updating

Deno comes with a built-in version manager, to update to the latest version use the following command:

```sh
deno upgrade
```
