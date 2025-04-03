import express from "express"
import { Ganado } from "../models/ganado.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const ganado = await Ganado.find()
    res.json(ganado)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/sync", async (req, res) => {
  try {
    const ganadoData = req.body

    if (!Array.isArray(ganadoData)) {
      return res.status(400).json({ message: "Se espera un array de datos" })
    }

    const results = []

    for (const animal of ganadoData) {
      const existingAnimal = await Ganado.findOne({ id: animal.id })

      if (existingAnimal) {

        const updated = await Ganado.findOneAndUpdate({ id: animal.id }, animal, { new: true })
        results.push({ action: "updated", data: updated })
      } else {
        const newAnimal = new Ganado(animal)
        const saved = await newAnimal.save()
        results.push({ action: "created", data: saved })
      }
    }

    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export const ganadoRoutes = router

