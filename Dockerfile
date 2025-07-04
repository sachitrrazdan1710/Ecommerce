# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose backend port (changed to 5000 to avoid Jenkins conflict)
EXPOSE 5000

CMD ["node", "server.js"]
