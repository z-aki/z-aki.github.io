#!/bin/zsh

# for every js file in docs/tampermonkey/upd_n, create a copy in docs/tampermonkey/upd_y and override if exists

for file in docs/tampermonkey/upd_n/*.user.js; do
    cp "$file" "docs/tampermonkey/upd_y/$(basename "$file")"
done


# for every js file in docs/tampermonkey/upd_y, remove the lines with @downloadURL

for file in docs/tampermonkey/upd_y/*.user.js; do
    sed -i '' '/@downloadURL/d' "$file"
done

# for every js file in docs/tampermonkey/upd_n, create a md file in docs/tampermonkey/posts

for file in docs/tampermonkey/upd_n/*.user.js; do
    title="$(basename "$file" .user.js)"
    md_file="docs/tampermonkey/posts/${title}.md"
    echo '---\ntitle: '"${title}"'\ndate:\n  created: 2025-07-15\n  updated: __date.updated__\n---\n' > "${md_file}"
    echo '<!-- GENERATED FILE -->' >> "${md_file}"
    # encoded_title="$(jq -rn --arg x "$title" '$x|@uri')"
    echo '[Install latest with possible future updates](../upd_y/'"${title}"'.user.js)' >> "${md_file}"
    echo 'OR' >> "${md_file}"
    echo '[Install fixed script with no updates](../upd_n/'"${title}"'.user.js)' >> "${md_file}"
    
    echo '```js show_lines="1:10"' >> "${md_file}"
    echo '---8<--- "'"${file}"'::100"' >> "${md_file}"
    echo '```' >> "${md_file}"

    echo '<!-- more -->' >> "${md_file}"

    echo '---8<--- "docs/tampermonkey/warning.txt"' >> "${md_file}"
    echo '```js' >> "${md_file}"
    echo '---8<--- "'"${file}"':1:"' >> "${md_file}"
    echo '```' >> "${md_file}"
    
    echo '\n------------' >> "${md_file}"
done

