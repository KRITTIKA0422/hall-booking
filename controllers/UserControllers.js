import { createrooms, listingrooms, bookingrooms, addbookedstatus, bookedrooms, customersbooked } from "../models/UserModels.js";
export const controller={
    post: async function (request, response) {   //api endpoint for creating rooms
        const data = request.body;
        console.log(data);
        const result = await createrooms(data);
        console.log(result);
        response.send(result);
    },

    get: async function(request, response) {     //api endpoint for listing all rooms
    const rooms = await listingrooms(request) ;
    console.log(rooms);
    response.send(rooms);
},
post: async function (request, response) {      //api endpoint for booking rooms
    const data = request.body;
    console.log(data);
    const result = await bookingrooms(data);
    console.log(result);
    response.send(result);
},
put: async function (request, response) {       //api for adding booked_status
    const data=request.body;
    console.log(data);
    const result = await addbookedstatus(data);
    console.log(result);
   response.send(result);
},
get: async function (request, response) {     //api endpoint for listing all rooms with booked data
    const bookedroom = await bookedrooms(request);
    console.log(bookedroom);
    response.send(bookedroom);
},
get: async function (request, response) {      //api endpoint for listing all customers with booked data
    const roomsofcustomers = await customersbooked();
    console.log(roomsofcustomers);
    response.send(roomsofcustomers);
}
};