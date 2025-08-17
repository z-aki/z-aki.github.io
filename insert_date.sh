#!/bin/bash

files="$(find docs -name "*.md" -print0)"

echo -e "\n----------\n"
echo "$files" | while IFS= read -r file; do
  # Check if the file is empty or contains the front matter
  if [[ ! -s "$file" || $(grep -q "^---" "$file") ]]; then
    sed -i '' "1s/^/---\ntitle: NEW TITLE\ndate:\n  created: __date.created__\n  updated: __date.updated__\n---\n/" "$file"
    echo "0$file"
  fi
done

# filter md files
files=$(git diff HEAD --name-only | grep '.md$' || true)
echo "$files" | while IFS= read -r file; do
  # replace updated:xxx with   updated: __date.updated__
  sed -i "" -e "s/updated:.*$/updated: __date.updated__/g" "$file"
done


echo "$files" | while IFS= read -r file; do
  sed -i "" -e "1,5s/__date.created__/$(date +"%Y-%m-%d")/g" "$file"
  sed -i "" -e "1,5s/__date.updated__/$(date +"%Y-%m-%d")/g" "$file"
done
