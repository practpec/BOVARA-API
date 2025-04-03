import mongoose from "mongoose"

const ganadoSchema = new mongoose.Schema(
  {
    originalId: { type: Number, required: true },
    numeroArete: { type: String, required: true },
    apodo: String,
    sexo: { type: String, required: true },
    tipo: { type: String, required: true },
    color: { type: String, required: true },
    fechaNacimiento: Number,
    madreId: Number,
    cantidadCrias: { type: Number, required: true },
    estado: { type: String, required: true },
    imagenUrl: String,
    imagenesSecundarias: String,
    fechaRegistro: { type: Number, required: true },
  },
  { timestamps: true },
)

ganadoSchema.index({ originalId: 1 }, { unique: true })

export const Ganado = mongoose.model("Ganado", ganadoSchema)

