FROM python:3.7.7-buster

RUN pip install pipenv

RUN mkdir -p /code/backend/
WORKDIR /code/backend/
ADD .env Pipfile Pipfile.lock /code/backend/
RUN pipenv sync --dev

CMD pipenv run python manage.py runserver 0.0.0.0:8000
