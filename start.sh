#!/bin/bash

cd scripts || exit

./install.sh

./ipscript.sh ../backend/.env
./ipscript.sh ../frontend/.env

cd .. || exit

nvm use 18.13.0 || :
npm install
npm run start