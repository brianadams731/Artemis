#!/bin/bash

git pull
cd applications/client/artemis && npm run build
cd ../../../server && npm run build && npm run restart:prod