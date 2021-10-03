FROM node:16
WORKDIR /app
COPY package.json ./
COPY ./ ./
EXPOSE 5000
RUN npm install
CMD [ "npm", "run", "start" ]
