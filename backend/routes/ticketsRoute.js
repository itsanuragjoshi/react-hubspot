import express from "express";
import { getTickets } from "../controllers/ticketsController.js";

const router = express.Router();

router.get("/", getTickets);

export default router;
