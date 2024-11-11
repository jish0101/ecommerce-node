import express from "express";
import { KEYS } from "../lib/keys";
import apiRoutes from "./api/routes";

const { API_ROUTE } = KEYS;
const router = express.Router();

router.use(API_ROUTE, apiRoutes);

export default router;
