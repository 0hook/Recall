@echo off
cls
echo Starting Recall...

if not exist dist\index.js (
    echo Compiled files not found. Building...
    if not exist dist mkdir dist
    call npm run build
    if %errorlevel% neq 0 (
        echo build failed! Please fix the errors above.
        pause
        exit /b
    )
    echo Build completed successfully.
) else (
    echo Using existing build. To rebuild, delete dist folder or run npm run build.
)

echo Running Recall...
cls
node dist\index.js
pause