import express from "express"
import "dotenv/config"
import publicRoutes from "./routes/public.js"

const app = express()
app.use(express.json())

app.use("/account", publicRoutes)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
