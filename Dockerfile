FROM node:10.16.3-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp git python make g++ \
  && npm install \
  && apk del .gyp git

COPY . .

EXPOSE 2000

CMD ["npm", "run", "serve"]