import prisma from "../src/config/prisma.js"

async function main() {
  const datos = [
    {
      especialidad: "Cardiología",
      medicos: [
        { nombre: "Carlos", apellido: "Ramírez" },
        { nombre: "Ana", apellido: "Torres" }
      ]
    },
    {
      especialidad: "Pediatría",
      medicos: [
        { nombre: "Luis", apellido: "Mendoza" },
        { nombre: "María", apellido: "Vargas" }
      ]
    },
    {
      especialidad: "Dermatología",
      medicos: [
        { nombre: "Jorge", apellido: "Salazar" },
        { nombre: "Lucía", apellido: "Fernández" }
      ]
    }
  ]

  for (const item of datos) {
    const especialidad = await prisma.especialidad.upsert({
      where: {
        nombre: item.especialidad
      },
      update: {},
      create: {
        nombre: item.especialidad
      }
    })

    for (const medico of item.medicos) {
      const existe = await prisma.medico.findFirst({
        where: {
          nombre: medico.nombre,
          apellido: medico.apellido,
          especialidadId: especialidad.id
        }
      })

      if (!existe) {
        await prisma.medico.create({
          data: {
            nombre: medico.nombre,
            apellido: medico.apellido,
            especialidadId: especialidad.id
          }
        })
      }
    }
  }

  console.log("Seed ejecutado correctamente")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })