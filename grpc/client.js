import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinitions = protoLoader.loadSync('./proto/alcohol.proto');
const proto = grpc.loadPackageDefinition(packageDefinitions);

const client = new proto.monopolowy.AlcoholService("127.0.0.1:9090",grpc.ChannelCredentials.createInsecure());

client.GetAlcohol(null,(err,res)=>{
    console.log(res);
});