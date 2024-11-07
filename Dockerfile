FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --ci
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "build-start"]