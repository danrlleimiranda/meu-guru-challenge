FROM node:20.11.0-alpine

WORKDIR /app-frontend

COPY package*.json ./

RUN npm ci --quite --no-optional --no-fund --loglevel=error

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]