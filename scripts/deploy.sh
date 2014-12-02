#!/bin/sh
# Procedures that will deploy and install our application
# using SSH.
#
# NOTE: Expects variables
#   - $ENVIRONMENT: Used root folder and process uid
#
# Niels Søholm (2014-12-02)

scp nourriture-webapp-0.1.*.zip training:/srv/$ENVIRONMENT/nourriture-webapp.zip

ssh training <<EOF
  cd /srv/$ENVIRONMENT/

  rm -f -r nourriture-webapp-*
  rm -f -r nourriture-webapp

  unzip -o *.zip
  cd nourriture-webapp-*
  mv nourriture-webapp/ ../nourriture-webapp
  cd ../nourriture-webapp

  bower install

  cp ../config.js config.js

  exit
EOF