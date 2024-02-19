# DevOpsCloud

## Table of contents
* [Introduction](#Introduction)
* [Getting Started](#getting-started)

## Introduction

## Getting Started

This project runs as a collection of docker containers, coordinated through docker compose. The main repository is split into two parts,
a docker part and a source code part. The `docker` folder contains all files needed by docker, as well as storage places used by the container allowing for persistent data.

The second, main folder is the `src` folder, in which our application resides. The `src` folder is used as a volume by both NGINX and Laravel, so changes in the code are synced with the containers.

### Running
Since the docker compose file makes use of environment variables defined in the src folder, the env file must be specified in each docker compose argument:
```bash
docker compose --env-file=./src/.env ...
```
To make this a bit easier, a run script is defined with some commonly used commands:
```bash
# Start the containers
./run.sh up

# Stop the containers
./run.sh stop

# Rebuild the containers
./run.sh rebuild

# Drop into the Laravel container
./run.sh ssh
```

### Troubleshooting File Permissions
Since the `src` folder is shared by both the host machine and the docker containers, the filepermissions of the files are also shared.

This can lead to issues, since the user on localhost is not the same as the user on the docker container. As a temporary fix, the filepermissions of the `src` folder are set so that every user is allowed to use them.

One issue that still arises, is when you use Laravel to create new files for you. Since these files will have been created by the container, the user on the localhost will not have permission to interact with them.

To solve this, on localhost, run the following:
```bash
sudo chmod a+rwx src
```
This will change the file permissions of the newly created files, so that they are also allowed to be edited by every user.