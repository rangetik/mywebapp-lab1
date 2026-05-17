FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY src ./src
COPY config ./config

EXPOSE 5200

CMD ["sh", "-c", "node src/db/migrate.js && node src/app.js"]