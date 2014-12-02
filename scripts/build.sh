#!/bin/bash

# Package name (name of outputted archieve)
PK_NAME=nourriture-0.1.${BUILD_NUMBER}

# Clean up any old build
rm -r build

# Prepare build output folders
mkdir build
mkdir build/$PK_NAME

# Copy source files
cp index.html build/$PK_NAME/index.html
cp -r js build/$PK_NAME/js
cp -r css build/$PK_NAME/css
cp -r img build/$PK_NAME/img
cp -r partials build/$PK_NAME/partials

# Inject build number (from Jenkins environment variable) into bower.json
sed bower.json -e "s/\(\"version\":\s\"[0-9]*.[0-9]*.\)[0-9]\"/\1$BUILD_NUMBER\"/g" > build/$PK_NAME/bower.json

# Package everything into a zip with version number in the filename
cd build
zip $PK_NAME.zip -r $PK_NAME/
cd ..
