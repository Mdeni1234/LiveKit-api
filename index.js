const express = require("express");
const cors = require('cors')

const videoCall = require("./routes/videoCalls");

const app = express();
app.use(cors())
const port = 3000;

app.use(express.json());
app.use("/api", videoCall);

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
