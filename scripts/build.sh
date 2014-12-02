#!/bin/bash

# Clean up any old build
rm -f -r dist

# Build and compress
grunt build --buildnumber=0.1.$BUILD_NUMBER