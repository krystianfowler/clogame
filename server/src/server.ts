const PROTO_PATH = __dirname + '/proto/helloworld.proto'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const helloworld = protoDescriptor.helloworld

const doSayHello = (call: any, callback: any) => {
  callback(null, {
    message: 'Hello! ' + call.request.name,
  })
}

function getServer() {
  const server = new grpc.Server()
  // @ts-ignore
  server.addService(helloworld.Greeter.service, {
    sayHello: doSayHello,
  })
  return server
}

const server = getServer()
server.bindAsync(
  '0.0.0.0:9090',
  grpc.ServerCredentials.createInsecure(),
  (err: any, port: any) => {
    if (err) throw err
    server.start()
  }
)

exports.getServer = getServer
