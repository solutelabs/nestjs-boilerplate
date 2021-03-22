#select base image
FROM node:12-alpine as base

#Set Working Directory
WORKDIR /usr/src/app

#Copy package.json file
COPY package.json ./

#Copy all the files
COPY . .

FROM base as production

ENV NODE_ENV=production

RUN npm install --production

FROM base as dev

ENV NODE_ENV=development

RUN npm install

RUN npm run build

#Start the app
CMD npm run start:prod