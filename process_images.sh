#!/bin/bash

# Create the destination directory if it doesn't exist
mkdir -p images

# Copy and optimize images
for img in "/Users/leandrodisconzi/Desktop/Stock Aware 2025/images/"*.jpeg; do
    filename=$(basename "$img")
    # Remove IMG_ prefix and .jpeg extension
    newname="rosa-${filename#IMG_}"
    newname="${newname%.jpeg}.jpg"
    
    # Copy and optimize the image
    sips -s format jpeg -s formatOptions 80 "$img" --out "images/$newname"
done
