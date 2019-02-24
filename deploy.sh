#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd "$BASEDIR"
git reset --hard || exit "$?"
git pull || exit "$?"
npm install
pm2 restart all -s
pm2 status
