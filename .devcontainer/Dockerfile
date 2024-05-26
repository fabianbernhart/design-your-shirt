# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /workspace

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
