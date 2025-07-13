#/bin/zsh

find docs/ -name "*.md" -exec sh -c '
  for file; do
    if ! grep -q "^---" "$file"; then
      sed -i "" "1s/^/---\ntitle: RTI requests for BMTC\ndate:\n  creation: __date.creation__\n  update: __date.update__\n---\n/" "$file"
      echo "$file"
    fi
  done
' sh {} +

find docs/ -name "*.md" -exec sh -c '
  for file; do
    sed -i "" -e "1,5s/__date.creation__/$(date +"%e %B %Y")/g" "$file" 
    sed -i "" -e "1,5s/__date.update__/$(date +"%e %B %Y")/g" "$file"
  done
' sh {} +
