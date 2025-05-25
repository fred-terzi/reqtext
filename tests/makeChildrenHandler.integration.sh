#!/bin/bash
set -e

# Clean up
rm -rf .reqt/

# 1. Init project
echo "Initializing project..."
npx reqt init makechildrentest

# 2. Add two items
echo "Adding parent item..."
npx reqt -a "Parent Item"
echo "Adding child candidate..."
npx reqt -a "Child Candidate"

# 3. Show items before demote
echo "Items before demote:"
cat .reqt/makechildrentest.reqt.json | jq '.[] | {title: .title, outline: .outline, hier: .hier}'

# 4. Get outline for 'Child Candidate'
OUTLINE=$(cat .reqt/makechildrentest.reqt.json | jq -r '.[] | select(.title=="Child Candidate") | .outline')
echo "Outline for 'Child Candidate': $OUTLINE"

# 5. Demote the child candidate
echo "Demoting item..."
npx reqt make-children "$OUTLINE"

# 6. Show items after demote
echo "Items after demote:"
cat .reqt/makechildrentest.reqt.json | jq '.[] | {title: .title, outline: .outline, hier: .hier}'

# 7. Check if hier increased (should be 1 for child)
HIER=$(cat .reqt/makechildrentest.reqt.json | jq -r '.[] | select(.title=="Child Candidate") | .hier')
if [ "$HIER" = "1" ]; then
  echo "PASS: Child Candidate was demoted to a child (hier=1)."
else
  echo "FAIL: Child Candidate was not demoted. hier=$HIER"
  exit 1
fi
