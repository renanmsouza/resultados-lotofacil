FROM node:lts-alpine
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

COPY *.json ./
COPY src ./src

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g @nestjs/cli
RUN npm install

RUN nest build
COPY dist ./dist

EXPOSE 3000

CMD ["npm","run","start:prod"]