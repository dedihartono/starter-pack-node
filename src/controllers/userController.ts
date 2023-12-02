import { prisma, Role } from "../models/models"
import { Request, Response } from "express"
import { sendApiResponse } from "../utils/response"

interface CreateUserRequest {
  email: string
  name: string
  role: Role
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    sendApiResponse(res, 200, users, "users retrieved successfully")
  } catch (error: any) {
    console.error(error)
    sendApiResponse(res, 500, [], "Internal Server Error", [
      error.message || "Unexpected error",
    ])
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body as CreateUserRequest

  if (!Object.values(Role).includes(role)) {
    sendApiResponse(res, 400, [], "Invalid role value")
    return; 
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    })
    sendApiResponse(res, 200, user, "User created successfully")
  } catch (error: any) {
    console.error(error)
    sendApiResponse(res, 500, [], "Internal Server Error", [
      error.message || "Unexpected error",
    ])
  }
}
