import { Router } from "express"
import {
  createAppointmentController,
  updateAppointmentStatusController
} from "../controllers/appointment.controller.js"
import {
  validateAppointment,
  validateAppointmentStatus
} from "../middlewares/validate-appointment.js"
import { verifyToken } from "../middlewares/auth.middleware.js"
import { authorize } from "../middlewares/authorize.middleware.js"

const router = Router()

router.post(
  "/",
  /* #swagger.security = [{ "bearerAuth": [] }] */
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateAppointment,
  createAppointmentController
)

router.patch(
  "/:id/status",
  /* #swagger.security = [{ "bearerAuth": [] }] */
  verifyToken,
  authorize("MEDICO"),
  validateAppointmentStatus,
  updateAppointmentStatusController
)

export default router