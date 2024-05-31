# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --only=production

# Copy the rest of your application's code
COPY . .

# Expose port 3000 to be accessible from the outside
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
