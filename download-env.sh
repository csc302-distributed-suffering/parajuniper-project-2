#!/bin/bash

# Install docker
if [ $(id -u) != "0" ]; then
echo "You must be the superuser to run this script. Please rerun the script using sudo." >&2
exit 1
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
    # mac
    echo "OS is Mac"
    echo "Checking if homebrew is installed...."
    if ! [ -x "$(command -v brew)" ]; then
        echo "Homebrew not found, installing..."
        sudo -u $SUDO_USER /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    fi
    
    echo "brew is installed. Installing docker..."
    sudo -u $SUDO_USER brew install --cask docker
    sudo -u $SUDO_USER brew install docker-compose
    open /Applications/Docker.app # Open docker to start daemon
else
    # some unix env
    trap 'rm -f get-docker.sh' INT EXIT ERR # remove curled script after exiting for any reason

    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
fi
