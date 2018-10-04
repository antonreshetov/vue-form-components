#!/bin/sh
npm run build
git add docs/*
git commit -m "Docs: Update build"
git subtree push --prefix docs origin gh-pages