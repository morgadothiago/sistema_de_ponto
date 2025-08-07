import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../services/hashPassword.js"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

export const AccontsControllers = {
  async create(req, res) {
    const { name, email, password, isOnline, provider } = req.body

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (user) {
        return res.status(400).json({ message: "User already exists" })
      }

      const newData = await prisma.user.create({
        data: {
          id: uuidv4(),
          name,
          email,
          password: await hashPassword(password),
          isOnline,
          provider,
        },
      })

      return res
        .status(200)
        .json({ message: "Account created successfully", data: newData })
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating account", error: error.message })
    }
  },
  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany()

      return res
        .status(200)
        .json({ message: "Users fetched successfully", data: users })
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching users", error: error.message })
    }
  },
}
