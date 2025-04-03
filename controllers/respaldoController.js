const respaldoService = require('../services/respaldoService');

const createRespaldo = async (req, res) => {
  const { totalMachos, totalHembras, detalleMachos, detalleHembras, estadoAnimales } = req.body;

  try {
    const respaldo = await respaldoService.createRespaldo({
      totalMachos,
      totalHembras,
      detalleMachos,
      detalleHembras,
      estadoAnimales
    });
    res.status(201).json({
      message: 'Respaldo creado exitosamente',
      respaldo
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRespaldos = async (req, res) => {
  try {
    const respaldos = await respaldoService.getRespaldos();
    const respuesta = respaldos.map((respaldo) => ({
      idRespaldo: respaldo._id.toString(),
      fechaRespaldo: respaldo.createdAt.getTime() / 1000,
      respaldo
    }));

    res.json({ respaldos: respuesta });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRespaldo,
  getRespaldos
};
