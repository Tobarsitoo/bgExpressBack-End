const Hamburguesa = require('../models/Hamburguesa');

exports.obtenerHamburguesas = async (req, res) => {
  try {
    const hamburguesas = await Hamburguesa.find();
    res.json(hamburguesas);
  } catch (err) {
    console.error('Error al obtener hamburguesas:', err);
    res.status(500).json({ mensaje: 'Error al obtener hamburguesas' });
  }
};

exports.crearHamburguesa = async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagenUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const nueva = new Hamburguesa({ nombre, descripcion, precio, imagenUrl });
    await nueva.save();
    res.status(201).json({ mensaje: 'Hamburguesa creada', hamburguesa: nueva });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear hamburguesa', error: err.message });
  }
};

exports.editarHamburguesa = async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagenUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const actualizada = await Hamburguesa.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        descripcion,
        precio,
        ...(imagenUrl && { imagenUrl })
      },
      { new: true }
    );

    res.json({ mensaje: 'Actualizada', hamburguesa: actualizada });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al editar', error: err.message });
  }
};

exports.eliminarHamburguesa = async (req, res) => {
  try {
    await Hamburguesa.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Hamburguesa eliminada' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar' });
  }
};
