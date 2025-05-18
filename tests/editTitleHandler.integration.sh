#!/bin/bash
set -e

# 1. Init project
echo "Initializing project..."
npx reqt init edittitletest

# 2. Add item
echo "Adding item..."
npx reqt -a "Old Title"

# 3. Show items before edit
echo "Items before edit:"
cat .reqt/edittitletest.reqt.json | jq '.[] | {title: .title, outline: .outline}'

# 4. Get outline for 'Old Title'
OUTLINE=$(cat .reqt/edittitletest.reqt.json | jq -r '.[] | select(.title=="Old Title") | .outline')
echo "Outline for 'Old Title': $OUTLINE"

# 5. Edit the title
echo "Editing title..."
npx reqt -et "$OUTLINE" "New Title"

# 6. Show items after edit
echo "Items after edit:"
cat .reqt/edittitletest.reqt.json | jq '.[] | {title: .title, outline: .outline}'

# 7. Check if title is updated
if cat .reqt/edittitletest.reqt.json | grep -q 'New Title'; then
  echo "PASS: Title was updated."
else
  echo "FAIL: Title was not updated."
  exit 1
fi
