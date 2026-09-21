import type { Request, Response } from "express"
import {
  createPatient,
  getAllPatients,
  getPatientById
} from "../models/patient.model.js"

export async function createPatientController(req: Request, res: Response) {
  const patient = await createPatient(req.body)

  return res.status(201).json(patient)
}

export async function getAllPatientsController(
  _req: Request,
  res: Response
) {
  const patients = await getAllPatients()

  return res.status(200).json(patients)
}

export async function getPatientByIdController(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "El id del paciente debe ser numérico"
    })
  }

  const patient = await getPatientById(id)

  if (!patient) {
    return res.status(404).json({
      error: "Paciente no encontrado"
    })
  }

  return res.status(200).json(patient)
}
