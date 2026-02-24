FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY . .

ENV PORT=8080
ENV MONGODB_URL=mongodb://mongo:27017/dddb

EXPOSE 8080

CMD ["node", "server.js"]

