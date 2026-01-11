#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Stopping any running dev servers...${NC}"
lsof -ti :3000,3001,3002 | xargs kill -9 2>/dev/null

echo -e "${GREEN}Cleaning Next.js cache...${NC}"
rm -rf .next
rm -rf apps/web/.next

echo -e "${GREEN}Installing dependencies to ensure consistency...${NC}"
npm install

echo -e "${GREEN}Starting development server...${NC}"
echo -e "${GREEN}The dashboard image issue should be resolved now.${NC}"
npm run dev
