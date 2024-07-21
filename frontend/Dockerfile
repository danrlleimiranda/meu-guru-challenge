FROM node:20.11.0-alpine

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]