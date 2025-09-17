import express from "express";
import connectDB from "./config/connectDB.js";
import logIn from "./routes/logIn.js";
import createAccount from "./routes/createAccount.js";
import ahp from "./routes/ahp_calculator.js"
import createDataPerson from "./routes/createDataPerson.js";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


app.use("/api", createAccount);
app.use("/api", logIn);
app.use("/api", ahp);
app.use("/api", createDataPerson);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
