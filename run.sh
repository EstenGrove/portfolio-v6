#!/bin/bash

# COLORS
RED="\033[1;31m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
NC="\033[0m"

CLIENT_DIR="./client"
SERVER_DIR="./server"

printf "${BLUE}Starting development environment...${NC}\n"

# Start SERVER
printf "${BLUE}Starting [SERVER]...${NC}\n"
cd "${SERVER_DIR}"
npm run dev &          # Run in background
SERVER_PID=$!
cd - > /dev/null       # Go back to original dir

# Start CLIENT
printf "${BLUE}Starting [CLIENT]...${NC}\n"
cd "${CLIENT_DIR}"
npm run local &        # Run in background
CLIENT_PID=$!
cd - > /dev/null

# Wait for both to exit
wait $SERVER_PID
wait $CLIENT_PID

printf "${GREEN}Both client and server processes have exited.${NC}\n"
exit 0
