#!/bin/bash

# Check if a path was provided
if [[ -z "$1" ]]; then
    echo "Usage: $0 /path/to/.env"
    exit 1
fi

# Get the IPv4 address
IP=$(ipconfig | grep -i "IPv4 Address" | head -1 | awk -F: '{print $2}' | awk '{print $1}')

# Check if the IP was fetched successfully
if [[ -z "$IP" ]]; then
    echo "Failed to retrieve the IPv4 address."
    exit 1
fi

# Use the provided path for the .env file
ENV_FILE="$1"

# Check if the .env file exists
if [[ -f "$ENV_FILE" ]]; then
    # Check if IP variable already exists in the .env file
    if grep -q "IP_ADDRESS=" "$ENV_FILE"; then
        # Replace the existing IP address
        sed -i "/IP_ADDRESS=/c\IP_ADDRESS=$IP" "$ENV_FILE"
    else
        # Append the IP address to the .env file on a new line
        echo -e "\nIP_ADDRESS=$IP" >> "$ENV_FILE"
    fi
else
    # Create a new .env file and append the IP address
    echo "IP_ADDRESS=$IP" > "$ENV_FILE"
fi

echo "IPv4 address updated in .env file."
