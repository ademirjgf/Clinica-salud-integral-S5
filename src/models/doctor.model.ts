import prisma from "../config/prisma.js"

export function getAllDoctors(specialtyName?: string) {
  return prisma.medico.findMany({
    where: specialtyName
      ? {
          especialidad: {
            nombre: {
              equals: specialtyName,
              mode: "insensitive"
            }
          }
        }
      : undefined,
    include: {
      especialidad: true
    },
    orderBy: {
      id: "asc"
    }
  })
}

export function getDoctorById(id: number) {
  return prisma.medico.findUnique({
    where: {
      id
    }
  })
}