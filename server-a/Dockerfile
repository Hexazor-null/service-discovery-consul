FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install express axios
COPY . .
CMD ["node", "index.js"]
