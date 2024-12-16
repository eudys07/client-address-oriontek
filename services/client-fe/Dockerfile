# Base image for Node.js
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port for the React app
EXPOSE 3000

# Serve the build using a simple HTTP server
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
