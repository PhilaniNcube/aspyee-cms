#!/bin/bash

# Script to reorganize Next.js app structure for i18n with next-intl

# Navigate to the frontend directory
cd "$(dirname "$0")/src/app/(frontend)"

# Create the [locale] directory if it doesn't exist
mkdir -p "[locale]"

# List of directories to move (excluding those that should stay at root level)
folders_to_move=(
  "blogs"
  "educators" 
  "events"
  "knowledge-centre"
  "news-and-events"
  "policymakers"
  "private-sector"
  "profile"
  "register"
  "researchers"
  "sign-in"
  "youth"
)

# Move each folder
for folder in "${folders_to_move[@]}"; do
  if [ -d "$folder" ]; then
    echo "Moving $folder to [locale]/$folder"
    mv "$folder" "[locale]/$folder"
  fi
done

# Keep these at root level:
# - navigation (shared across all locales)
# - _components (shared components)
# - hooks (shared hooks)
# - providers (shared providers)
# - global.css, hero-top.module.css, styles.css

echo "Reorganization complete!"
echo "The following should remain in (frontend):"
echo "  - navigation/"
echo "  - _components/"
echo "  - hooks/"
echo "  - providers/"
echo "  - layout.tsx (root layout)"
echo "  - CSS files"
