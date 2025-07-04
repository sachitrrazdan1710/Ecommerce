# Use official Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./

# Force a clean install of node modules inside container
RUN npm install

# Copy the rest of the application
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
