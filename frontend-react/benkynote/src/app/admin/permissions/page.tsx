'use client'
import { useState, useEffect } from 'react';
import PermissionsTable from '@/components/adminComponents/PermissionsTable'; // Componente de tabla de permisos
import PermissionDialog from '@/components/adminComponents/CreatePermissionDialog'; // Componente del pop-up

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null); // Para editar un permiso específico

  useEffect(() => {
    fetchPermissions();
  }, []);

  // Función para obtener los permisos de la API
  const fetchPermissions = async () => {
    const response = await fetch(`http://localhost:8080/permissions`);
    const data = await response.json();
    setPermissions(data);
  };

  // Función para abrir el pop-up de creación de permiso
  const handleAddPermission = () => {
    setSelectedPermission(null); // Limpiar permiso seleccionado al agregar uno nuevo
    setIsDialogOpen(true);
  };

  // Función para abrir el pop-up de edición de permiso
  const handleEditPermission = (permission) => {
    setSelectedPermission(permission); // Setear el permiso seleccionado para editar
    setIsDialogOpen(true);
  };

  // Función para manejar el guardado del permiso
  const handleSavePermission = async (permissionData) => {
    if (permissionData.id) {
      // Actualizar permiso existente
      await fetch(`/api/permissions/${permissionData.id}`, {
        method: 'PUT',
        body: JSON.stringify(permissionData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Crear nuevo permiso
      await fetch('/api/permissions', {
        method: 'POST',
        body: JSON.stringify(permissionData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    fetchPermissions(); // Refrescar la lista de permisos
  };

  // Función para eliminar un permiso
  const handleDeletePermission = async (permissionId) => {
    await fetch(`/api/permissions/${permissionId}`, { method: 'DELETE' });
    fetchPermissions(); // Refrescar la lista de permisos después de eliminar
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Permisos</h1>

      {/* Botón para añadir un nuevo permiso */}
      <button onClick={handleAddPermission} className="mb-4 bg-blue-500 text-white">
        Añadir Permiso
      </button>

      {/* Tabla de Permisos */}
      <PermissionsTable
        permissions={permissions}
        onDelete={handleDeletePermission}
        onEdit={handleEditPermission}
      />

      {/* Dialog para crear/editar permisos */}
      <PermissionDialog
        isOpen={isDialogOpen}
        closeModal={() => setIsDialogOpen(false)}
        onSave={handleSavePermission}
        permission={selectedPermission} // Si hay un permiso seleccionado, se pasa para editar
      />
    </div>
  );
}
