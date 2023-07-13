FROM node:18

WORKDIR /usr/src/app/frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001
CMD [ "node", "server.js" ]