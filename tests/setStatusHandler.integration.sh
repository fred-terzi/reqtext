#!/bin/bash
# Integration test for setStatusHandler without jest
set -e

REQT_JSON=".reqt/ReqText.reqt.json"
OUTLINE="2.9"
NEW_STATUS="INTEGRATION_TESTED"

# Backup original file
tmpfile=$(mktemp)
cp "$REQT_JSON" "$tmpfile"

cleanup() {
  mv "$tmpfile" "$REQT_JSON"
}
trap cleanup EXIT

# Run the command
echo "Running: npx reqt set_status $OUTLINE $NEW_STATUS"
npx reqt set_status "$OUTLINE" "$NEW_STATUS"

# Check the result
status=$(jq -r ".[] | select(.outline == \"$OUTLINE\") | .status" "$REQT_JSON")

if [ "$status" = "$NEW_STATUS" ]; then
  echo "PASS: Status updated to $NEW_STATUS for outline $OUTLINE"
  exit 0
else
  echo "FAIL: Status not updated. Found: $status"
  exit 1
fi
