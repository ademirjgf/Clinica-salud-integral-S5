import "dotenv/config"
import express from "express"
import prisma from "./config/prisma.js"

const app = express()

app.use(express.json())

app.get("/api/especialidades", async (_req, res) => {
  const especialidades = await prisma.especialidad.findMany({
    orderBy: {
      id: "asc"
    }
  })

  res.json(especialidades)
})

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})
