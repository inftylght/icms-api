#!/usr/bin/env bash
git pull
npm install
pm2 restart all -s
pm2 status
