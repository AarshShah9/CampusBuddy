#!/bin/bash

# Check if --skip flag is passed
SKIP=false
for arg in "$@"
do
    if [ "$arg" == "--skip" ]; then
        SKIP=true
        break
    fi
done

if [ "$SKIP" = false ]; then
    cd scripts || exit

    # Call the installation script
    ./install.sh

    cd .. || exit

# Use nvm to switch to the specified version of Node.js, install dependencies, and start the application
nvm use 18.13.0 || :
npm install
fi

npm run start
