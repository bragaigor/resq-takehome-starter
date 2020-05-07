# ResQ Take-home Template

This project has scaffolding for both a frontend react project and a backend django project.
Depending on the take home you have been given you may need only one or both.

The scaffolding has been created docker and docker-compose

## Prerequisites

Docker - [Download](https://www.docker.com/get-started)

## Running Project

```shell
$ docker-compose up
```

The backend Django service will be accessible from localhost:8000

The frontend react dev server will be accessible from localhost:3000

## Stopping Project

```shell
$ docker-compose down
```

## Rebuilding After Dependency Change

```shell
$ docker-compose build
```

## Running Commands In Backend

To run commands in a docker container with the proper python environment loaded you must
prepend '''pipenv run''' to the docker-compose run command

```shell
$ docker-compose run backend pipenv run backend/manage.py show_urls
```
