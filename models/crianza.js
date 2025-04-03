import mongoose from "mongoose"

const crianzaSchema = new mongoose.Schema(
  {
    originalId: { type: Number, required: true },
    madreId: { type: Number, required: true },
    criaId: { type: Number, required: true },
    fechaNacimiento: { type: Number, required: true },
    notas: String,
    fechaRegistro: { type: Number, required: true },
  },
  { timestamps: true },
)

crianzaSchema.index({ originalId: 1 }, { unique: true })

export const Crianza = mongoose.model("Crianza", crianzaSchema)

