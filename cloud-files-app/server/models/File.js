class File {
    constructor(id, name, path, createdAt) {
      this.id = id; // ID del archivo
      this.name = name; // Nombre del archivo
      this.path = path; // Ruta del archivo en el sistema
      this.createdAt = createdAt; // Fecha de creación
    }
  }
  
  // Exportar la clase File
  module.exports = File;