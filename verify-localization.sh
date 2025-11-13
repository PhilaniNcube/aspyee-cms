#!/bin/bash

# Localization Implementation Verification Script
# This script helps verify that localization is correctly implemented

echo "================================================"
echo "ASPYEE CMS Localization Verification"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check payload.config.ts
echo "1. Checking payload.config.ts..."
if grep -q "localization:" src/payload.config.ts; then
    echo -e "${GREEN}✓${NC} Localization configuration found"
else
    echo -e "${RED}✗${NC} Localization configuration missing"
fi

# Check for localized fields in collections
echo ""
echo "2. Checking collection configurations..."

check_collection() {
    local file=$1
    local name=$2
    if grep -q "localized: true" "$file"; then
        echo -e "${GREEN}✓${NC} $name has localized fields"
    else
        echo -e "${YELLOW}!${NC} $name has no localized fields"
    fi
}

check_collection "src/collections/Resources.ts" "Resources"
check_collection "src/collections/Blogs.ts" "Blogs"
check_collection "src/collections/Events.ts" "Events"
check_collection "src/collections/Categories.ts" "Categories"
check_collection "src/collections/NewsAndEventsPage.ts" "NewsAndEventsPage"

# Check i18n utilities
echo ""
echo "3. Checking utilities..."
if [ -f "src/lib/i18n.ts" ]; then
    echo -e "${GREEN}✓${NC} i18n utilities exist"
else
    echo -e "${RED}✗${NC} i18n utilities missing"
fi

# Check components
echo ""
echo "4. Checking components..."
if [ -f "src/components/language-switcher.tsx" ]; then
    echo -e "${GREEN}✓${NC} Language switcher component exists"
else
    echo -e "${YELLOW}!${NC} Language switcher component missing"
fi

# Check documentation
echo ""
echo "5. Checking documentation..."
docs=(
    "LOCALIZATION_GUIDE.md"
    "LOCALIZATION_TESTING.md"
    "LOCALIZATION_SUMMARY.md"
    "LOCALIZATION_QUICK_REFERENCE.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc exists"
    else
        echo -e "${RED}✗${NC} $doc missing"
    fi
done

# Check migration
echo ""
echo "6. Checking migration..."
if [ -f "src/migrations/20251113_add_localization.ts" ]; then
    echo -e "${GREEN}✓${NC} Localization migration exists"
else
    echo -e "${YELLOW}!${NC} Localization migration missing"
fi

# Check TypeScript types
echo ""
echo "7. Checking TypeScript types..."
if [ -f "src/payload-types.ts" ]; then
    echo -e "${GREEN}✓${NC} Payload types generated"
else
    echo -e "${RED}✗${NC} Payload types missing - run: pnpm generate:types"
fi

# Final summary
echo ""
echo "================================================"
echo "Verification Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Start dev server: ${YELLOW}pnpm dev${NC}"
echo "2. Open admin panel: ${YELLOW}http://localhost:3000/admin${NC}"
echo "3. Verify locale selector appears in documents"
echo "4. Test adding translations"
echo ""
echo "Full testing checklist: ${YELLOW}LOCALIZATION_TESTING.md${NC}"
echo "Complete guide: ${YELLOW}LOCALIZATION_GUIDE.md${NC}"
echo ""
