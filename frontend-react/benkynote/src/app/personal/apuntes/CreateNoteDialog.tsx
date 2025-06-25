import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function CreateNoteDialog({
  isCreateOpen,
  setIsCreateOpen,
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  subjects,
  materiaSeleccionada,
  setMateriaSeleccionada,
  colaboradores,
  setColaboradores,
  roles,
  setRoles,
  errores,
  setErrores
}) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Controlador para seleccionar la materia
  const handleMateriaChange = (e) => {
    setMateriaSeleccionada(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      nombreMateria: e.target.value
    }));
  };

  // Controlador para actualizar el correo electrónico de un colaborador
  const handleColaboradorChange = (index, email) => {
    const nuevosColaboradores = [...colaboradores];
    nuevosColaboradores[index] = email;
    setColaboradores(nuevosColaboradores);

    setFormData((prevData) => ({
      ...prevData,
      colaboradoresEmail: nuevosColaboradores
    }));

    const nuevosErrores = [...errores];
    if (!emailRegex.test(email)) {
      nuevosErrores[index] = "Email inválido";
    } else {
      nuevosErrores[index] = ""; // No hay error
    }
    setErrores(nuevosErrores);
  };

  // Controlador para cambiar el rol de un colaborador
  const handleRoleChange = (index, role) => {
    const nuevosRoles = [...roles];
    nuevosRoles[index] = role;
    setRoles(nuevosRoles);

    setFormData((prevData) => ({
      ...prevData,
      colaboradoresRoles: nuevosRoles
    }));
  };

  // Agregar un colaborador al array
  const agregarColaborador = () => {
    setColaboradores([...colaboradores, ""]);
    setErrores([...errores, ""]);
    setRoles([...roles, "LECTOR"]); // Asignar rol por defecto
  };

  // Eliminar un colaborador del array
  const eliminarColaborador = (index) => {
    setColaboradores(colaboradores.filter((_, i) => i !== index));
    setErrores(errores.filter((_, i) => i !== index));
    setRoles(roles.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">Crear nuevo Apunte</Dialog.Title>
          <form onSubmit={handleSubmit}>
            {/* Nombre del apunte */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre Apunte</label>
              <input
                type="text"
                name="nombreApunte"
                value={formData.nombreApunte}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Etiqueta</label>
              <input
                type="text"
                name="etiquetaApunte"
                value={formData.etiquetaApunte}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Materia */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Materia</label>
              <select
                id="materia"
                name="nombreMateria"
                value={materiaSeleccionada}
                onChange={handleMateriaChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Selecciona una materia</option>
                {subjects.map((materia) => (
                  <option key={materia.id} value={materia.nombreMateria}>
                    {materia.nombreMateria}
                  </option>
                ))}
              </select>
            </div>

            {/* Colaboradores */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Colaboradores:</label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                {colaboradores.map((colaborador, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="email"
                      placeholder="Ingrese email del colaborador"
                      value={colaborador}
                      onChange={(e) => handleColaboradorChange(index, e.target.value)}
                      className={`p-2 border rounded-md w-full ${errores[index] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <select
                      value={roles[index] || "LECTOR"}
                      onChange={(e) => handleRoleChange(index, e.target.value)}
                      className="ml-2 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="LECTOR">LECTOR</option>
                      <option value="EDITOR">EDITOR</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => eliminarColaborador(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                    {errores[index] && <p className="text-red-500 text-sm ml-2">{errores[index]}</p>}
                  </div>
                ))}
              </div>

              <button
                className="flex items-center text-l border-2 rounded mt-2 p-2 font-medium text-gray-700 hover:bg-gray-100"
                type="button"
                onClick={agregarColaborador}
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Botones */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded text-white bg-blue-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
