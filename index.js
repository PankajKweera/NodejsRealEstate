const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

// const twilio = require('twilio');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8000;

const connectDb = require("./utils/db");

const authroute = require("./server/auth-router");

const landroute = require("./server/land-router");

const adminroute = require("./server/admin-router");

const agentroute = require("./server/agent-router");

const userroute = require("./server/user-router");

const { authUser, authAgent, authAdmin } = require("./middleware/auth");

// const authPhone = require('./firrr/authPhone')

app.use("/api/auth", authroute);

app.use("/api/auth/land", landroute);

app.use("/api/auth/user", authUser, userroute);

app.use("/api/auth/agent", authAgent, agentroute);

app.use("/api/auth/admin", authAdmin, adminroute);


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`);
  });
});
