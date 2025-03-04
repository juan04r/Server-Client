require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configurar PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Configurar Multer para subir archivos
const storage = multer.diskStorage({
  destination: process.env.UPLOAD_DIR,
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Rutas
app.use(express.static('public'));

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { filename, path } = req.file;
  await pool.query('INSERT INTO files (name, path) VALUES ($1, $2)', [filename, path]);
  res.json({ message: 'Archivo subido', filename });
});

app.get('/api/files', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM files');
  res.json(rows);
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});