import { client } from "../index.js";

export async function createrooms(data) {
    return await client.db("hall_booking").collection("room").insertMany(data);
}

export async function listingrooms(request) {
    return await client.db("hall_booking").collection("room").find(request.query).toArray();
}
export async function bookingrooms(data) {
return await client.db("hall_booking").collection("customer_room").insertMany(data);
}
export async function addbookedstatus(data) {
    return await client.db("hall_booking").collection("customer_room").updateMany({},{$set:data});
}
export async function bookedrooms(request) {
return await client.db("hall_booking").collection("customer_room").find(request.query).toArray();
}
export async function customersbooked() {
return await client.db("hall_booking").collection("customer_room").find({},{"booked_status":0}).toArray();
}