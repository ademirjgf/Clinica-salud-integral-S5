import type { NextFunction, Request, Response } from "express"
import { z } from "zod"

export const appointmentSchema = z.object({
  pacienteId: z.number().int().positive(),
  medicoId: z.number().int().positive(),
  fechaHora: z.coerce.date().refine(
    (fecha) => fecha >= new Date(),
    "No puedes agendar una cita en una fecha que ya pasó"
  )
})

export const appointmentStatusSchema = z.object({
  estado: z.enum(["COMPLETADA", "CANCELADA"])
})

export function validateAppointment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = appointmentSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: result.error.issues.map((issue) => issue.message)
    })
  }

  req.body = result.data
  next()
}

export function validateAppointmentStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = appointmentStatusSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: result.error.issues.map((issue) => issue.message)
    })
  }

  req.body = result.data
  next()
}