const express = require("express");
const cors = require("cors");

const videoCall = require("./routes/videoCalls");
const corsOptions = {
  origin: "http://svelte-live-kit.vercel.app/", // Ganti dengan URL yang diperbolehkan
};
const app = express();
app.use(cors(corsOptions));
const port = 3000;

app.use(express.json());
app.use("/api", videoCall);

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
