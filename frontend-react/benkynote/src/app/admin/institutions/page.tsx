'use client'
import React, { useEffect, useState } from 'react';
import InstitutionTable from '@/components/adminComponents/InstitutionsTable';
import InstitutionDialog from '@/components/adminComponents/CreateInstitutionDialog';


type Institution = {
  id: number;
  nombreInstitucion: string;
  correoInstitucion: string;
  telefonoInstitucion: string;
  fechaAlta:Date;
  estado:string

};

const InstitutionsPage: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalInstitutions = institutions.length;

  useEffect(() => {
    const fetchUsers = async (page = 0, size = 10) => {
      try {
        // Realizar la llamada a tu backend que maneja la paginación de Auth0
        const response = await fetch(`http://localhost:8080/institutions`);
        const data = await response.json();

        // Establecer los usuarios y el total de usuarios que vienen en el cuerpo
        setInstitutions(data); // Ahora accedemos al campo 'users' de la respuesta
        //setTotalUsers(data.total); // Accedemos al campo 'total' que viene en la respuesta
      } catch (err) {
        setError('Error fetching institutions');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(currentPage - 1, 10); // Usar currentPage - 1 porque la paginación de Auth0 es base 0
  }, [currentPage]);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveInstitution = async (newInstitution: Institution) => {
    try {
      // Llamada al endpoint de la API para crear la institución
      const response = await fetch("http://localhost:8080/institutions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInstitution), // Convertir el objeto Institution a JSON
      });
  
      if (!response.ok) {
        throw new Error("Error al guardar la institución");
      }
  
      const savedInstitution = await response.json();
  
      // Actualizar el estado con la nueva institución desde la respuesta
      setInstitutions([...institutions, savedInstitution]);
    } catch (error) {
      console.error("Error:", error);
      setError('Error creating institution')
    }
  };

  const handleDeleteInstitution = (id: number) => {
    setInstitutions(institutions.filter((institution) => institution.id !== id));
  };

  return (
    <div>
      <h1>Panel de Instituciones</h1>
      
      <button onClick={handleOpenDialog}  className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 transition-colors">
        + Nueva Institución
      </button>

      <InstitutionTable
        institutions={institutions}
        onDelete={handleDeleteInstitution}
        totalInstitutions={totalInstitutions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Popup para añadir instituciones */}
      <InstitutionDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveInstitution}
      />
    </div>
  );
};

export default InstitutionsPage;
