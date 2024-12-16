# Stage 1: Build Stage
FROM node:18-alpine as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Runtime Stage
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only the production dependencies and the built files
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Expose the port your app runs on
EXPOSE 3001

# Command to run the app
CMD ["npm", "start"]
