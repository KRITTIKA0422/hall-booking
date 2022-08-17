import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
const client = await createConnection();
app.get("/", function (request, response) {
    response.send("Welcome to our app");
});
app.get("/movies/:id", async function (request, response) {
    const { id } = request.params;
    console.log(request.params, id);
    const movie = await client.db("app_movie").collection("movies").findOne({ id: id });
    console.log(movie);
    movie ? response.send(movie) : response.send({ msg: "Movie not found" });
});

app.post("/movies", async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await client.db("app_movie").collection("movies").insertMany(data);
    console.log(result);
    response.send(result);
});
app.put("/movies/:id", async function (request, response) {
    const { id } = request.params;
    const data=request.body;
    console.log(data);
    const result = await client.db("app_movie").collection("movies").updateOne({ id: id },{$set:data});
    console.log(result);
  response.send(result);
});
app.get("/movies", async function (request, response) {
    if(request.query.rating){
        request.query.rating=+request.query.rating;
    }
    console.log(request.query);
    const movies = await client.db("app_movie").collection("movies").find(request.query).toArray();
    response.send(movies);
});
app.delete("/movies/:id", async function (request, response) {
    const { id } = request.params;
    console.log(request.params, id);
    const result = await client.db("app_movie").collection("movies").deleteOne({ id: id });
    console.log(result);
    result.deletedCount>0 ? response.send({msg:"Movie deleted successfully"}) : response.send({ msg: "Movie not found" });
});
app.listen(PORT, () => console.log(`App started in ${PORT}`));
