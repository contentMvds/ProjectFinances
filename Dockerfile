FROM node:12.18.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 4000

CMD ["npm", "start"]