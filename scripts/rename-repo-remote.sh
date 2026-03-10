#!/bin/bash
# Update local git remote after renaming the GitHub repo from ParioGO to Hepta
# Run this AFTER renaming the repo on GitHub: Settings > General > Repository name

cd "$(dirname "$0")/.."
git remote set-url origin https://github.com/CK77-hash/Hepta.git
echo "Remote updated to https://github.com/CK77-hash/Hepta.git"
git remote -v
