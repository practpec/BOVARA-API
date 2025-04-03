import express from "express"
import { Medicamento } from "../models/medicamento.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const medicamentos = await Medicamento.find()
    res.json(medicamentos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/sync", async (req, res) => {
  try {
    const medicamentosData = req.body

    if (!Array.isArray(medicamentosData)) {
      return res.status(400).json({ message: "Se espera un array de datos" })
    }

    const results = []

    for (const medicamento of medicamentosData) {
      const existingMedicamento = await Medicamento.findOne({ id: medicamento.id })

      if (existingMedicamento) {
        const updated = await Medicamento.findOneAndUpdate({ id: medicamento.id }, medicamento, { new: true })
        results.push({ action: "updated", data: updated })
      } else {
        const newMedicamento = new Medicamento(medicamento)
        const saved = await newMedicamento.save()
        results.push({ action: "created", data: saved })
      }
    }

    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export const medicamentosRoutes = router

