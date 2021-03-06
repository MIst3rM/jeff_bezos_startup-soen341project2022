# Setup the project

## To run the setup script from anywhere

## **For UNIX based systems: Linux, macOS**

- **Step 1:** open a terminal and run (will only work for unix based systems: linux, macOS)
```bash
$ open .bashrc
```
### **If you don't have a .bashrc file in your home directory create it**
```bash
$ cd ~ 
$ touch .bashrc
```
    
- **Step 2:** paste the function below (**make sure to replace the path of the project**)
```bash
function setup {
    cd /PATH/TO/THE/PROJECT/app && bash setup $*
    cd -
}
```

- **Step 3:** save the .bashrc file and restart the shell to apply changes
```bash
$ source ~/.bashrc
```

## **For Windows (follow linux instructions if git bash is installed)**

- **Step 1:** Open a PowerShell Terminal and run 
```powershell
PS C:\> New-Item -Path $profile -ItemType File -Force
```

**You should now have a new Microsoft.PowerShell_profile.ps1 file inside \Documents\WindowsPowerShell directory**

- **Step 2:** Open the *_profile.ps1 file and paste the following code in it (**make sure to replace the path of the project**)

```ps1
function setup{
	pushd C:\PATH\TO\PROJECT\app; bash setup $args
	popd
}
```

- **Step 3:** Save the *_profile.ps1 file and restart the shell to apply changes
```powershell
PS C:\> . ~\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```
**Attention: the dot before the path is not a typo and is required for dot sourcing the profile**

## Configure /etc/hosts

Run
<br/>
- On macOS/Linux
```bash
$ sudo echo "127.0.0.1 backend.store.conco store.conco admin.store.conco phpmyadmin.conco" >> /etc/hosts
```

  - On Windows (**From an elevated PowerShell Terminal**)
```powershell
PS C:\> Add-Content C:\Windows\System32\drivers\etc\hosts "127.0.0.1 backend.store.conco store.conco admin.store.conco phpmyadmin.conco"
```

## To initialize the project for the first time
Run
```bash
$ setup init
```

## Troubleshooting errors
### Error
```bash
standard_init_linux.go:190: exec user process caused "no such file or directory"
```
**This is due to Windows using CRLF end of line sequences while Linux uses LF**
### Solution<br/>
1. Go to the init file ![init](./resources/img/init_file_loc.png)

2. Once the file open, go to the bottom right corner of vscode and click on CRLF ![CRLF](./resources/img/crlf.png)

3. This menu opens at the top of the page. **Select LF** and save the file ![LF](./resources/img/lf.png)

4. Rerun the initialization
- ```powershell
  PS C:\> setup init
  ```






