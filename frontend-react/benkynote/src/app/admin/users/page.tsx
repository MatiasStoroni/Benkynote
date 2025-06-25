'use client';
import { useEffect, useState } from 'react';
import UsersTable from '@/components/adminComponents/UsersTable';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function UsersPage() {


  const { user,isLoading } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0); // Estado para el total de usuarios
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async (page = 0, size = 10) => {
      try {
        // Realizar la llamada a tu backend que maneja la paginación de Auth0
        const response = await fetch(`http://localhost:8080/users/authPagination?page=${page}&size=${size}`);
        const data = await response.json();

        // Establecer los usuarios y el total de usuarios que vienen en el cuerpo
        setUsers(data.users); // Ahora accedemos al campo 'users' de la respuesta
        setTotalUsers(data.total); // Accedemos al campo 'total' que viene en la respuesta
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(currentPage - 1, 10); // Usar currentPage - 1 porque la paginación de Auth0 es base 0
  }, [currentPage]);

  const handleDeleteUser = async (userId: string) => {
    try {
        // Hacemos la solicitud DELETE a tu backend
        const response = await fetch("http://localhost:8080/users/auth/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }), // Enviamos el userId en el body
        });

        // Verificamos si la respuesta es correcta (200 OK)
        if (response.ok) {
            const data = await response.text();
            alert(`Usuario eliminado: ${data}`);
        } else {
            // Si no es 200, mostramos el error
            const errorData = await response.text();
            alert(`Error al eliminar el usuario: ${errorData}`);
        }
        setUsers(users.filter(user => user.user_id !== userId));
        setTotalUsers(totalUsers - 1);
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        alert("Error eliminando usuario. Intente nuevamente.");
    }
};

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <UsersTable 
        users={users} 
        onDelete={handleDeleteUser} 
        totalUsers={totalUsers} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
}
