import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { readFileSync, writeFileSync } from "fs";

const packageDefinitions = protoLoader.loadSync("./grpc/proto/vodka.proto");
const proto = grpc.loadPackageDefinition(packageDefinitions);

const dataFilePath = "./data/alcoholData.json";

const loadData = () => {
  try {
    const data = JSON.parse(readFileSync(dataFilePath, "utf-8"));
    if (!data.vodkas) {
      console.error("Invalid data format: Missing vodkas collection");
      return { vodkas: [] };
    }
    return data;
  } catch (err) {
    console.error("Error loading data:", err);
    return { vodkas: [] };
  }
};

const saveData = (data) => {
  writeFileSync(dataFilePath, JSON.stringify({ vodkas: data.vodkas }, null, 2));
};

const data = loadData();
const vodkas = data.vodkas;

const server = new grpc.Server();

server.addService(proto.monopolowy.VodkaService.service, {
  ListVodkas: (call, callback) => {
    let result = vodkas;
    const { name, min_abv, max_abv, country } = call.request;

    if (name) result = result.filter((v) => v.name.includes(name));
    if (min_abv) result = result.filter((v) => v.abv >= min_abv);
    if (max_abv) result = result.filter((v) => v.abv <= max_abv);
    if (country) result = result.filter((v) => v.country === country);

    callback(null, { vodkas: result });
  },
  GetVodka: (call, callback) => {
    const vodka = vodkas.find((v) => v.id === call.request.id);
    if (!vodka) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Vodka not found",
      });
    }
    callback(null, { vodka });
  },
  CreateVodka: (call, callback) => {
    const newVodka = {
      id: vodkas.length > 0 ? Math.max(...vodkas.map((v) => v.id)) + 1 : 1,
      ...call.request,
      createdAt: new Date(),
    };
    vodkas.push(newVodka);
    saveData({ vodkas });
    callback(null, newVodka);
  },
  UpdateVodka: (call, callback) => {
    const index = vodkas.findIndex((v) => v.id === call.request.id);
    if (index === -1) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Vodka not found",
      });
    }
    vodkas[index] = { ...vodkas[index], ...call.request };
    saveData({ vodkas });
    callback(null, vodkas[index]);
  },
  DeleteVodka: (call, callback) => {
    const index = vodkas.findIndex((v) => v.id === call.request.id);
    if (index === -1) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Vodka not found",
      });
    }
    vodkas.splice(index, 1);
    saveData({ vodkas });
    callback(null, {});
  },
});

server.bindAsync("127.0.0.1:9090", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Server running at http://127.0.0.1:9090");
  server.start();
});
