FROM bitnami/node:20.11.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]