#!/bin/bash
set -e

# Clean up
rm -rf .reqt/

# 1. Init project
echo "Initializing project..."
npx reqt init makesiblingtest

# 2. Add three items
echo "Adding first item..."
npx reqt -a "First Item"
echo "Adding parent item..."
npx reqt -a "Parent Item"
echo "Adding child item..."
npx reqt -a "Child Item"

# 3. Demote 'Child Item' to be a child of 'Parent Item'
CHILD_OUTLINE=$(cat .reqt/makesiblingtest.reqt.json | jq -r '.[] | select(.title=="Child Item") | .outline')
echo "Demoting Child Item (outline $CHILD_OUTLINE) to be a child..."
npx reqt make_children "$CHILD_OUTLINE"

# 4. Show items after demote
echo "Items after demote:"
cat .reqt/makesiblingtest.reqt.json | jq '.[] | {title: .title, outline: .outline, hier: .hier}'

# 5. Promote 'Child Item' back to sibling
CHILD_OUTLINE=$(cat .reqt/makesiblingtest.reqt.json | jq -r '.[] | select(.title=="Child Item") | .outline')
echo "Promoting Child Item (outline $CHILD_OUTLINE) to be a sibling..."
npx reqt make_sibling "$CHILD_OUTLINE"

# 6. Show items after promote
echo "Items after promote:"
cat .reqt/makesiblingtest.reqt.json | jq '.[] | {title: .title, outline: .outline, hier: .hier}'

# 7. Check if hier is 0 (sibling)
HIER=$(cat .reqt/makesiblingtest.reqt.json | jq -r '.[] | select(.title=="Child Item") | .hier')
if [ "$HIER" = "0" ]; then
  echo "PASS: Child Item was promoted to a sibling (hier=0)."
else
  echo "FAIL: Child Item was not promoted. hier=$HIER"
  exit 1
fi
