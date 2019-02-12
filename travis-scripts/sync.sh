#!/bin/bash

$ENV=$1

sudo apt-get install python3 python3-pip
sudo pip3 install --upgrade awscli
npm install
npm run build

if [ $ENV = "production" ] then
  aws s3 sync ./build/ s3://app.happyculteur.co --exclude ".git" --exclude ".travis.yml" --cache-control max-age=${MAX_AGE} --delete
else
  aws s3 sync ./build/ s3://$ENV.app.happyculteur.co --exclude ".git" --exclude ".travis.yml" --cache-control max-age=${MAX_AGE} --delete
fi
