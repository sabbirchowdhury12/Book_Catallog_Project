import express from "express";
import { CowController } from "./cow.controller";

const router = express.Router();

router.post("/", CowController.createCow);
router.get("/", CowController.getAllCows);
router.get("/:id", CowController.getSingleCow);
router.patch("/:id", CowController.updateCow);
router.delete("/:id", CowController.deleteCow);
export default router;
