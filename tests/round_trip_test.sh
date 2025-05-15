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

echo "[5] Running editTitleHandler.integration.sh (edit title command)"
bash tests/editTitleHandler.integration.sh

echo "[6] Running makeChildrenHandler.integration.sh (make children command)"
bash tests/makeChildrenHandler.integration.sh

echo "[7] Running makeSiblingHandler.integration.sh (make sibling command)"
bash tests/makeSiblingHandler.integration.sh

echo "[8] Round trip test complete."
