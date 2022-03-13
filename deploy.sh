#!/bin/bash

git checkout master
git pull
caddy reload Caddyfile
cd applications/client/artemis && npm run build &&
cd ../../server && npm run build && npm run restart:prod
