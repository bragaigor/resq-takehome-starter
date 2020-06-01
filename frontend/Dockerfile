FROM node:12-buster

RUN mkdir -p /code/frontend
WORKDIR /code/frontend
ADD package.json package-lock.json /code/frontend/
RUN npm install

CMD npm start
