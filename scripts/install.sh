#!/bin/bash

cd ../backend || exit
npm install
cd ../frontend || exit
npm install
cd ../shared || exit
npm install