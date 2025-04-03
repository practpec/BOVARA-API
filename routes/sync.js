import express from "express"
import { syncAllData, getVaccinationReport } from "../controllers/syncController.js"

const router = express.Router()

router.post("/sync", syncAllData)

router.get("/reportes/vacunas", getVaccinationReport)

export const syncRoutes = router

