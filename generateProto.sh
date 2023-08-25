#!/bin/bash

rm -r ./server/src/proto
rm -r ./client/proto

# Create the directories if they don't exist
mkdir -p ./proto/generated
mkdir -p ./server/src/proto
mkdir -p ./client/proto

# Run protoc on each .proto file
for f in ./proto/*.proto; do
  protoc -I=./proto $f --js_out=import_style=commonjs:./proto/generated --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto/generated --ts_out=./proto/generated
done

# Copy the .proto files and generated content to client and server folders (replace with your actual paths)
cp ./proto/*.proto ./server/src/proto/
cp ./proto/*.proto ./client/proto/
cp -r ./proto/generated/. ./server/src/proto/generated
cp -r ./proto/generated/. ./client/proto/generated

# Remove the generated directory
rm -r ./proto/generated
