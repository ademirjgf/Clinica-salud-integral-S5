import type { Request, Response } from "express"
import {
  createAppointment,
  getDoctorAgenda,
  updateAppointmentStatus
} from "../models/appointment.model.js"
import { getPatientById } from "../models/patient.model.js"
import { getDoctorById } from "../models/doctor.model.js"

export async function createAppointmentController(
  req: Request,
  res: Response
) {
  try {
    const { pacienteId, medicoId, fechaHora } = req.body

    const patient = await getPatientById(pacienteId)

    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado"
      })
    }

    const doctor = await getDoctorById(medicoId)

    if (!doctor) {
      return res.status(404).json({
        message: "Médico no encontrado"
      })
    }

    const appointment = await createAppointment({
      pacienteId,
      medicoId,
      fechaHora
    })

    return res.status(201).json(appointment)
  } catch {
    return res.status(500).json({
      message: "Error al agendar la cita"
    })
  }
}

export async function getDoctorAgendaController(
  req: Request,
  res: Response
) {
  const medicoId = Number(req.params.id)

  if (Number.isNaN(medicoId)) {
    return res.status(400).json({
      message: "El id del médico debe ser numérico"
    })
  }

  const { from, to } = req.query

  let fromDate: Date | undefined
  let toDate: Date | undefined

  if (typeof from === "string" && typeof to === "string") {
    fromDate = new Date(from)
    toDate = new Date(to)
  }

  const appointments = await getDoctorAgenda(
    medicoId,
    fromDate,
    toDate
  )

  return res.status(200).json(appointments)
}

export async function updateAppointmentStatusController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "El id de la cita debe ser numérico"
    })
  }

  const { estado } = req.body

  try {
    const appointment = await updateAppointmentStatus(
      id,
      estado
    )

    return res.status(200).json(appointment)
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Cita no encontrada"
      })
    }

    return res.status(500).json({
      message: "Error al actualizar el estado de la cita"
    })
  }
}