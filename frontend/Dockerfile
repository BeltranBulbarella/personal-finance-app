# Use an official Node runtime as a parent image
FROM node:18.17.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for better cache utilization in Docker layers
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the Next.js app
RUN npm run build

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define the command to run your app using npm start (adjust according to your package.json)
CMD ["npm", "start", "--", "-p", "3001"]
