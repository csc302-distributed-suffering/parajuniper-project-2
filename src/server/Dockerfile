FROM node:14
WORKDIR /app
COPY package.json ./
COPY ./ ./
EXPOSE 5000
RUN npm i
CMD [ "npm", "run", "start" ]
