import React, { useState } from 'react';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Función para manejar el archivo seleccionado
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file); // Aquí puedes manejar el archivo o enviarlo a tu backend
  };

  // Función para enviar el archivo (ejemplo básico)
  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("No se ha seleccionado ningún archivo");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Aquí se podría hacer una petición al backend para subir el archivo
    fetch('http://localhost:8080/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Archivo subido correctamente', data);
      })
      .catch((error) => {
        console.error('Error al subir el archivo:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Importar</button>
    </div>
  );
};

export default FileUploader;
