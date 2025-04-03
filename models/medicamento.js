import mongoose from "mongoose"

const medicamentoSchema = new mongoose.Schema(
  {
    originalId: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaAplicacion: { type: Number, required: true },
    dosisML: { type: Number, required: true },
    ganadoId: Number,
    tipo: { type: String, required: true },
    esProgramado: { type: Number, required: true },
    lote: String,
    aplicado: { type: Number, required: true },
    fechaProgramada: Number,
    recordatorio: { type: Number, required: true },
    notas: String,
  },
  { timestamps: true },
)

medicamentoSchema.index({ originalId: 1 }, { unique: true })

export const Medicamento = mongoose.model("Medicamento", medicamentoSchema)

