import "dotenv/config"
import express from "express"
import prisma from "./config/prisma.js"
import patientRoutes from "./routes/patient.routes.js"
import doctorRoutes from "./routes/doctor.routes.js"

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

app.use("/api/patients", patientRoutes)
app.use("/api/doctors", doctorRoutes)

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})