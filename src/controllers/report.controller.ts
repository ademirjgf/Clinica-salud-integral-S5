import type { Request, Response } from "express"
import {
  getAppointmentsBySpecialty,
  getDailyCutoff
} from "../models/report.model.js"

export async function getAppointmentsBySpecialtyController(
  _req: Request,
  res: Response
) {
  try {
    const report = await getAppointmentsBySpecialty()

    return res.status(200).json(report)
  } catch {
    return res.status(500).json({
      message: "Error al generar el reporte por especialidad"
    })
  }
}

export async function getDailyCutoffController(
  req: Request,
  res: Response
) {
  try {
    const date = req.query.date as string

    const report = await getDailyCutoff(date)

    return res.status(200).json(report)
  } catch {
    return res.status(500).json({
      message: "Error al generar el corte operativo diario"
    })
  }
}