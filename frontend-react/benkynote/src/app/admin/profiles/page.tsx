'use client'
import { useState, useEffect } from 'react';
import RolesTable from '@/components/adminComponents/ProfilesTable'; // Componente de tabla de roles
import RoleDialog from '@/components/adminComponents/CreateProfileDialog' // Componente del pop-up


export default function ProfilesPage() {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRoles, setTotalRoles] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // Para editar un rol específico

  useEffect(() => {
    fetchRoles();
  }, [currentPage]);

  // Función para obtener los roles de la API
  const fetchRoles = async () => {
    // Aquí se realizaría la llamada a la API de Java
    // Simulamos la obtención de datos:
    const response = await fetch(`http://localhost:8080/roles/auth`);
    const data = await response.json();
    
    setRoles(data);
    //setTotalRoles(data.total); // Total de roles para la paginación
  };

  // Función para abrir el pop-up de creación de rol
  const handleAddRole = () => {
    setSelectedRole(null); // Limpiar rol seleccionado al agregar uno nuevo
    setIsDialogOpen(true);
  };

  // Función para abrir el pop-up de edición de rol
  const handleEditRole = (role) => {
    setSelectedRole(role); // Setear el rol seleccionado para editar
    setIsDialogOpen(true);
  };

  // Función para manejar el guardado del rol
  const handleSaveRole = async (roleData) => {
    if (roleData.id) {
      // Actualizar rol existente
      await fetch(`/api/roles/${roleData.id}`, {
        method: 'PUT',
        body: JSON.stringify(roleData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Crear nuevo rol
      await fetch('/api/roles', {
        method: 'POST',
        body: JSON.stringify(roleData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    fetchRoles(); // Refrescar la lista de roles
  };

  // Función para eliminar un rol
  const handleDeleteRole = async (roleId) => {
    await fetch(`/api/roles/${roleId}`, { method: 'DELETE' });
    fetchRoles(); // Refrescar la lista de roles después de eliminar
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Roles</h1>

      {/* Botón para añadir un nuevo rol */}
      <button onClick={handleAddRole} className="mb-4 bg-blue-500 text-white">
        Añadir Rol
      </button>

      {/* Tabla de Roles */}
      <RolesTable
        roles={roles}
        onDelete={handleDeleteRole}
        totalRoles={totalRoles}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Dialog para crear/editar roles */}
      <RoleDialog
        isOpen={isDialogOpen}
        closeModal={() => setIsDialogOpen(false)}
        onSave={handleSaveRole}
        role={selectedRole} // Si hay un rol seleccionado, se pasa para editar
      />
    </div>
  );
}
