@echo off
cd /d %~dp0

echo Building frontend...
call npm run build --prefix frontend

echo Deploying frontend...
call del /S /Q backend\assets\*
call xcopy /E /I frontend\build\* backend\assets\

echo Starting backend...
call npm start --prefix backend