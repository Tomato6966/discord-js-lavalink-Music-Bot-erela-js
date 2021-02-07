# Discord.js Lavalink Music Bot using erela.js

[erela.js docs](https://solaris.codes/projects/erelajs)

## Installation | How to use the Bot

 **1.** Install [node.js v12+](https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode) or higher

 **2.** Download this repo and unzip it    |    or git clone it
 
 **3.** Install all of the packages with **`npm install`**     |  the important packages are   **`npm install discord.js erela.js`**
 
 **4** Fill in the parameters, RIGHT in config.json!
 
 **5.** [Download Lavalink](https://ci.fredboat.com/viewLog.html?buildId=lastSuccessful&buildTypeId=Lavalink_Build&tab=artifacts&guest=1) and download Java 15 (Java 13 recommended)
 
 **5.1** Run the Lavalink file with: **`java -jar Lavalink.jar`**
 
 **MAKE SURE THAT THERE IS THE application.yml FILE OTHERWISE IT WILL NOT WORK!
 
 **6.** start the bot with **`node index.js`**

#### **NOTE:**

*If you are having errors/problems with starting delete the package.json file and do, before you install the packages `npm init`*


# THIS IS HOW IT SHOULD LOOK LIKE!

![](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js/blob/main/Folder_structure.png)

# SHORT OVERVIEW TUTORIAL!
[![](http://img.youtube.com/vi/_skTgDBMd44/0.jpg)](http://www.youtube.com/watch?v=_skTgDBMd44 "")

## Windows start Command .bat file
```bat
@ECHO OFF
ECHO ==========================
ECHO Starting Lavalink
ECHO ==========================
start cmd /k java -jar ./Lavalink.jar
ECHO ==========================
@ECHO Taking a 5 Second Break for Lavalink
ECHO ==========================
timeout /T 5 /nobreak
ECHO ==========================
@ECHO Starting BOT
ECHO ==========================
start cmd /k node .
exit /s'
``` Windows `start.bat` file
Which starts Lavalink and the Bot together via one click ;)

Have it in the Same folder as `index.js` and `Lavalink.jar`
