import { Request, Response } from "express"
import { prisma } from "../models/models"
import { sendApiResponse } from "../utils/response"

interface CreateCategoryRequest {
  name: string
}

export const getAllcategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany()

    sendApiResponse(res, 200, categories, "categories retrieved successfully")
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
    sendApiResponse(res, 500, [], "Internal Server Error", [
      error.message || "Unexpected error",
    ])
  }
}
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body as CreateCategoryRequest

  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    })
    sendApiResponse(res, 200, category, "categories created successfully")
  } catch (error: any) {
    console.error(error)
    sendApiResponse(res, 500, [], "Internal Server Error", [
      error.message || "Unexpected error",
    ])
  }
}
