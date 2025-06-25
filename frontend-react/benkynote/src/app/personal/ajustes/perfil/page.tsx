"use client";
import LoadingCircle from "@/components/LoadingCircle";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
export default function Page() {
    const { user, error, isLoading } = useUser(); // Obtener los datos del usuario
    const [editMode, setEditMode] = useState(false); // Estado para habilitar/deshabilitar los campos

    const [profileImage, setProfileImage] = useState(user?.picture || ""); // Estado para la imagen de perfil
    const [previewImage, setPreviewImage] = useState(null); // Estado para la vista previa

    const handleEdit = () => {
        setEditMode(!editMode); // Alterna entre editar o no
    };

    // Función para manejar el cambio de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Vista previa de la imagen
            };
            reader.readAsDataURL(file);
            setProfileImage(file); // Guardar la imagen seleccionada
        }
    };

    return (
        <div className="bg-white h-[600px] w-full m-5 rounded-lg p-6">
            {/* Título centrado con línea divisoria */}
            <h2 className="text-3xl font-semibold text-gray-700 text-center mb-4">Editar Perfil</h2>
            <hr className="mb-6" />

            <form>
                <div className="grid grid-cols-3 gap-6">
                    {/* Nombre */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                editMode ? "text-black" : "text-gray-500"
                            }`}
                            placeholder={user?.nickname || ""} // Cargar el nombre del usuario
                            disabled={!editMode} // Deshabilitado si no está en modo edición
                        />
                    </div>

                    {/* Apellido */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="apellido">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                editMode ? "text-black" : "text-gray-500"
                            }`}
                            placeholder={user?.name || ""} // Cargar el apellido del usuario
                            disabled={!editMode} // Deshabilitado si no está en modo edición
                        />
                    </div>

                    {/* Correo Electrónico */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                editMode ? "text-black" : "text-gray-500"
                            }`}
                            placeholder={user?.email || ""} // Cargar el email del usuario
                            disabled={!editMode} // Deshabilitado si no está en modo edición
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="telefono">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="telefono"
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                editMode ? "text-black" : "text-gray-500"
                            }`}
                            placeholder="123-456-7890"
                            disabled={!editMode} // Deshabilitado si no está en modo edición
                        />
                    </div>

                    {/* Dirección */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="direccion">
                            Dirección
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                editMode ? "text-black" : "text-gray-500"
                            }`}
                            placeholder="Calle Falsa 123"
                            disabled={!editMode} // Deshabilitado si no está en modo edición
                        />
                    </div>

                    {/* Ciudad */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="ciudad">
                            Ciudad
                        </label>
                        <input
                            type="text"
                            id="ciudad"
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                editMode ? "text-black" : "text-gray-500"
                            }`}
                            placeholder="Buenos Aires"
                            disabled={!editMode} // Deshabilitado si no está en modo edición
                        />
                    </div>
                </div>

                {/* Imagen de Perfil */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Foto de Perfil</label>
                    <div className="flex items-center space-x-4">
                        <img
                            src={previewImage || profileImage || "/default-avatar.png"}
                            alt="Imagen de Perfil"
                            className="w-20 h-20 rounded-full border"
                        />
                        {editMode && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm text-gray-600"
                            />
                        )}
                    </div>
                </div>

                {/* Botones de Editar y Guardar */}
                <div className="mt-6 flex justify-between">
                    {/* Botón Editar */}
                    <button
                        type="button"
                        onClick={handleEdit}
                        className={`px-4 py-2 rounded-md ${
                            editMode ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
                        } hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
                    >
                        {editMode ? "Cancelar" : "Editar"}
                    </button>

                    {/* Botón Guardar solo visible en modo edición */}
                    {editMode && (
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        >
                            Guardar Cambios
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
