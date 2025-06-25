'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { deleteNote, getNotes, getSubjects, postNote, updateNote } from "../../api/notes"

import ApunteCard from './ApunteCard';
import CreateNoteDialog from './CreateNoteDialog';
import EditNoteDialog from './EditNoteDialog';

export default function Page() {
    const router = useRouter();
    const { user, error, isLoading } = useUser(); // Manejamos el estado de isLoading correctamente
    const [notes, setNotes] = useState([]);
    const [notesLoaded, setNotesLoaded] = useState(false);

    const [subjects, setSubjects] = useState([])
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');

    const [colaboradores, setColaboradores] = useState([""]);
    const [roles, setRoles] = useState([""]);
    const [errores, setErrores] = useState([]); //para validar emails

    const notesEjemplo = [
        { "nombreApunte": "Apunte de Ondas", "etiquetaApunte": "onda", "subject": "Fisica", "contenido": "Las ondas son perturbaciones que se propagan a través de un medio o el vacío, transportando energía." },
        { "nombreApunte": "Apunte de Cinemática", "etiquetaApunte": "movimiento", "subject": "Fisica", "contenido": "La cinemática estudia el movimiento de los cuerpos sin considerar las causas que lo producen." },
        { "nombreApunte": "Apunte de Termodinámica", "etiquetaApunte": "calor", "subject": "Fisica", "contenido": "La termodinámica es la rama de la física que estudia las relaciones entre el calor y otras formas de energía." },
        // ... más ejemplos
    ];

    //Create Dialog
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [formData, setFormData] = useState({
        id: null,
        nombreApunte: '',
        etiquetaApunte: '',
        esTranscripcion: false,
        contenidoApunte: '',
        nombreMateria: '',
        colaboradoresEmail: [],
        colaboradoresRoles: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await postNote(formData, user.sub);

            setNotes([...notes, formData]);

            setIsCreateOpen(false);
            setFormData({
                id: null,
                nombreApunte: '',
                etiquetaApunte: '',
                esTranscripcion: false,
                contenidoApunte: '',
                nombreMateria: '',
                colaboradoresEmail: [],
                colaboradoresRoles: []
            })
            getAllNotes(user?.sub)
        } catch (error) {
            console.error('Error al guardar el evento:', error);
        }
    };

    const getAllNotes = async (id) => {
        setNotesLoaded(false); // Ponemos el estado en "cargando"
        try {
            const response = await getNotes(id);
            const data = response.data.notes
            setNotes(data);  // Guardamos los apuntes en el estado
        } catch (error) {
            console.error('Error al cargar los apuntes:', error);
        } finally {
            setNotesLoaded(true); // Cambiamos el estado a "no cargando" una vez finalizada la llamada
        }
    };

    //SUBJECTS
    const getAllSubjects = async () => {
        try {
            const response = await getSubjects();
            console.log(response.data)
            const data = response.data
            setSubjects(data);  // Guardamos los apuntes en el estado
        } catch (error) {
            console.error('Error al cargar las materias:', error);
        };
    }

    useEffect(() => {
        getAllSubjects()
        if (user?.sub) {
            getAllNotes(user.sub)
        }
    }, [isLoading, user]); // Añadimos isLoading a las dependencias

    // ------------------ SEARCH ------------------ 
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtra los apuntes según el término de búsqueda
    const filteredNotes = notes.filter((apunte) =>
        apunte.nombreApunte.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apunte.etiquetaApunte.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Función para manejar el clic en un apunte
    const handleApunteClick = (apunte) => {
        localStorage.setItem('selectedApunte', JSON.stringify(apunte));
        router.push(`/personal/apuntes/${apunte.id}`);
    };

    const handleDelete = async (apunte) => {
        try {
            const response = await deleteNote(apunte, user.sub);
            console.log(response)
            getAllNotes(user.sub)
        } catch (error) {
            console.error('Error al cargar las materias:', error);
        };
    }

    if (isLoading || !notesLoaded) {
        return <p>Cargando...</p>
    }

    const handleEdit = async (apunte) => {
        e.preventDefault();
        try {
            const response = await updateNote(apunte, user.sub);
            console.log(response)
            getAllNotes(user.sub)
        } catch (error) {
            console.error('Error al cargar las materias:', error);
        };
    };

    // Función para manejar la edición de un apunte existente
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await postNote(formData, user.sub); // Reemplaza con la función de edición correspondiente

            setNotes(notes.map(note => note.id === formData.id ? formData : note));

            setIsEditOpen(false);
            getAllNotes(user.sub);
        } catch (error) {
            console.error('Error al editar el apunte:', error);
        }
    };

    return (
        <div className="bg-white min-h-[600px] overflow-y-auto w-full m-5 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar apunte..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md p-2 pl-10 w-full"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 18a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" />
                    </svg>
                </div>

                <button
                    className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 transition-colors"
                    onClick={() => setIsCreateOpen(true)}
                >
                    + Nuevo apunte
                </button>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
                {notes.length > 0 ?
                    <>
                        {
                            filteredNotes.length > 0 ? (
                                filteredNotes.map((apunte, index) => (
                                    <ApunteCard apunte={apunte} index={index} handleApunteClick={handleApunteClick} key={index} handleDelete={handleDelete} isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} />
                                ))
                            ) : (
                                <p className="text-gray-500">No hay apuntes que coincidan con la búsqueda</p>
                            )
                        }
                    </>
                    : <p className="text-gray-500">Aún no tienes apuntes creados.</p>
                }
            </div>

            <CreateNoteDialog
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                subjects={subjects}
                materiaSeleccionada={materiaSeleccionada}
                setMateriaSeleccionada={setMateriaSeleccionada}
                colaboradores={colaboradores}
                setColaboradores={setColaboradores}
                roles={roles}
                setRoles={setRoles}
                errores={errores}
                setErrores={setErrores}
            />

            <EditNoteDialog
                isEditOpen={isEditOpen}
                setIsEditOpen={setIsEditOpen}
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleEditSubmit={handleEdit}
                subjects={subjects}
                materiaSeleccionada={materiaSeleccionada}
                setMateriaSeleccionada={setMateriaSeleccionada}
                colaboradores={colaboradores}
                setColaboradores={setColaboradores}
                roles={roles}
                setRoles={setRoles}
                errores={errores}
                setErrores={setErrores}
            />
        </div>
    );
}
