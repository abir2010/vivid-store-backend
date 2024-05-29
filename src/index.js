const app = require("./app.js");
const connectDB = require("./config/db.js");
const { serverPort } = require("./secret.js");

app.listen(serverPort, async () => {
  console.log(`server is running at http://localhost:${serverPort}`);

  await connectDB();
});
