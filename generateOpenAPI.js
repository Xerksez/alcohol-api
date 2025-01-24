import { writeFileSync } from "fs";
import swaggerSpec from "./config/swagger.js";

writeFileSync("./openapi.json", JSON.stringify(swaggerSpec, null, 2), "utf-8");
console.log("Specyfikacja OpenAPI zapisana jako openapi.json");
