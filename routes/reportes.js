import express from "express"
import { Medicamento } from "../models/medicamento.js"
import { Ganado } from "../models/ganado.js"

const router = express.Router()

router.get("/vacunas", async (req, res) => {
  try {

    const ganado = await Ganado.find()

    const reporteVacunas = []

    for (const animal of ganado) {

      const medicamentos = await Medicamento.find({
        ganadoId: animal.id,
        aplicado: 1,
      }).sort({ fechaAplicacion: 1 })

      if (medicamentos.length === 0) {
        continue
      }

      const vacunasPorTipo = {}

      medicamentos.forEach((med) => {
        if (!vacunasPorTipo[med.nombre]) {
          vacunasPorTipo[med.nombre] = {
            count: 0,
            primeraAplicacion: null,
            ultimaAplicacion: null,
            aplicaciones: [],
          }
        }

        vacunasPorTipo[med.nombre].count++
        vacunasPorTipo[med.nombre].aplicaciones.push({
          fecha: med.fechaAplicacion,
          dosis: med.dosisML,
          lote: med.lote,
          notas: med.notas,
        })


        if (
          !vacunasPorTipo[med.nombre].primeraAplicacion ||
          med.fechaAplicacion < vacunasPorTipo[med.nombre].primeraAplicacion
        ) {
          vacunasPorTipo[med.nombre].primeraAplicacion = med.fechaAplicacion
        }

        if (
          !vacunasPorTipo[med.nombre].ultimaAplicacion ||
          med.fechaAplicacion > vacunasPorTipo[med.nombre].ultimaAplicacion
        ) {
          vacunasPorTipo[med.nombre].ultimaAplicacion = med.fechaAplicacion
        }
      })

      reporteVacunas.push({
        animal: {
          id: animal.id,
          numeroArete: animal.numeroArete,
          apodo: animal.apodo,
          tipo: animal.tipo,
        },
        vacunas: vacunasPorTipo,
      })
    }

    res.json(reporteVacunas)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export const reportesRoutes = router

