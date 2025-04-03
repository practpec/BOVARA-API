import { Ganado } from "../models/ganado.js"
import { Crianza } from "../models/crianza.js"
import { Medicamento } from "../models/medicamento.js"

export const syncAllData = async (req, res) => {
  try {
    const { ganado = [], crianza = [], medicamentos = [] } = req.body

    const results = {
      ganado: { created: 0, updated: 0, errors: [] },
      crianza: { created: 0, updated: 0, errors: [] },
      medicamentos: { created: 0, updated: 0, errors: [] },
    }

    for (const animal of ganado) {
      try {
        const animalData = { ...animal, originalId: animal.id }
        delete animalData._id

        const existingAnimal = await Ganado.findOne({ originalId: animal.id })

        if (existingAnimal) {
          await Ganado.updateOne({ originalId: animal.id }, animalData)
          results.ganado.updated++
        } else {
          await Ganado.create(animalData)
          results.ganado.created++
        }
      } catch (error) {
        results.ganado.errors.push({ id: animal.id, error: error.message })
      }
    }

    for (const registro of crianza) {
      try {
        const registroData = { ...registro, originalId: registro.id }
        delete registroData._id

        const existingRegistro = await Crianza.findOne({ originalId: registro.id })

        if (existingRegistro) {
          await Crianza.updateOne({ originalId: registro.id }, registroData)
          results.crianza.updated++
        } else {
          await Crianza.create(registroData)
          results.crianza.created++
        }
      } catch (error) {
        results.crianza.errors.push({ id: registro.id, error: error.message })
      }
    }

    for (const medicamento of medicamentos) {
      try {
        const medicamentoData = { ...medicamento, originalId: medicamento.id }
        delete medicamentoData._id

        const existingMedicamento = await Medicamento.findOne({ originalId: medicamento.id })

        if (existingMedicamento) {
          await Medicamento.updateOne({ originalId: medicamento.id }, medicamentoData)
          results.medicamentos.updated++
        } else {
          await Medicamento.create(medicamentoData)
          results.medicamentos.created++
        }
      } catch (error) {
        results.medicamentos.errors.push({ id: medicamento.id, error: error.message })
      }
    }

    res.status(200).json({
      success: true,
      message: "Sincronización completada",
      results,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la sincronización",
      error: error.message,
    })
  }
}

export const getVaccinationReport = async (req, res) => {
  try {
    const ganado = await Ganado.find()

    const reporteVacunas = []

    for (const animal of ganado) {
      const medicamentos = await Medicamento.find({
        ganadoId: animal.originalId,
        aplicado: 1,
      }).sort({ fechaAplicacion: 1 })

      if (medicamentos.length === 0) {
        continue 
      }
      const vacunasPorTipo = {}

      medicamentos.forEach((med) => {
        if (!vacunasPorTipo[med.nombre]) {
          vacunasPorTipo[med.nombre] = {
            cantidad: 0,
            primeraAplicacion: null,
            ultimaAplicacion: null,
          }
        }

        vacunasPorTipo[med.nombre].cantidad++

  
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
          id: animal.originalId,
          numeroArete: animal.numeroArete,
          apodo: animal.apodo,
          tipo: animal.tipo,
        },
        vacunas: vacunasPorTipo,
      })
    }

    res.json({
      success: true,
      data: reporteVacunas,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al generar el reporte",
      error: error.message,
    })
  }
}

