import type { NextFunction, Request, Response } from "express"
import { z } from "zod"

export const patientSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("El correo no tiene un formato válido"),
  fechaNacimiento: z.coerce
    .date()
    .max(new Date(), "La fecha de nacimiento no puede ser futura")
})

export function validatePatient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = patientSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: result.error.issues.map((issue) => issue.message)
    })
  }

  req.body = result.data
  next()
}
