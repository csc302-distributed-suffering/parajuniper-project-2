#!/bin/bash

get_distribution() {
	lsb_dist=""
	# Every system that we officially support has /etc/os-release
	if [ -r /etc/os-release ]; then
		lsb_dist="$(. /etc/os-release && echo "$ID")"
	fi
	# Returning an empty string here should be alright since the
	# case statements don't act unless you provide an actual value
	echo "$lsb_dist"
}

is_wsl() {
	case "$(uname -r)" in
	*microsoft* ) true ;; # WSL 2
	*Microsoft* ) true ;; # WSL 1
	* ) false;;
	esac
}

install_curl() {
    lsb_dist=$(get_distribution)
    lsb_dist="$(echo "$lsb_dist" | tr '[:upper:]' '[:lower:]')"
    if is_wsl; then
		echo
		echo "WSL DETECTED: We recommend using Docker Desktop for Windows."
		echo "Please get Docker Desktop from https://www.docker.com/products/docker-desktop"
		echo
		cat >&2 <<-'EOF'

			You may press Ctrl+C now to abort this script.
		EOF
		( set -x; sleep 20 )
	fi

    case "$lsb_dist" in 
        ubuntu|debian|raspbian)
            echo "Using apt-get..."
            apt-get install curl
            return 0
            ;;
        centos|fedora|rhel)
            echo "Using yum..."
            yum install curl
            return 0
            ;;
        sles)
            echo "Using zypper..."
            zypper install curl
            return 0
            ;;
        *)
            echo "Unsupported distribution. Installation cannot continue." 
            return 1
            ;;
    esac
}

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
    trap 'rm -f get-docker.sh' INT EXIT # remove curled script after exiting for any reason

    if ! [ -x "$(command -v curl)" ]; then
        echo "curl not found. Installing..."
        install_curl

        if ! [ $? -eq 0 ]; then
            echo "Could not install curl. Exiting..."
            exit 1
        fi
    fi

    # download docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh

    if [ $? -eq 130 ]; then
        echo "Installation interrupted. Exiting..."
        exit 1
    fi   

    curl -L --fail https://github.com/docker/compose/releases/download/1.29.2/run.sh -o /usr/local/bin/docker-compose # download compose
    chmod +x /usr/local/bin/docker-compose

    # create docker group for non-root access
    echo "Creating docker group"
    groupadd docker 2> /dev/null
    echo "Adding $SUDO_USER to group docker"
    usermod -aG docker $SUDO_USER
    echo "Starting docker service"
    service docker start
    su $SUDO_USER
fi
