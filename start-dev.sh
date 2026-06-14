#!/bin/bash
cd /home/z/my-project
export NODE_OPTIONS="--max-old-space-size=4096"
while true; do
  echo "=== Starting dev server at $(date) ===" > /home/z/my-project/dev.log
  node node_modules/.bin/next dev -p 3000 >> /home/z/my-project/dev.log 2>&1
  EXIT_CODE=$?
  echo "=== Server exited with code $EXIT_CODE at $(date), restarting in 3s... ===" >> /home/z/my-project/dev.log
  sleep 3
done
