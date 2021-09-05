#!/bin/sh

git init
git add .
git commit -am "automatic publish"
git push https://git.heroku.com/grossery.git master --force
rm -rf .git

 read -s -n 1 -p "Press any key to continue . . ."
 echo ""