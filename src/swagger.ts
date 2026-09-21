import swaggerAutogen from "swagger-autogen"

const doc = {
  info: {
    title: "Clínica Salud Integral API",
    version: "1.0.0",
    description: "API RESTful para la gestión de la Clínica Salud Integral"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
}

const outputFile = "./swagger-output.json"

const endpointsFiles = [
  "./src/index.ts"
]

const generateSwagger = swaggerAutogen({
  openapi: "3.0.0"
})

await generateSwagger(
  outputFile,
  endpointsFiles,
  doc
)

console.log("Documentación Swagger generada correctamente")