# !/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  npm run test:unit && npm run lint && npm run build
  git add -A
  git commit -m "Dist: Build $VERSION"
  npm version $VERSION -m "Release $VERSION"
  git push origin dev
  npm publish
fi