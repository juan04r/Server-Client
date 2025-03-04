const express = require('express');
const multer = require('multer');
const pool = require('../config/db'); // Importar la configuración de la base de datos
const router = express.Router();

// Configurar Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: process.env.UPLOAD_DIR, // Directorio donde se guardarán los archivos subidos
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Renombrar el archivo para evitar colisiones
  },
});
const upload = multer({ storage });

// Ruta para subir archivos
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { filename, path } = req.file; // Obtener el nombre y la ruta del archivo subido
    await pool.query('INSERT INTO files (name, path) VALUES ($1, $2)', [filename, path]); // Guardar en la base de datos
    res.status(201).json({ message: 'Archivo subido', filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir el archivo' });
  }
});

// Ruta para listar archivos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM files'); // Consultar todos los archivos en la base de datos
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los archivos' });
  }
});

// Exportar el router para que pueda ser utilizado en index.js
module.exports = router;