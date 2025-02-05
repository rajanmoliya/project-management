import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getTasks);

router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
