FROM node:alpine AS prod

WORKDIR /app

COPY ./config/prod/.env ./
COPY ./client/build ./public
COPY ./server/dist ./dist
COPY ./server/package.json ./package.json

RUN npm install --only=prod

EXPOSE 80

CMD ["npm", "start"]
