import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

interface StudySessionParams {
    nombre: string;
    tiempoEstudio: number;
    tiempoRecreo: number;
}

interface StudySessionModalProps {
    open: boolean;
    onStart: (sessionData: StudySessionParams) => void;
    onEnd: () => void;
    onClose: () => void;
    onSave: (sessionData: StudySessionParams) => void;
    handleResumeSession: () => void;
    handlePauseSession: () => void;
    sessionActive: boolean;
    isBreakTime: boolean;
    isPaused: boolean;
    studyTimeLeft: number;
    breakTimeLeft: number;
    formatTime: (seconds: number) => string;
    getConcentrationEffect: () => void;
}

const StudySessionModal: React.FC<StudySessionModalProps> = ({
    open,
    onStart,
    onEnd,
    onClose,
    onSave,
    handleResumeSession,
    handlePauseSession,
    sessionActive,
    isBreakTime,
    isPaused,
    studyTimeLeft,
    breakTimeLeft,
    formatTime,
    getConcentrationEffect,
}) => {
    const [params, setParams] = useState<StudySessionParams>({
        nombre: "",
        tiempoEstudio: null,
        tiempoRecreo: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setParams({ ...params, [name]: value });
    };

    const handleStart = () => {
        onStart(params);
    };

    const handleSave = () => {
        onSave(params); // Llama a la función onSave y pasa los datos al layout
        onClose(); // Cierra el modal después de guardar
    };

    if (!open) return null;

    return (
        <Dialog open={open} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-20" aria-hidden="true" />
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel
                        className={`p-6 rounded-md shadow-xl transition-colors duration-500 ${getConcentrationEffect()}`}
                    >
                        <Dialog.Title className="text-lg font-semibold">
                            {sessionActive
                                ? isBreakTime
                                    ? "Recreo"
                                    : "Sesión de Estudio"
                                : "Configurar Sesión de Estudio"}
                        </Dialog.Title>
                        <h2>{params?.nombre}</h2>

                        {!sessionActive ? (
                            <>
                                <div className="flex flex-col justify-center space-y-4 mt-4">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Nombre de la sesión
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre de la sesión"
                                            value={params.nombre}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded w-full"
                                        />
                                    </div>
                                    <div className="flex align-items flex-row">
                                        <div className="flex flex-col mr-2 w-40">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tiempo de estudio (minutos)
                                            </label>
                                            <input
                                                type="number"
                                                name="tiempoEstudio"
                                                placeholder="Estudio"
                                                value={params.tiempoEstudio}
                                                onChange={handleInputChange}
                                                className="p-2 border rounded"
                                            />
                                        </div>
                                        <div className="flex flex-col w-40">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tiempo de recreo (minutos)
                                            </label>
                                            <input
                                                type="number"
                                                name="tiempoRecreo"
                                                placeholder="Recreo"
                                                value={params.tiempoRecreo}
                                                onChange={handleInputChange}
                                                className="p-2 border rounded"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-500 text-white rounded"
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 mx-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={handleStart}
                                        className="px-4 py-2 bg-green-500 text-white rounded"
                                    >
                                        Iniciar Sesion
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold">
                                    {isBreakTime ? "Tiempo de Recreo" : "Tiempo de Estudio"}:{" "}
                                    {isBreakTime
                                        ? formatTime(breakTimeLeft)
                                        : formatTime(studyTimeLeft)}
                                </h3>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-500 text-white rounded"
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        onClick={
                                            isPaused ? handleResumeSession : handlePauseSession
                                        }
                                        className="px-4 mx-2 py-2 bg-yellow-500 text-white rounded"
                                    >
                                        {isPaused ? "Reanudar" : "Pausar"}
                                    </button>
                                    <button
                                        onClick={onEnd}
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                    >
                                        Terminar Sesión
                                    </button>
                                </div>
                            </>
                        )}
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};

export default StudySessionModal;
