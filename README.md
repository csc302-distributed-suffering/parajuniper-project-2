# Parajuniper - Project #2: Gathering Patiend Data


# Table of Contents
- [Description](#desc)
- [Installation](#install)
  - [Unix Installation](#unix)
  - [Windows Installation](#win)
- [Building the Application](#build)
- [Running Tests](#test)
- [Appendix](#appendix)


## Description

An application meant for gathering patient data from FHIR databases. 

For documentation, please see the [documentation](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation) folder. There you can find our [meeting minutes](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/meeting%20minutes) and [milestones for development](https://github.com/csc302-distributed-suffering/parajuniper-project-2/blob/main/documentation/milestones.md).

## Installation

### Unix Installation Instructions

Our application is supported on Ubuntu, Debian, Raspbian, CentOS, Fedora, RHEL, and SLES Linux distributions, as well as on Mac OS. To install first clone the repository and then run: 

```
$ sudo sh scripts/install-env.sh
```

On Linux, this script will install `cURL` if not already present and then proceed with installation of [Docker using a convenience script](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script). The script also installs [`docker-compose`](https://docs.docker.com/compose/), and creates a group to allow for using Docker as a non-root user.

On Mac, the script will first install [Homebrew](https://brew.sh/) if not already present and then proceed to install Docker and `docker-compose`. The sript will open the Docker desktop GUI application and requires user input to grant privileges. 

NOTE: On Linux, `install-env.sh` will begin a new shell session for the purpose of reflecting the creation of a `docker` user group immediately. On Linux VM's, a full restart may be necessary for these changes to be reflected if this new session is terminated early. For some Linux distributions, logging out and back in again may also be required in the same situation. More information can be found [here](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user).

After Docker and it's related utilities are installed, you're ready to build and test our application.

### Windows Installation Instructions

Windows is out of the scope of this milestone currently, and requires WLS2 for installation of Docker. Our application does support Windows, but will require manual installation of Docker and `docker-compose`. For more information on Windows installation, please see the (official Docker documentation)[https://docs.docker.com/desktop/windows/install/].

## Building the Application

To build the application after installing Docker, simply navigate to the root directory of the repository (the folder containing `docker-compose.yml` and run:

```
docker-compose up
```

This command will build all containers and run them. After the build is complete, you should be able to navigate to localhost:3000 to see a stub implemenation of our application. To terminate, simply interrupt using `Ctrl+C` in terminal, manually stopping the containers in the Docker GUI, or by running

```
docker-compose down
```

in the same directory. Alternatively, to build the application without running the containers, you can also run

```
docker-compose build client server
```

The first build will take longer as Docker generates the images of our containers, but subsequent builds will use these generated images and be much quicker. Older images can be purged using several `docker-compose` commands, more information is available [here](https://docs.docker.com/engine/reference/commandline/image_rm/).

## Running Tests

To run all available tests for our application, from the root directory of our repository, run

```
docker-compose run test
```

This will build our testing container and its dependencies from and related images. For now, this container runs only two stub tests, one for the client, and one for our server.

## Appendix

For more information about any of the resources mentioned here, please navigate to the links below:

- [FHIR Documentation](http://www.hl7.org/fhir/documentation.html)
- [Docker Reference](https://docs.docker.com/)
- [`docker-compose` reference]()
- [Homebrew](https://brew.sh/)
- [`cURL`](https://curl.se/)
- [Installing WSL](https://docs.microsoft.com/en-us/windows/wsl/install)
