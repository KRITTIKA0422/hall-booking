import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
const client = await createConnection();
app.get("/", function (request, response) {     //api endpoint for viewing welcome to hall booking
    response.send("Welcome to hall booking");
});
app.post("/room", async function (request, response) {         //api endpoint for creating rooms
    const data = request.body;
    console.log(data);
    const result = await client.db("hall_booking").collection("room").insertMany(data);
    console.log(result);
    response.send(result);
});
app.post("/booking", async function (request, response) {      //api endpoint for booking rooms
    const data = request.body;
    console.log(data);
    const result = await client.db("hall_booking").collection("customer_room").insertMany(data);
    console.log(result);
    response.send(result);
});
app.put("/bookedrooms", async function (request, response) {       //api for adding booked_status
    const data=request.body;
    console.log(data);
    const result = await client.db("hall_booking").collection("customer_room").updateMany({},{$set:data});
    console.log(result);
   response.send(result);
});
app.get("/bookedrooms", async function (request, response) {     //api endpoint for listing all rooms with booked data
    const bookedrooms = await client.db("hall_booking").collection("customer_room").find(request.query).toArray();
    console.log(bookedrooms);
    response.send(bookedrooms);
});
app.get("/customers", async function (request, response) {      //api endpoint for listing all customers with booked data
    const roomsofcustomers = await client.db("hall_booking").collection("customer_room").find({},{"booked_status":0}).toArray();
    console.log(roomsofcustomers);
    response.send(roomsofcustomers);
});
app.listen(PORT, () => console.log(`App started in ${PORT}`));
