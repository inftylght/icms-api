#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"
git reset --hard
git pull
npm install
pm2 restart all -s
pm2 status
