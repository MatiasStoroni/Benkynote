import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';

export default function EditNoteDialog({
    isEditOpen,
    setIsEditOpen,
    formData,
    setFormData,
    handleChange,
    handleEditSubmit,
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

    // Carga el apunte editable del localStorage
    const apunteEditable = JSON.parse(localStorage.getItem("apunteEditable"));

    return (
        <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <DialogTitle className="text-lg font-semibold mb-4">Editar Apunte</DialogTitle>
                    <form onSubmit={() => handleEditSubmit(apunteEditable)}>
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

                        {/* Botones */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
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
                </DialogPanel>
            </div>
        </Dialog>
    );
}
