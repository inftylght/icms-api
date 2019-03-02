#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"
cp config.prod.js config.js
yarn install
pm2 stop app.js
pm2 start app.js
pm2 status
