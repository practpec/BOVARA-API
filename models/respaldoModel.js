const mongoose = require('mongoose');

const respaldoSchema = new mongoose.Schema({
  totalMachos: Number,
  totalHembras: Number,
  detalleMachos: {
    becerro: Number,
    torito: Number,
    toro: Number
  },
  detalleHembras: {
    becerra: Number,
    vaca: Number
  },
  estadoAnimales: {
    activos: Number,
    muertos: Number,
    vendidos: Number
  }
}, { timestamps: true });

const Respaldo = mongoose.model('Respaldo', respaldoSchema);

module.exports = Respaldo;
