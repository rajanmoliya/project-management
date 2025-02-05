import { prisma } from '../utils/prisma.js';
import { AppError } from '../middleware/errorHandler.js';

export const createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId: req.user.id
      }
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      include: {
        tasks: true
      }
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        tasks: true
      }
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (project.userId !== req.user.id) {
      throw new AppError('Not authorized to access this project', 403);
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    const project = await prisma.project.findUnique({
      where: { id: req.params.id }
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (project.userId !== req.user.id) {
      throw new AppError('Not authorized to update this project', 403);
    }

    const updatedProject = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        status
      }
    });

    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id }
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (project.userId !== req.user.id) {
      throw new AppError('Not authorized to delete this project', 403);
    }

    await prisma.project.delete({
      where: { id: req.params.id }
    });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};