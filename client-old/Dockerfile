# Use Node image as base
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Your usual build steps
COPY . .

# This will run the build script
RUN npm run build

# Install http-server globally
RUN npm install -g http-server

# Run http-server on port 8081
CMD ["http-server", "-p", "8081"]
