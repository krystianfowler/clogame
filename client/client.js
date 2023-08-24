const { HelloRequest, HelloReply } = require('../server/helloworld_pb.js')
const { GreeterClient } = require('../server/helloworld_grpc_web_pb.js')

var client = new GreeterClient('http://localhost:8080')

var request = new HelloRequest()
request.setName('World')

client.sayHello(request, {}, (err, response) => {
  console.log(response.getMessage())
})
