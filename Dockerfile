FROM python:3.7.7-buster as backend

RUN pip install pipenv

RUN mkdir -p /code/backend/
WORKDIR /code
ADD .env Pipfile Pipfile /code/
RUN pipenv install --dev

CMD pipenv run python backend/manage.py runserver 0.0.0.0:8000


FROM node:12-buster as frontend

RUN mkdir /code/
WORKDIR /code
ADD frontend/package.json frontend/package-lock.json /code/
RUN npm install

CMD npm start
