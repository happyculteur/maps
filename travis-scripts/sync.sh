#!/bin/bash

BRANCH=$1

npm install --only=prod
npm run build

if [ $BRANCH = "master" ]; then
  aws s3 sync ./build/ s3://app.happyculteur.co --exclude ".git" --exclude ".travis.yml" --cache-control max-age=${MAX_AGE} --delete
else
  aws s3 sync ./build/ s3://$ENV.app.happyculteur.co --exclude ".git" --exclude ".travis.yml" --cache-control max-age=${MAX_AGE} --delete
fi
