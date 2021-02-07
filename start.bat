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
exit /s
