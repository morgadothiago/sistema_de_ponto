export const AccontsControllers = {
  async create(req, res) {
    const { name, email, password, isOnline, provider } = req.body

    const newData = {
      name,
      email,
      password,
      isOnline,
      provider,
    }

    return res.status(200).json({ message: "Hello World", data: newData })
  },
  async users(req, res) {
    return res.status(200).json({ message: "Hello World" })
  },
}
