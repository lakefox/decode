# Why using eval in JS can be dangerous

It can cause malicious code to be executed with the same permissions as the webpage or extension, as well as it is slower than other alternatives due to the additional steps required for invoking the JavaScript interpreter. Minifiers also struggle with code transitively dependent on eval(), and how this can cause issues for variables.

Using eval() in JavaScript can be dangerous for a few reasons, and should be used with caution. Firstly, it can execute the code it is passed with the privileges of the caller, meaning that if malicious code is passed to eval(), it can run on the user's machine with the same permissions as the webpage or extension.

This can lead to possible attacks that can read or change local variables, allowing third-party code to access the scope in which eval() was invoked. Additionally, eval() is slower than other alternatives due to the additional steps required to invoke the JavaScript interpreter, as modern JavaScript interpreters convert JavaScript to machine code, meaning that variable names are lost.

This means that the browser must do long, expensive variable name lookups to figure out where a variable exists in the machine code and set its value. Ultimately, minifiers are unable to minify code transitively dependent on eval() as eval() would not be able to read the correct variable at runtime. Because of this, it is important to use eval() cautiously and only when absolutely necessary.
