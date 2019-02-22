#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"
git pull
npm install
npm audit fix
pm2 restart all -s
pm2 status
