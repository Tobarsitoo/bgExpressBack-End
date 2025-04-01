const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  contraseña: String,
  rol: { type: String, default: 'usuario' }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
