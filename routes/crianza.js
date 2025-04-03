import express from "express"
import { Crianza } from "../models/crianza.js"

const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const crianza = await Crianza.find()
    res.json(crianza)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/sync", async (req, res) => {
  try {
    const crianzaData = req.body

    if (!Array.isArray(crianzaData)) {
      return res.status(400).json({ message: "Se espera un array de datos" })
    }

    const results = []

    for (const record of crianzaData) {
    
      const existingRecord = await Crianza.findOne({ id: record.id })

      if (existingRecord) {
        const updated = await Crianza.findOneAndUpdate({ id: record.id }, record, { new: true })
        results.push({ action: "updated", data: updated })
      } else {
        const newRecord = new Crianza(record)
        const saved = await newRecord.save()
        results.push({ action: "created", data: saved })
      }
    }

    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export const crianzaRoutes = router

