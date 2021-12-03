# Parajuniper - Project #2: Gathering Patient Data

An application meant for gathering patient data from FHIR databases. 
## Links
### Documentation 
For documentation, please see the [documentation](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation) folder. There you can find our [initial A1 milestones for development](https://github.com/csc302-distributed-suffering/parajuniper-project-2/blob/main/documentation/A1/milestones.md) under A1 and [technology stack summary](https://github.com/csc302-distributed-suffering/parajuniper-project-2/blob/main/documentation/A1/Tech%20Stack.md) also under A1. </br>
</br>
[All Meeting Minutes](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/All%20Meeting%20Minutes)
### A1
[Assignment 1 Folder](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/A1)

### A2 
[Assignment 2 Folder](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/A2) <br/>
[Assignment 2 Meeting Minutes](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/A2/Meeting%20Minutes) <br/>
[Assignment 1 Postmortem](https://github.com/csc302-distributed-suffering/parajuniper-project-2/blob/main/documentation/A2/Meeting%20Minutes/postmortem.md)

### A3 
[Assignment 3 Folder](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/A3) <br/>
[Assignment 3 Meeting Minutes](https://github.com/csc302-distributed-suffering/parajuniper-project-2/tree/main/documentation/A3/Meeting%20Minutes) <br/>
[Assignment 2 Postmortem](https://github.com/csc302-distributed-suffering/parajuniper-project-2/blob/main/documentation/A3/A2%20Post%20Mortem.md) 


# Table of Contents
- [Description and Implementation](#description-and-implementation)
- [Installation](#installation)
  - [Unix Installation](#unix-installation-instructions)
  - [Windows Installation](#windows-installation-instructions)
- [Removing Docker](#removing-docker)
- [Building the Application](#building-the-application)
- [Running Tests](#running-tests)
- [Appendix](#appendix)

## Description and Implementation

Directory Structure:
```
parajuniper-project-2
├── Dockerfile
├── README.md
├── docker-compose.yml
├── documentation
│   ├── A1
│   │   ├── meeting minutes
│   │   ├── Tech Stack.md
│   │   └── milestones.md
│   ├── A2
│   |   ├── Meeting Minutes
│   |   └── milestone2.md
│   └── A3
│       ├── Meeting Minutes
│       └── A2 Post Mortem.md
├── package-lock.json
├── package.json
├── scripts
│   ├── install-env.sh
│   └── uninstall-env.sh
└── src
    ├── client
    │   ├── Dockerfile
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   ├── logo192.png
    │   │   ├── logo512.png
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── __snapshots__
    │       │   └── App.test.js.snap
    │       ├── index.css
    │       └── index.js
    └── server
        ├── Dockerfile
        ├── package-lock.json
        ├── package.json
        ├── routes
        │   ├── demo.js
        │   └── demo.test.js
        └── server.js
```

## Installation

### Unix Installation Instructions

Our application is supported on Ubuntu, Debian, Raspbian, CentOS, Fedora, RHEL, and SLES Linux, as well as on Mac OS. To install, first clone the repository and then run: 

```
sudo sh scripts/install-env.sh
```

On Linux, this script will install `cURL` (if not already present) and then proceed with installation of [Docker using a convenience script](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script). The script also installs [`docker-compose`](https://docs.docker.com/compose/), and creates a group to allow for using Docker as a non-root user.

On Mac, the script will first install [Homebrew](https://brew.sh/) (if not already present) and then proceed to install Docker and `docker-compose`. The sript will open the Docker desktop GUI application and requires user input to grant privileges. 

NOTE: On Linux, `install-env.sh` will begin a new shell session for the purpose of reflecting the creation of a `docker` user group immediately. On Linux VMs, a full restart may be necessary for these changes to be reflected if this new session is terminated early. For some Linux distributions, logging out and back in again may also be required in the same situation. More information can be found [here](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user).

After Docker and its related utilities are installed, you're ready to build and test our application.

### Windows Installation Instructions

Windows is out of the scope of this milestone currently, and requires WSL2 for installation of Docker. Our application does support Windows, but currently requires manual installation of Docker and `docker-compose`. For more information on Windows installation, please see the [official Docker documentation](https://docs.docker.com/desktop/windows/install/).

## Building the Application

To build the application after installing Docker, simply navigate to the root directory of the repository (the folder containing `docker-compose.yml` and run:

```
docker-compose up
```

This command will build all containers and run them. After the build is complete, you should be able to navigate to http://localhost:3000 to see our rough implementation. Searching for a name will result in the results being displayed back on the UI. To terminate, simply interrupt using `Ctrl+C` in terminal, manually stop the containers in the Docker GUI, or run

```
docker-compose down
```

in the same directory. Alternatively, to build the application without running the containers, you can also run

```
docker-compose build client server
```

The first build will take longer as Docker generates the images of our containers, but subsequent builds will use these generated images and be quicker. Older images can be purged using several `docker-compose` commands, more information is available [here](https://docs.docker.com/engine/reference/commandline/image_rm/).

## Running Tests

To run all available tests for our application, from the root directory of our repository, run

```
docker-compose run test
```

This will build our testing container and its dependencies and any related images. For now, this container runs only two stub tests, one for the client, and one for our server.

## Removing Docker

Included in our repository is a simple script to purge any Docker images that may exist on your machine, and then uninstall Docker and `docker-compose`. To run this script, navigate to the root of the repository and run

```
sudo sh scripts/uninstall-env.sh
```

## Appendix

For more information about any of the resources mentioned here, please navigate to the links below:

- [FHIR Documentation](http://www.hl7.org/fhir/documentation.html)
- [React](https://reactjs.org/docs/react-api.html)
- [Express](https://expressjs.com/en/4x/api.html)
- [Jest](https://jestjs.io/docs/getting-started)
- [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Node.js](https://nodejs.org/dist/latest-v16.x/docs/api/)
- [Docker Reference](https://docs.docker.com/)
- [`docker-compose` reference](https://docs.docker.com/compose/)
- [Homebrew](https://brew.sh/)
- [`cURL`](https://curl.se/)
- [Installing WSL](https://docs.microsoft.com/en-us/windows/wsl/install)
