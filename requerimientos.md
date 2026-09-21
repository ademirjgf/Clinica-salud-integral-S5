# Levantamiento de Requerimientos — Clínica Salud Integral

## 1. Entidades principales

A partir del caso de negocio se identificaron las siguientes entidades principales:

- Especialidad
- Médico
- Paciente
- Cita

## 2. Entidades y atributos

### Especialidad

Esta entidad representa las distintas áreas médicas disponibles en la clínica.

| Atributo | Tipo aproximado | Notas |
|---|---|---|
| id | Integer | [PK], Obligatorio |
| nombre | String | Único, Obligatorio |

---

### Médico

Representa a los médicos que trabajan en la clínica.

| Atributo | Tipo aproximado | Notas |
|---|---|---|
| id | Integer | [PK], Obligatorio |
| nombre | String | Obligatorio |
| apellido | String | Obligatorio |
| especialidadId | Integer | [FK], Obligatorio |

Cada médico pertenece a una especialidad médica.

---

### Paciente

personas registradas para recibir atención médica.

| Atributo | Tipo aproximado | Notas |
|---|---|---|
| id | Integer | [PK], Obligatorio |
| nombre | String | Obligatorio |
| apellido | String | Obligatorio |
| email | String | Único, Obligatorio |
| fechaNacimiento | DateTime | Obligatorio |
| fechaRegistro | DateTime | Obligatorio |

Reglas

- El correo electrónico debe tener un formato válido.
- La fecha de nacimiento no puede estar en el futuro.
- El sistema debe permitir consultar los datos del paciente junto con el historial completo de sus citas.

---

### Cita

atención programada entre un paciente y un médico.

| Atributo | Tipo aproximado | Notas |
|---|---|---|
| id | Integer | [PK], Obligatorio |
| fechaHora | DateTime | Obligatorio |
| estado | Enum | Obligatorio |
| pacienteId | Integer | [FK], Obligatorio |
| medicoId | Integer | [FK], Obligatorio |

Valores permitidos para `estado`:

- PROGRAMADA
- COMPLETADA
- CANCELADA

Reglas

- Una cita nueva debe crearse con estado `PROGRAMADA`.
- No se puede programar una cita en una fecha que ya pasó.
- El estado puede cambiar posteriormente a `COMPLETADA` o `CANCELADA`.
- Las citas deben poder consultarse por médico dentro de un rango de fechas.

---

## 3. Relaciones entre entidades

Un **Especialidad** puede tener muchos **Médicos**, pero un **Médico** pertenece a una sola **Especialidad**.

Un **Paciente** puede tener muchas **Citas**, pero una **Cita** pertenece a un solo **Paciente**.

Un **Médico** puede tener muchas **Citas**, pero una **Cita** pertenece a un solo **Médico**.

---

## 4. Requerimientos derivados para reportes

El modelo debe permitir obtener los siguientes reportes solicitados por Gerencia:

- Cantidad total de citas agrupadas por especialidad médica.
- Cantidad de citas `COMPLETADAS` en una fecha específica.
- Cantidad de citas `CANCELADAS` en una fecha específica.

La relación:

Especialidad → Médico → Cita

permitirá calcular el volumen de citas por especialidad.

El campo `fechaHora` de Cita junto con su `estado` permitirá generar el corte operativo diario.

---

## 5. Resumen del modelo relacional

Especialidad 1 ----- N Médico

Paciente     1 ----- N Cita

Médico       1 ----- N Cita