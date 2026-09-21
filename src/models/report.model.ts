import prisma from "../config/prisma.js"

export type AppointmentsBySpecialtyRow = {
  especialidad: string
  total_citas: number
}

export function getAppointmentsBySpecialty() {
  return prisma.$queryRaw<AppointmentsBySpecialtyRow[]>`
    SELECT
      e.nombre AS especialidad,
      COUNT(c.id)::int AS total_citas
    FROM citas c
    INNER JOIN medicos m
      ON m.id = c.medico_id
    INNER JOIN especialidades e
      ON e.id = m.especialidad_id
    GROUP BY e.nombre
    ORDER BY total_citas DESC
  `
}
export async function getDailyCutoff(date: string) {
  const startOfDay = new Date(`${date}T00:00:00`)
  const endOfDay = new Date(`${date}T23:59:59`)

  return prisma.cita.groupBy({
    by: ["estado"],
    where: {
      fechaHora: {
        gte: startOfDay,
        lte: endOfDay
      },
      estado: {
        in: ["COMPLETADA", "CANCELADA"]
      }
    },
    _count: {
      estado: true
    }
  })
}