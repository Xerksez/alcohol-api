import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinitions = protoLoader.loadSync("./proto/vodka.proto");
const proto = grpc.loadPackageDefinition(packageDefinitions);

const client = new proto.monopolowy.VodkaService("127.0.0.1:9090", grpc.credentials.createInsecure());

// Przykład wywołania ListVodkas
client.ListVodkas({ name: "Belvedere", min_abv: 20 }, (err, response) => {
  if (err) {
    console.error("Error:", err.details);
  } else {
    console.log("Vodkas:", response.vodkas);
  }
});

// Przykład stworzenia nowej wódki
client.CreateVodka(
  {
    name: "Luxury Vodka",
    type: "Premium",
    abv: 42,
    country: "France",
    details: {
      distillery: "Luxury Distillery",
      year: 2023,
    },
  },
  (err, response) => {
    if (err) {
      console.error("Error:", err.details);
    } else {
      console.log("Created vodka:", response);
    }
  }
);
