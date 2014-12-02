#!/bin/bash

# Package name (name of outputted archieve)
PK_NAME=nourriture-webapp-0.1.${BUILD_NUMBER}

# Clean up any old build
rm -r build

# Prepare build output folders
mkdir build
mkdir build/$PK_NAME
mkdir build/$PK_NAME/nourriture-webapp

# Copy source files ( TODO: Combine and minify js/css )
cp index.html build/$PK_NAME/nourriture-webapp/index.html
cp config.js build/$PK_NAME/nourriture-webapp/config.js
cp -r js build/$PK_NAME/nourriture-webapp/js
cp -r css build/$PK_NAME/nourriture-webapp/css
cp -r img build/$PK_NAME/nourriture-webapp/img
cp -r partials build/$PK_NAME/nourriture-webapp/partials

# Inject build number (from Jenkins environment variable) into bower.json
sed bower.json -e "s/\(\"version\":\s\"[0-9]*.[0-9]*.\)[0-9]\"/\1$BUILD_NUMBER\"/g" > build/$PK_NAME/nourriture-webapp/bower.json

# Package everything into a zip with version number in the filename
cd build
zip $PK_NAME.zip -r $PK_NAME/
cd ..
