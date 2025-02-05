import { prisma } from "../utils/prisma.js";
import { AppError } from "../middleware/errorHandler.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (req.params.id !== req.user.id) {
      throw new AppError("Not authorized to update this user", 403);
    }

    const data = {
      name,
      email,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(password, salt);
    }

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id !== req.user.id) {
      throw new AppError("Not authorized to delete this user", 403);
    }

    await prisma.user.delete({
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
