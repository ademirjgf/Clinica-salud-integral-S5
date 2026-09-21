import "dotenv/config"
import express from "express"
import prisma from "./config/prisma.js"
import patientRoutes from "./routes/patient.routes.js"
import doctorRoutes from "./routes/doctor.routes.js"
import authRoutes from "./routes/auth.routes.js"
import { readFileSync } from "node:fs"
import swaggerUi from "swagger-ui-express"
import { verifyToken } from "./middlewares/auth.middleware.js"
import { authorize } from "./middlewares/authorize.middleware.js"

const app = express()

const swaggerDocument = JSON.parse(
  readFileSync(
    new URL("./swagger-output.json", import.meta.url),
    "utf-8"
  )
)

app.use(express.json())

app.get(
  "/api/especialidades",
  /* #swagger.security = [{ "bearerAuth": [] }] */
  verifyToken,
  authorize("RECEPCIONISTA"),
  async (_req, res) => {
    const especialidades = await prisma.especialidad.findMany({
      orderBy: {
        id: "asc"
      }
    })

    res.json(especialidades)
  }
)

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)

app.use("/api/patients", patientRoutes)
app.use("/api/doctors", doctorRoutes)
app.use("/api/auth", authRoutes)

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})