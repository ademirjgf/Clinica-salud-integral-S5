import prisma from "../config/prisma.js"

export type CreatePatientData = {
  nombre: string
  apellido: string
  email: string
  fechaNacimiento: Date
}

export function createPatient(data: CreatePatientData) {
  return prisma.paciente.create({
    data
  })
}

export function getAllPatients() {
  return prisma.paciente.findMany({
    orderBy: {
      id: "asc"
    }
  })
}

export function getPatientById(id: number) {
  return prisma.paciente.findUnique({
    where: {
      id
    }
  })
}