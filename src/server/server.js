import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import logIn from "./routes/logIn.js";
import createAccount from "./routes/createAccount.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use("/api/createAccount", createAccount);
app.use("/api/logIn", logIn);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
