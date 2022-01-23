# Setup the project

## To run the setup script from anywhere

### **For UNIX based systems: Linux, macOS**

- **Step 1:** open a terminal and run (will only work for unix based systems: linux, macOS)
```
$ open .bashrc
```
    
- **Step 2:** paste the function below (**make sure to replace the path of the project**)
```
function setup {
    cd /PATH/TO/THE/PROJECT && bash setup $*
    cd -
}
```

- **Step 3:** save the .bashrc file and restart the shell to apply changes
```
$ source ~/.bashrc
```

## For initial setup
Run
```
$ setup init
```


