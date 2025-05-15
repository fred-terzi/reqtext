#!/bin/bash
# round_trip_test.sh
# Run ReqText/flathier tests in a realistic use-case order (init, add, add-after)

set -e

echo "[1] Cleaning up any previous .reqt data..."
bash tests/clean_reqt.sh

echo "[2] Running init.unit.test.js (project initialization)"
node tests/init.unit.test.js

echo "[3] Running addItemHandler.unit.test.js (add item to end)"
node tests/addItemHandler.unit.test.js

echo "[4] Running addAfterHandler.unit.test.js (add item after outline)"
node tests/addAfterHandler.unit.test.js

echo "[5] Round trip test complete."
