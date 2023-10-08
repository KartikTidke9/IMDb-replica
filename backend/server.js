import { configDotenv } from "dotenv";
import jsonServer from "json-server";

configDotenv()
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middleware);
server.use(router);

server.listen(port, () => {
  console.log(`server is listeninga at port: ${port}`);
});
