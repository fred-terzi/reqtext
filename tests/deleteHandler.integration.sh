#!/bin/bash
set -e

echo "Cleaning up old test file..."
rm -r .reqt/

# 1. Init project
echo "Initializing project..."
npx reqt init deletehandlertest

# 2. Add item
echo "Adding item..."
npx reqt -a "Delete Me"

# 3. Show items before delete
echo "Items before delete:"
cat .reqt/deletehandlertest.reqt.json | jq '.[] | {title: .title, outline: .outline}'


# 4. Try to delete the project/root item (should fail)
echo "Attempting to delete project/root item (outline 0)..."
if npx reqt -d "0"; then
  echo "FAIL: Was able to delete the project/root item (outline 0), but should have been blocked."
  exit 1
else
  echo "PASS: Deletion of project/root item (outline 0) was correctly blocked."
fi

# 5. Delete the added item
echo "Deleting item..."
npx reqt -d "1"

# 6. Show items after delete
echo "Items after delete:"
cat .reqt/deletehandlertest.reqt.json | jq '.[] | {title: .title, outline: .outline}'

# 7. Check if item is gone
if cat .reqt/deletehandlertest.reqt.json | grep -q 'Delete Me'; then
  echo "FAIL: 'Delete Me' was not deleted."
  exit 1
else
  echo "PASS: 'Delete Me' was deleted."
fi
