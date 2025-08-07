import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10

  const usersData = [
    {
      name: "Admin",
      email: "admin@email.com",
      password: await bcrypt.hash("admin123", saltRounds),
      isOnline: false,
      provider: "admin",
    },
  ]

  await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true, // evita erro caso e-mails já existam
  })
}

main()
  .then(() => {
    console.log("✅ Seed executado com sucesso.")
    prisma.$disconnect()
  })
  .catch((e) => {
    console.error("❌ Erro ao rodar o seed:", e)
    prisma.$disconnect()
    process.exit(1)
  })
