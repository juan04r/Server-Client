// Función para manejar la carga de archivos
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]); // Agregar el archivo al FormData

    try {
        const response = await fetch('/api/files/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        alert(result.message); // Mostrar mensaje de éxito
        fileInput.value = ''; // Limpiar el input de archivo
        loadFiles(); // Recargar la lista de archivos
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        alert('Error al subir el archivo');
    }
});

// Función para cargar y mostrar la lista de archivos
async function loadFiles() {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();

        const fileList = document.getElementById('fileList');
        fileList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.textContent = file.name; // Mostrar el nombre del archivo
            fileList.appendChild(fileItem);
        });
    } catch (error) {
        console.error('Error al cargar los archivos:', error);
    }
}

// Cargar la lista de archivos al cargar la página
window.onload = loadFiles;