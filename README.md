Nourriture Web App
==================

Frontend of the Nourriture. The application depends on our backend "Nourriture-platform".

#### Install and start local instance
Execute the following in the root of your repository clone:

    sudo npm install
    sudo npm install -g http-server  # (If you don't have it already)
    http-server .

This will start a basic local HTTP-server on port 8080 serving the content. In production it is of course hosted using Nginx but this setup is sufficient for rapid local development.

If you wish to specify port you can add the -p parameter

    http-server . -p 1337
