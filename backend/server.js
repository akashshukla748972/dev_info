import http from "http";
import app from "./app.js";
import connectToDB from "./configs/db.js";
import global_variable from "./configs/config.js";

const server = http.createServer(app);
const PORT = global_variable.port;

connectToDB().then(() => {
  server.listen(PORT, () => {
    console.log(`server runnig on http://localhost:${PORT}`);
  });
});
