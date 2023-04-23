import express from "express";
import {controller} from "../controllers/UserControllers.js";
const router1=express.Router();
const router2=express.Router();
const router3=express.Router();
router1.post("/", controller.post);
router1.get("/", controller.get);
router2.post("/", controller.post);
router2.put("/",controller.put);
router2.get("/",controller.get);
router3.get("/", controller.get);

export const roomRouter= router1;
export const bookedroomRouter= router2;
export const customerRouter= router3;