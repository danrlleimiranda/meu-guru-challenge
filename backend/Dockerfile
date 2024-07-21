FROM node:20.11-alpine

WORKDIR /app-backend

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .
EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]

