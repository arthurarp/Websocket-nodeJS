FROM node:16

COPY . .

RUN yarn install

CMD ["yarn", "dev"]