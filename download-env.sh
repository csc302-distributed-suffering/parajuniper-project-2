#!/bin/bash

# Install docker
if [ $(id -u) != "0" ]; then
echo "You must be the superuser to run this script. Please rerun the script using sudo." >&2
exit 1

apt-get install docker
