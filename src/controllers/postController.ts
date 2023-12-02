import { prisma } from "../models/models"
import { Request, Response } from "express"
import { sendApiResponse } from "../utils/response"

interface CreatePostRequest {
  title: string
  content: string
  published: boolean
  authorId: number
  categoryIds: number[]
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        categories: true
      },
    })

    sendApiResponse(res, 200, posts, "Posts retrieved successfully")
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
    sendApiResponse(res, 500, [], "Internal Server Error", [
      error.message || "Unexpected error",
    ])
  }
}
export const createPost = async (req: Request, res: Response) => {
  const { title, content, published, authorId, categoryIds  } = req.body as CreatePostRequest

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
        categories: {
          connect: categoryIds.map((categoryId) => ({ id: categoryId })),
        },
      },
      include: {
        author: true,
        categories: true,
      },
    })
    sendApiResponse(res, 200, post, "Posts created successfully")
  } catch (error: any) {
    console.error(error)
    sendApiResponse(res, 500, [], "Internal Server Error", [
      error.message || "Unexpected error",
    ])
  }
}
