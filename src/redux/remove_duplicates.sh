#!/bin/bash

# List all files and count duplicates
git ls-tree -r main --name-only | sort | uniq -d > duplicates.txt

# Loop through the list of duplicates and remove them
while read -r file; do
  git rm "$file"
done < duplicates.txt

# Commit the changes
git commit -m "Remove duplicate files"

# Push to GitHub
git push origin main
