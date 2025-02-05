import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { createTask, getTasks } from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.route("/").post(createProject).get(getProjects);

router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

router.route("/:id/tasks").post(createTask).get(getTasks);

export default router;
