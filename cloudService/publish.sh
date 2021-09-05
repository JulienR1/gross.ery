#!/bin/sh

git init
git add .
git commit -am "automatic publish"
git push https://git.heroku.com/grossery.git master
rm -rf .git
