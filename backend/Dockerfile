FROM node:20.11-alpine

WORKDIR /app-backend

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npx prisma migrate dev --name init


EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]
CMD ["start"]