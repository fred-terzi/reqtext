#!/bin/bash
set -e

# Clean up
rm -rf .reqt/
rm -f reqtToMDTest.reqt.md
rm -f reqtToMDTest.reqt.json

# 1. Init project
echo "Initializing project..."
npx reqt init reqtToMDTest

# 2. Add item
echo "Adding item..."
npx reqt -a "Test Item"

# 3. Convert to Markdown
echo "Converting to Markdown..."
echo y | npx reqt reqtmd

# 4. Show generated Markdown
echo "Generated Markdown file:"
cat reqtToMDTest.reqt.md

# 5. Remove the .reqt file to simulate round-trip
rm .reqt/reqtToMDTest.reqt.json

# 6. Convert Markdown back to .reqt
echo "Converting Markdown back to .reqt..."
npx reqt mdreqt

# 7. Show regenerated .reqt file
echo "Regenerated .reqt file:"
cat .reqt/reqtToMDTest.reqt.json

# 8. Check if .reqt file contains the item title
if cat .reqt/reqtToMDTest.reqt.json | grep -q 'Test Item'; then
  echo "PASS: .reqt file contains the item title after round-trip."
else
  echo "FAIL: .reqt file does not contain the item title after round-trip."
  exit 1
fi
