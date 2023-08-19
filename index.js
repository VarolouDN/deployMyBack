const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const articleRouter = require("./routes/article.routes");
const userRouter = require("./routes/user.roures");
const cors = require("cors");
const app = express();
const corsParams = {
  origin: ["https://deploy-my-front.vercel.app/"],
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  credentials: true,
};
//app.use(cors(corsParams));
const PORT = /*config.get('SERVER_PORT')*/ process.env.SERVER_PORT || 5000;
const DB_URL =
  process.env.DB_URL ||
  "mongodb+srv://varolou:AF9KvMedLj90iHGd@artd.nqpcmly.mongodb.net/?retryWrites=true&w=majority"; /*"mongodb+srv://varolou:5gRLitUDwPmSmOAv@cloud.upwzkiy.mongodb.net/?retryWrites=true&w=majority"*/

app.use(express.json());
app.use("/api/auth",cors(), authRouter);
app.use("/api/article",cors(), articleRouter);
app.use("/api/user",cors(), userRouter);

const start = () => {
  try {
    mongoose.connect(/*config.get("DB_URL")*/ DB_URL);
    app.listen(PORT, () => {
      console.log(`Server works on PORT:${PORT} `);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
