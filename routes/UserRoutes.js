import express from "express";
import {controller} from "../controllers/UserControllers.js";
const router1=express.Router();
const router2=express.Router();
const router3=express.Router();
router1.post("/", controller.postroom);
router1.get("/", controller.getrooms);
router2.post("/", controller.postbookroom);
router2.put("/",controller.putstatus);
router2.get("/",controller.getbookedroom);
router3.get("/", controller.getcustomers);

export const roomRouter= router1;
export const bookedroomRouter= router2;
export const customerRouter= router3;