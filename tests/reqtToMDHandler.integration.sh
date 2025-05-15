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
