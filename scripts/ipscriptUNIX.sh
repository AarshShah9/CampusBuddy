#!/bin/bash

# Check if a path was provided
if [[ -z "$1" ]]; then
    echo "Usage: $0 /path/to/.env"
    exit 1
fi

# Function to get the active network interface
get_active_interface() {
    # Find the default route
    local default_route=$(ip route | grep default | awk '{print $5}' | head -1)

    # If the default route was found, use it; otherwise, leave it empty
    if [[ -n "$default_route" ]]; then
        echo "$default_route"
    else
        echo ""
    fi
}

# Get the active network interface
NET_INTERFACE=$(get_active_interface)

# Check if an active network interface was found
if [[ -z "$NET_INTERFACE" ]]; then
    echo "No active network interface found."
    exit 1
fi

# Get the IPv4 address for the active network interface
IP=$(ip addr show $NET_INTERFACE | grep 'inet ' | awk '{print $2}' | cut -d/ -f1)

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
        sed -i '' "/IP_ADDRESS=/c\
IP_ADDRESS=$IP" "$ENV_FILE"
    else
        # Append the IP address to the .env file on a new line
        echo -e "\nIP_ADDRESS=$IP" >> "$ENV_FILE"
    fi
else
    # Create a new .env file and append the IP address
    echo "IP_ADDRESS=$IP" > "$ENV_FILE"
fi

echo "IPv4 address updated in .env file."
