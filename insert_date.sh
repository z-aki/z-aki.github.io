#!/bin/zsh
function get_markdown_files() {
  find docs -name "*.md" -print0
}


get_markdown_files | while IFS= read -r -d $'\0' file ; do
  # Check if the file is empty or contains the front matter
  if [[ ! -s "$file" || $(grep -q "^---" "$file") ]]; then
    sed -i '' "1s/^/---\ntitle: NEW TITLE\ndate:\n  created: __date.created__\n  updated: __date.updated__\n---\n/" "$file"
    echo "new file $file"
  fi
done

N=${1:-0}

function get_mod_files(){
  git diff HEAD~"$N" --name-only | grep '.md$'
}

echo "\nmod files\n"

# Check if there are any modified files
if [ -z "$(get_mod_files)" ]; then
    echo "No modified Markdown files found."
else
  get_mod_files | while IFS= read -r file; do
    echo "mod file $file"
    # replace updated:xxx with   updated: __date.updated__
    sed -i '' -e "s/updated:.*$/updated: __date.updated__/g" "$file"
  done
fi

echo "\nfixing dates\n"
get_markdown_files | while IFS= read -r -d $'\0' file; do
  sed -i "" -e "1,5s/__date.created__/$(date +"%Y-%m-%d")/g" "$file"
  sed -i "" -e "1,5s/__date.updated__/$(date +"%Y-%m-%d")/g" "$file"
done
