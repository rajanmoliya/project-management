import { prisma } from "../utils/prisma.js";
import { AppError } from "../middleware/errorHandler.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, assignedUserId } = req.body;
    const projectId = req.params.id;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    if (project.userId !== req.user.id) {
      throw new AppError("Not authorized to create tasks in this project", 403);
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assignedUserId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { status, assignedUserId } = req.query;
    const { projectId } = req.params;

    const where = {
      projectId,
      ...(status && { status }),
      ...(assignedUserId && { assignedUserId }),
    };

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, assignedUserId } = req.body;
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    if (
      task.project.userId !== req.user.id &&
      task.assignedUserId !== req.user.id
    ) {
      throw new AppError("Not authorized to update this task", 403);
    }

    const updatedTask = await prisma.task.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        status,
        assignedUserId,
      },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    if (task.project.userId !== req.user.id) {
      throw new AppError("Not authorized to delete this task", 403);
    }

    await prisma.task.delete({
      where: { id: req.params.id },
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
