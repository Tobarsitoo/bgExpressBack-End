const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'El correo ya está registrado' });

    const hashed = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({ nombre, email, contraseña: hashed, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, usuario: { nombre: usuario.nombre, rol: usuario.rol } });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en login', error: err.message });
  }
};
