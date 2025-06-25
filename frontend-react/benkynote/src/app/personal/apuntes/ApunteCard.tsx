import EditNoteDialog from "@/app/personal/apuntes/EditNoteDialog";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function ApunteCard({ apunte, index, handleApunteClick, handleDelete, isEditOpen, setIsEditOpen }) {

    function handleEditClick(apunte){
        localStorage.setItem('apunteEditable', JSON.stringify(apunte));
        setIsEditOpen(true)
    }

    return (
        <div key={index} className="relative w-52 h-72 bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col justify-between group hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-300">
            {/* Etiqueta de la materia */}
            <span className="absolute bottom-4 right-2 bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-lg">
            </span>

            <h3 className="text-lg font-semibold">{apunte.nombreApunte}</h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{apunte.contenido}</p>
            <p className="text-sm mt-4">{apunte.etiquetaApunte}</p>


            {/* Menú de opciones */}
            <div>
                <Menu as="div" className="absolute top-2 right-2 z-20">
                    <MenuButton className="flex items-center text-gray-600 hover:text-gray-800 ">
                        <EllipsisVerticalIcon className="h-6 w-6 group-hover:text-white transition-colors duration-300" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-28 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg focus:outline-none">
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={() => handleEditClick(apunte)}
                                    className={`${active ? 'bg-gray-100' : ''
                                        } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                >
                                    <PencilIcon className="h-5 w-5 mr-2" />
                                    Editar
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={() => handleDelete(apunte)}
                                    className={`${active ? 'bg-gray-100' : ''
                                        } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                >
                                    <TrashIcon className="h-5 w-5 mr-2 text-red-600" />
                                    Eliminar
                                </button>
                            )}
                        </MenuItem>
                    </MenuItems>
                </Menu>

                {/* Botón centrado */}
                <button onClick={() => handleApunteClick(apunte)} className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    Ir al apunte
                </button>
            </div>
        </div>
    )
}