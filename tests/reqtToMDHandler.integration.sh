#!/bin/bash
set -e

# Clean up
rm -rf .reqt/
rm -f .reqtToMDTest.md

# 1. Init project
echo "Initializing project..."
npx reqt init reqtToMDTest

# 2. Add item
echo "Adding item..."
npx reqt -a "Test Item"

# 3. Run reqtToMDHandler (reqtmd command)
echo "Converting to Markdown..."
npx reqt reqtmd --yes || npx reqt mdreqt --yes

# 4. Show generated Markdown
echo "Generated Markdown file:"
cat reqtToMDTest.reqt.md

# 5. Check if Markdown contains the item title
if cat reqtToMDTest.reqt.md | grep -q 'Test Item'; then
  echo "PASS: Markdown file contains the item title."
else
  echo "FAIL: Markdown file does not contain the item title."
  exit 1
fi

# Setup: create a temp copy of the .reqt.json file
cp .reqt/ReqText.reqt.json test_reqt.json

# Run the out-md command
node ./bin/index.js out-md test_reqt.json

# Check that the markdown file was created
ROOT_TITLE=$(jq -r '.[0].title' test_reqt.json | sed 's/[^a-zA-Z0-9-_]/_/g')
MD_FILE="${ROOT_TITLE}.reqt.md"

if [ ! -f "$MD_FILE" ]; then
  echo "FAIL: Markdown file $MD_FILE was not created."
  exit 1
fi

echo "PASS: Markdown file $MD_FILE was created."

# Cleanup
test -f "$MD_FILE" && rm "$MD_FILE"
rm test_reqt.json
