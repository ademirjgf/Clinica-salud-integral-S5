import prisma from "../config/prisma.js"

export type CreateAppointmentData = {
  pacienteId: number
  medicoId: number
  fechaHora: Date
}

export function createAppointment(data: CreateAppointmentData) {
  return prisma.cita.create({
    data
  })
}

export function getDoctorAgenda(
  medicoId: number,
  from?: Date,
  to?: Date
) {
  return prisma.cita.findMany({
    where: {
      medicoId,
      ...(from && to
        ? {
            fechaHora: {
              gte: from,
              lte: to
            }
          }
        : {})
    },
    include: {
      paciente: true
    },
    orderBy: {
      fechaHora: "asc"
    }
  })
}

export function updateAppointmentStatus(
  id: number,
  estado: "COMPLETADA" | "CANCELADA"
) {
  return prisma.cita.update({
    where: {
      id
    },
    data: {
      estado
    }
  })
}