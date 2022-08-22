# Circuit breaker

## Chris Keathley - Building Resilient Systems with Stacking - ElixirConf EU 2019

https://www.youtube.com/watch?v=lg7M0h9eoug&t=1328s

## Martin Fowler

https://martinfowler.com/bliki/CircuitBreaker.html

## How to make a Supervisor never die?

https://elixirforum.com/t/how-to-make-a-supervisor-never-die/22734

### Handling TCP connections in Elixir

https://andrealeopardi.com/posts/handling-tcp-connections-in-elixir/

# Monitoring

## Monitoring Elixir With OpenTelemetry | Kamil Kowalski | ElixirConf EU 2021

https://www.youtube.com/watch?v=4OBtc_eIKIE
https://github.com/humpangle/opentelemetry-demo

Complete Terraform Course - From BEGINNER to PRO! (Learn Infrastructure as Code)
https://www.youtube.com/watch?v=7xngnjfIlK4

Build a FullStack Ecommerce with Nextjs, Strapi, Magic and Stripe
https://www.youtube.com/watch?v=385cpCpGRC0


Strapi | Advanced Customization and Plugin Development
https://www.youtube.com/watch?v=kIZHzbmnhnU



https://www.youtube.com/watch?v=yC6ZfIF-R9k
How To Make a WordPress Website - 2022


aws vpc
https://www.youtube.com/watch?v=TUTqYEZZUdc

AWS VPC | Create New VPC with Subnets, Route Tables, Security Groups, NACL | AWS Beginners Tutorial
https://www.youtube.com/watch?v=gUesnoDzNr4


How to Create a VPC with Public and Private Subnets
https://www.youtube.com/watch?v=2TiBt-y5pAQ




How to Deploy a Kubernetes Cluster from Scratch

https://www.youtube.com/watch?v=AvUPX6cAjzk&t=996s
Elixir Meetup #5 ▶ hosted by Curiosum ▶ Miguel Cobá & Michał Buszkiewicz

The "Brilliant" Kidney
https://www.youtube.com/watch?v=TMXsUYBXaZw

Universo Amador
PresidentLee

https://www.poeticoding.com/create-a-high-availability-kubernetes-cluster-on-aws-with-kops/
https://www.poeticoding.com/connecting-elixir-nodes-with-libcluster-locally-and-on-kubernetes/

https://javascript.info/arraybuffer-binary-arrays
https://www.youtube.com/watch?v=-CT28e2Dl24
https://www.youtube.com/watch?v=PsorlkAF83s
https://www.youtube.com/watch?v=dam0GPOAvVI

Going low level with TCP sockets and :gen_tcp - Orestis Markou - ElixirConf EU 2018

Amazon S3 Access Control - IAM Policies, Bucket Policies and ACLs
https://www.youtube.com/watch?v=xFzJw6wJ8eY


[Share Environment Vars between WSL and Windows](https://devblogs.microsoft.com/commandline/share-environment-vars-between-wsl-and-windows/)

[Integrate Linux Commands into Windows with PowerShell and the Windows Subsystem for Linux]
(https://devblogs.microsoft.com/commandline/integrate-linux-commands-into-windows-with-powershell-and-the-windows-subsystem-for-linux/)



WT_SESSION::WT_PROFILE_ID


# Package manager

`PowerShell Gallery` is like `apt` on `debian` machines

https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.1

# Comment

```ps
# this is a line comment

<#
multiline comment
#>
```

# multiline expression

use `space + backtick`

```ps
$env:Path = `
  [System.Environment]::GetEnvironmentVariable("Path","Machine") + `
  ";" + `
  [System.Environment]::GetEnvironmentVariable("Path","User")
```

# Powershell versions

1. powershell corel

   `C:\Program Files\PowerShell\7\pwsh.exe`

2. powershell desktop

   `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`

## Get powershell version

```ps
$PSVersionTable.PSVersion
```

# Examples

[PowerShell Master Class - Connecting Commands Together](https://www.youtube.com/watch?v=K_LsLq5yGgk)

`Get-ChildItem` = ls files

`Get-Member` == gm = console.dir

`Select-Object` == Select

`$_` = iterator member

```ps
Get-ChildItem | Select-Object Name
Get-ChildItem | Select-Object -First 1 | Select-Object Name
Get-ChildItem | Select-Object -Index 1 | Get-Member
(Get-ChildItem | Select -Index 0).Name
Get-Children | Format-Table

dir | sort-object -Descending

get-module -listavailable
get-module -listavailable -SkipEditionCheck

write-out "hello world"
write-out "hello world";

get-process
get-process *a
get-process -name notepad
```

# Execution policy

https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-executionpolicy?view=powershell-7.1

https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.1

```ps
Set-ExecutionPolicy -ExecutionPolicy <PolicyName> [-Scope ScopeName]

# no scope specified = LocalMachine
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## PolicyName:

1. `Bypass`

   all scripts are allowed to run without being signed

2. `Undefined`

   no execution policy for `current scope`

   If `Undefined` for all scopes, then following defaults will be used:

   - `Restricted` on windows client
   - `RemoteSigned` on server

   If not `Undefined` in at least one scope, that becomes the effective policy.

3. `Restricted`

   default on windows/individual commands allowed but not scripts

4. `RemoteSigned`

   scripts downloaded from the internet must be signed

5. `AllSigned`

   all scripts must be signed by trusted authorities

## ScopeName (from lowest to highest priority):

1. `LocalMachine`

   affects all users on this computer

   registry key = `HKEY_LOCAL_MACHINE`

2. `CurrentUser`

   registry key = `HKEY_CURRENT_USER`

3. `Process`

   affects current PowerShell session.

   stored in $env:PSExecutionPolicyPreference and not registry

4. `UserPolicy`

5. `MachinePolicy`

## Get execution policy

### get all of the execution policies that affect the current session

Ones on top take precedence over bottom

```ps
Get-ExecutionPolicy -List
```

Output:

```
Scope ExecutionPolicy
----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser    RemoteSigned
 LocalMachine       AllSigned
```

`RemoteSigned` is the effective policy because `CurrentUser` > `LocalMachine`

### get the effective execution policy

```ps
Get-ExecutionPolicy
```

In the above [`Get-ExecutionPolicy -List`] command, the output of

`Get-ExecutionPolicy` will be `RemoteSigned`

# Posh git

1. Changes your prompt to reflect git branch

2. Provides git auto completion

[Ensure to install git](https://git-scm.com/downloads)

[install posh git](https://git-scm.com/book/en/v2/Appendix-A%3A-Git-in-Other-Environments-Git-in-PowerShell)

## posh git not in path?

https://github.com/dahlbyk/posh-git/issues/840#issuecomment-818850843

https://github.com/dahlbyk/posh-git/issues/754#issuecomment-607517665

```ps
Import-Module posh-git -verbose
```

# Refresh $envs

```ps
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + `
  ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

# `.bashrc`

```ps
echo $profile
```

prints:

```
C:\Users\<user-name>\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```

# Aliases

`Get-Alias` = alias

```ps
New-Alias -Name "ll" Get-ChildItem
```

# Approved Verbs for PowerShell Commands

https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7.1

## Synonyms

1.

`New` = create resource

`Set` = modify or create

2.

`Find` = look for

`Search` = create ref to obj

3.

`Get` = get info on resource / get obj so you can refer to it in future

`Read` = open a resource such as file

4.

`Invoke` = perform synchronous operations

`Start` = begin asynchronous operations

## Common Verbs

```
Add
Clear
Close
```

# function

```ps
function Test-MrParameter {

    param (
        $ComputerName
    )

    Write-Output $ComputerName

}

Test-MrParameter "some-arg"

# named arg
Test-MrParameter -ComputerName "some-arg"
```

https://stackoverflow.com/a/44731765

```ps
function Get-Something
{
    Param
    (
         [Parameter(Mandatory=$true, Position=0)]
         [string] $Name,
         [Parameter(Mandatory=$true, Position=1)]
         [int] $Id
    )
}

# named args
Get-Something -Id 34 -Name "Blah"

# positional args
Get-Something "Blah" 34
```

## Print all loaded functions matching pattern

```ps
Get-ChildItem -Path Function:\Get-*Version
Get-ChildItem -Path Function:\Switch*
```

## Remove function from current session

```ps
Get-ChildItem -Path Function:\Get-*Version | Remove-Item
```

# Environment variables

## Set Environment variable

```ps
# Local to powershell session
$Env:ENV_NAME = "value"

# Permanently
$env:Path = `
  [System.Environment]::GetEnvironmentVariable("Path","Machine") + `
  ";" + `
  [System.Environment]::GetEnvironmentVariable("Path","User")

[System.Environment]::SetEnvironmentVariable('siteName','tachytelic.net',[System.EnvironmentVariableTarget]::Machine)

[System.Environment]::SetEnvironmentVariable('siteName','tachytelic.net',[System.EnvironmentVariableTarget]::User)
```

## Read Environment variable

### Print all

```ps
# Prints only `machine` envs
Get-ChildItem env:

# Similar to above
dir env:
```

### Print specific

```ps
# Better
# Prints only `machine` envs
$env:path

Get-Item Env:PATH
```

# Check is variable exits in scope

```ps1
if (Get-Variable -Name $val -ErrorAction SilentlyContinue) {
  $newVal = Get-Variable -Value $val
}
```


https://koenvangilst.nl/blog/phoenix-liveview-cursors
https://www.reddit.com/r/elixir/comments/tezcjr/a_tutorial_for_creating_a_live_cursors_feature_as/

https://blog.miguelcoba.com/deploying-elixir-ebook

Crazy fast Kubernetes Automation with Terraform
https://www.youtube.com/watch?v=kFt0OGd_LhI
