#!/bin/sh

# Generate JS files from proto
protoc -I=/usr/src/proto helloworld.proto \
  --js_out=import_style=commonjs:/usr/src/app \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:/usr/src/app

# List the files in the /usr/src/app directory
echo "Listing files in /usr/src/app:"
ls -al /usr/src/app

# Optionally, you can list the files in /usr/src/proto as well to ensure they are present
echo "Listing files in /usr/src/proto:"
ls -al /usr/src/proto

npm run build

http-server -p 8081
