#!/bin/bash
# This script does not account for changes in dependencies. If dependencies change then
# you will need to cd into the root of the fronend/backend dir and execute npm install
# to install any missing dependencies, then execute this script
git checkout master
git pull
caddy reload Caddyfile
cd applications/client/artemis && npm run build &&
cd ../../server && npm run build && npm run restart:prod &&
cp ../errorTracker/errorTracker.js out