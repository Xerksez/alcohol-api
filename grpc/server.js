import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinitions = protoLoader.loadSync('./grpc/proto/alcohol.proto');
const proto = grpc.loadPackageDefinition(packageDefinitions);

const server = new grpc.Server();

server.addService(proto.monopolowy.AlcoholService.service,{
    GetAlcohol:(req,res)=>{
        res(null, {
            alcoholId: 0,
            name: "vodka",
            abv: 40
        });
    }
});

server.bindAsync("127.0.0.1:9090", grpc.ServerCredentials.createInsecure(),(err) => console.log(err));