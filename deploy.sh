#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"
git pull
npm install
pm2 restart all -s
pm2 status
