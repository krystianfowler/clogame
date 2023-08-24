# Use an official Node runtime as the base image
FROM node:18  

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install app dependencies
# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

RUN npm install

# Bundle the app source code inside the container
COPY . .

# The port your gRPC server will listen on
EXPOSE 9090

# Command to run the server
CMD [ "node", "server.js" ]
