#!/bin/bash

cd scripts || exit

# Call the installation script
./install.sh

# Determine the OS type and call the appropriate IP script
OS_TYPE=$(uname -s)
case "$OS_TYPE" in
    Linux*|Darwin*)
        # This is for Unix-like systems
        ./ipscriptUNIX.sh ../backend/.env
        ./ipscriptUNIX.sh ../frontend/.env
        ;;
    MINGW*|CYGWIN*|MSYS*)
        # This is for Windows Git Bash
        ./ipscript.sh ../backend/.env
        ./ipscript.sh ../frontend/.env
        ;;
    *)
        echo "Unknown operating system."
        exit 1
        ;;
esac

cd .. || exit

# Use nvm to switch to the specified version of Node.js, install dependencies, and start the application
nvm use 18.13.0 || :
npm install
npm run start
