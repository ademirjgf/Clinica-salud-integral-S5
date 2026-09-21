import { Router } from "express"
import {
  getAppointmentsBySpecialtyController,
  getDailyCutoffController
} from "../controllers/report.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js"
import { authorize } from "../middlewares/authorize.middleware.js"
import { validateDailyCutoffQuery } from "../middlewares/validate-report.js"

const router = Router()

router.get(
  "/appointments-by-specialty",
  /*
    #swagger.tags = ['Reportes']
    #swagger.summary = 'Total de citas agrupadas por especialidad'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  verifyToken,
  authorize("GERENCIA"),
  getAppointmentsBySpecialtyController
)

router.get(
  "/daily-cutoff",
  /*
    #swagger.tags = ['Reportes']
    #swagger.summary = 'Corte operativo diario de citas completadas y canceladas'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['date'] = {
      in: 'query',
      required: true,
      type: 'string',
      description: 'Fecha en formato YYYY-MM-DD',
      example: '2026-10-10'
    }
  */
  verifyToken,
  authorize("GERENCIA"),
  validateDailyCutoffQuery,
  getDailyCutoffController
)

export default router