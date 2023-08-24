# Use Node image as base
FROM node:18

RUN apt-get update && apt-get install -y protobuf-compiler

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

RUN npm install -g protoc-gen-js protoc-gen-grpc-web http-server

# Your usual build steps
COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]