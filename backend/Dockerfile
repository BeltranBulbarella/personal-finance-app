# Use the official Node.js runtime as a parent image
FROM node:18.18.0

# Install netcat-openbsd, used in the entrypoint script
RUN apt-get update && apt-get install -y netcat-openbsd

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy the entrypoint script into the container and make it executable
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Build the application
RUN npm run build

# Make port 3000 available outside this container
EXPOSE 3000

# Set the entrypoint script to run on container start
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# Command to run your app (this can be overridden by docker-compose)
CMD ["node", "dist/main"]
