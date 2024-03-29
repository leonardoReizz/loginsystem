FROM node:16.16.0

WORKDIR /app


COPY package* ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "npm","run", "start" ]
