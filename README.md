# ResQ Take-home Template

This project has scaffolding for both a frontend react project and a backend django project.
Depending on the take home you have been given you may need only one or both.

The scaffolding has been created docker and docker-compose

## Must run frontend and backend separately 
##### In one terminal
```
cd frontend
npm start
```
##### In another terminal run the backend
```
cd backend
python3 manage.py runserver
```

#### Frontend and backend available at URLs below

## APIs

### GET :: Request work order by facility name:
http://127.0.0.1:8000/facility/facility_name
### GET :: Request work order by title:
http://127.0.0.1:8000/title/name

### GET :: Request all work order items
http://127.0.0.1:8000/title
http://127.0.0.1:8000/facility

### POST :: Insert new work order (must set up body properly)
http://127.0.0.1:8000/newWork
#### E.g. of body
```
{
    "title": "title here",
    "description": "description here",
    "facility": "facility here",
    "state": "status here"
}
```

### POST :: Updating work order by facility name (must set up body accordinly):
http://127.0.0.1:8000/facility/facility_name
### POST :: Updating work order by title (must set up body accordinly):
http://127.0.0.1:8000/title/title

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
