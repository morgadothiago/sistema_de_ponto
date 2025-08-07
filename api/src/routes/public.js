import Router from "express"
import { AccontsControllers } from "../controllers/AccountsControllers.js"

const router = Router()

router.post("/create", AccontsControllers.create)
router.get("/users", AccontsControllers.getUsers)

export default router
