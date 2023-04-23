import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { roomRouter } from "./routes/UserRoutes.js";
import {bookedroomRouter} from "./routes/UserRoutes.js";
import {customerRouter} from "./routes/UserRoutes.js";
import cors from "cors";
dotenv.config();
console.log(process.env.MONGO_URL);
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
export const client = await createConnection();
app.get("/", function (request, response) {     //api endpoint for viewing welcome to hall booking
    response.send("Welcome to hall booking");
});

app.use('/room', roomRouter)
app.use('/bookedrooms',bookedroomRouter)
app.use('/customers',customerRouter)
app.listen(PORT, () => console.log(`App started in ${PORT}`));
