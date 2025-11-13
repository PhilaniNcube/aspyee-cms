#!/bin/bash

# Database Backup Script for ASPYEE CMS
# This script creates a backup of your PostgreSQL database before the localization migration

echo "================================================"
echo "ASPYEE CMS Database Backup"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

# Get timestamp for backup filename
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups"
BACKUP_FILE="${BACKUP_DIR}/backup_before_localization_${TIMESTAMP}.sql"

# Create backups directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${BLUE}Creating backups directory...${NC}"
    mkdir -p "$BACKUP_DIR"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}Error: .env.local file not found!${NC}"
    exit 1
fi

# Source environment variables
source .env.local

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL_UNPOOLED" ]; then
    echo -e "${RED}Error: DATABASE_URL_UNPOOLED not found in .env.local${NC}"
    exit 1
fi

echo -e "${BLUE}Database:${NC} $PGDATABASE"
echo -e "${BLUE}Host:${NC} $PGHOST_UNPOOLED"
echo -e "${BLUE}User:${NC} $PGUSER"
echo -e "${BLUE}Backup file:${NC} $BACKUP_FILE"
echo ""

# Check if pg_dump is installed
if ! command -v pg_dump &> /dev/null; then
    echo -e "${RED}Error: pg_dump is not installed!${NC}"
    echo ""
    echo "You have two options:"
    echo ""
    echo "1. Install PostgreSQL client tools:"
    echo "   - Windows: Download from https://www.postgresql.org/download/windows/"
    echo "   - Or use Neon's web interface to create a backup"
    echo ""
    echo "2. Use Neon's CLI or web interface:"
    echo "   - Visit: https://console.neon.tech/"
    echo "   - Go to your project"
    echo "   - Use the 'Branches' tab to create a branch (instant backup)"
    echo ""
    exit 1
fi

# Create backup
echo -e "${YELLOW}Creating backup...${NC}"
echo ""

# Use the unpooled connection for backup
export PGPASSWORD="$PGPASSWORD"

if pg_dump -h "$PGHOST_UNPOOLED" -U "$PGUSER" -d "$PGDATABASE" --no-password > "$BACKUP_FILE" 2>&1; then
    echo -e "${GREEN}✓ Backup created successfully!${NC}"
    echo ""
    echo -e "${GREEN}Backup location:${NC} $BACKUP_FILE"
    
    # Get file size
    FILESIZE=$(ls -lh "$BACKUP_FILE" | awk '{print $5}')
    echo -e "${GREEN}Backup size:${NC} $FILESIZE"
    echo ""
    
    # Count some key tables
    echo -e "${BLUE}Backup contains:${NC}"
    grep -c "COPY public.resources" "$BACKUP_FILE" && echo "  - Resources data" || true
    grep -c "COPY public.blogs" "$BACKUP_FILE" && echo "  - Blogs data" || true
    grep -c "COPY public.events" "$BACKUP_FILE" && echo "  - Events data" || true
    echo ""
    
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}Backup Complete!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    echo "You can now safely proceed with the localization migration."
    echo ""
    echo "To restore from this backup (if needed):"
    echo -e "${YELLOW}  psql \$DATABASE_URL_UNPOOLED < $BACKUP_FILE${NC}"
    echo ""
    
else
    echo -e "${RED}✗ Backup failed!${NC}"
    echo ""
    echo "Error creating backup. Please check:"
    echo "1. Database connection details are correct"
    echo "2. You have network access to the database"
    echo "3. Your database credentials are valid"
    echo ""
    exit 1
fi
