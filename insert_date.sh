#/bin/zsh

find docs/ -name "*.md" -exec sh -c '
  for file; do
    if ! grep -q "^---" "$file"; then
      sed -i "" "1s/^/---\ntitle: NEW TITLE\ndate:\n  created: __date.created__\n  updated: __date.updated__\n---\n/" "$file"
      echo "$file"
    fi
  done
' sh {} +

find docs/ -name "*.md" -exec sh -c '
  for file; do
    sed -i "" -e "1,5s/__date.created__/$(date +"%Y-%m-%d")/g" "$file" 
    sed -i "" -e "1,5s/__date.updated__/$(date +"%Y-%m-%d")/g" "$file"
  done
' sh {} +
