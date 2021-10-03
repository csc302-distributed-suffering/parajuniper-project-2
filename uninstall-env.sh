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

# Uninstall docker
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
    
    echo "brew is installed. Uninstalling docker..."
    sudo -u $SUDO_USER brew uninstall --cask docker
    sudo -u $SUDO_USER brew uninstall docker-compose
else
    # some unix env
    # uninstall docker
    lsb_dist=$(get_distribution)
    lsb_dist="$(echo "$lsb_dist" | tr '[:upper:]' '[:lower:]')"
    case "$lsb_dist" in 
        ubuntu|debian|raspbian)
            echo "Using apt-get..."
            echo "Uninstalling docker"
            apt-get purge docker-ce docker-ce-cli containerd.io 
            rm -rf /var/lib/docker
            rm -rf /var/lib/containerd 

            echo "Removing docker group"
            groupdel docker
            break 
            ;;
        centos|fedora|rhel)
            echo "Using yum..."
            echo "Uninstalling docker"
            dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine 
            break 
            ;;
        sles)
            echo "Using zypper..."
            echo "Uninstalling docker"
            zypper remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine \
                  runc
            break
            ;;
        *)
            echo "Unsupported distribution. Cannot continue." 
            break 
            ;;
    esac  

    echo "Uninstalling docker-compose"
    rm /usr/local/bin/docker-compose
fi