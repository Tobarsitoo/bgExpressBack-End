const mongoose = require('mongoose');

const HamburguesaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  imagenUrl: String
});

module.exports = mongoose.model('Hamburguesa', HamburguesaSchema);
