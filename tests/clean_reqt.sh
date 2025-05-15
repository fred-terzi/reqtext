#!/bin/bash
# Script to delete the .reqt directory and all its contents

if [ -d ".reqt" ]; then
  rm -rf .reqt
  echo ".reqt directory deleted."
else
  echo ".reqt directory does not exist."
fi
