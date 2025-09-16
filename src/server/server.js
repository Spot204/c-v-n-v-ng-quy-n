import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import createAccount from "./routes/createAccount.js";
import ahp from "./routes/ahp_calculator.js"
import axios from "axios";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.use("/api/createAccount", createAccount);
app.use("/api", ahp);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
