import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB  from "./config/Db.js";
import packageRoute from "./route/packageRoute.js"

dotenv.config();

connectDB();

const app= express();

const PORT = process.env.PORT || 5000

//yo chai frontend ko port ra backend ko port aarkai xa vane use garnu parxa hameley
app.use(cors());


// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//route
app.use('/api',packageRoute);

app.get('/', (req, res) => {
    res.send("API is running....")
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})