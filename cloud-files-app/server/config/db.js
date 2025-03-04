const { Pool } = require('pg');

// Crear una nueva instancia de Pool para manejar la conexión a la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // La URL de conexión se obtiene de las variables de entorno
});

// Exportar el pool para que pueda ser utilizado en otros archivos
module.exports = pool;