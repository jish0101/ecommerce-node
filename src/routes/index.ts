import express from "express";
import apiRoutes from "./api/routes";
import { KEYS } from "../lib/keys";

const router = express.Router();
const { API_ROUTE } = KEYS;

router.use(API_ROUTE, apiRoutes);

export default router;
