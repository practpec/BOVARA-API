const Respaldo = require('../models/respaldoModel');


const createRespaldo = async (data) => {
  try {
    const respaldo = new Respaldo(data);
    await respaldo.save();
    return respaldo;
  } catch (error) {
    throw new Error('Error al crear el respaldo: ' + error.message);
  }
};

const getRespaldosByDeviceId = async (deviceId) => {
  try {
    const respaldos = await Respaldo.find({ deviceId });
    return respaldos;
  } catch (error) {
    throw new Error('Error al obtener los respaldos por deviceId: ' + error.message);
  }
};

module.exports = {
  createRespaldo,
  getRespaldosByDeviceId
};
