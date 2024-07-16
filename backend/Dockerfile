FROM node:20.11-alpine

WORKDIR /app-backend

COPY ./package*.json ./
RUN npm install --quite --no-optional --no-fund --loglevel=error

COPY . .
EXPOSE 3000


