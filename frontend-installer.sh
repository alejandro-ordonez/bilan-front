#!/bin/bash

#################### Functions #########################
# Function to check if the script is run with sudo
check_sudo() {
    if [ "$EUID" -ne 0 ]; then
        echo "This script requires sudo permissions. Please run it with sudo."
        exit 1
    else
        echo "You have sudo permissions."
    fi
}

# Function to check if a package is installed
check_package() {
    if dpkg -l | grep -q "^ii  $1 "; then
        echo "Package '$1' is installed."
        return 0
    else
        echo "Package '$1' is not installed."
        return 1
    fi
}

check_file_exists(){
    if [ -f "$file_path" ]; then
        echo "The file '$file_path' exists."
        return 0
    else
        echo "The file '$file_path' does not exist."
        return 1
    fi
}
############################################################

TARGET=$1

check_sudo

echo "Starting installation...."

# Check if a file path parameter is provided
if [ -z "$1" ]; then
    echo "Usage: sudo $0 <target> (prod, salle)"
    exit 1
fi

############### Configure dependencies #####################
echo "Checking for dependencies"

# Check if docker is installed
DOCKER="docker"

if check_package $DOCKER; then
    echo "Docker is installed proceeding with installation..."
else
    # Set up the repository
    yum install -y yum-utils
    yum-config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
    # Install docker
    yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Start docker service
    systemctl start docker
fi

###############################################

############### Run the conatiner #############

# Clean any previous installation
echo "Cleaning any previous containers and images..."
docker prune images -a
docker system prune -a

# Builds the image
docker build -t bilan/front --build-arg TARGET=$TARGET .

# Launches the container and serves in port 80
docker run -d --name=bilan-web-container -p 80:80 bilan/front

###############################################


############ Configure Docker service #########
SERVICE_NAME="bilan-web.service"
SERVICE_PATH="/etc/systemd/system/$SERVICE_NAME"
if check_file_exists $SERVICE_PATH; then
    echo "The service is already created"
else
    cp ./resources/$SERVICE_NAME /etc/systemd/system/
fi

systemctl enable $SERVICE_NAME

###############################################