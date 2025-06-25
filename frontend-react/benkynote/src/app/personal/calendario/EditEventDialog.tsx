import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';

const EditEventDialog = ({ isOpen, onClose, event, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setDescription(event.description);
            setStartDate(convertirFechaAISOConZonaHoraria(event.start).substr(0, 10));
            setStartTime(convertirFechaAISOConZonaHoraria(event.start).substr(11, 5));
            setEndDate(convertirFechaAISOConZonaHoraria(event.end).substr(0, 10));
            setEndTime(convertirFechaAISOConZonaHoraria(event.end).substr(11, 5));
        }
    }, [event]);

    const handleSave = () => {
        // Combinar las fechas y horas en formato datetime
        const start = (startDate + "T" + startTime + ":00");
        const end = (endDate + "T" + endTime + ":00");

        onSave({
            "id": event.id,
            "nombre": title,
            "descripcion": description,
            "fechaHoraInicio": start,
            "fechaHoraFinal": end,
        });

        onClose(); // Cerrar el modal después de guardar
    };


    function convertirFechaAISOConZonaHoraria(fechaStr) {
        const fecha = new Date(fechaStr);
    
        // Extraer año, mes, día, horas, minutos, segundos
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JS son 0-indexados
        const day = String(fecha.getDate()).padStart(2, '0');
        const hours = String(fecha.getHours()).padStart(2, '0');
        const minutes = String(fecha.getMinutes()).padStart(2, '0');
        const seconds = String(fecha.getSeconds()).padStart(2, '0');
    
        // Conservar el uso horario original (en este caso GMT-0300)
        const timezoneOffset = -fecha.getTimezoneOffset();
        const sign = timezoneOffset >= 0 ? '+' : '-';
        const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
        const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
        const timezone = `${sign}${offsetHours}:${offsetMinutes}`;
    
        // Formar el formato ISO conservando la zona horaria local
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;
    }


    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <Dialog.Title className="text-lg font-semibold mb-4">Editar Evento</Dialog.Title>

                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Fecha y Hora de Inicio */}
                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700">Fecha de Inicio</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700">Hora de Inicio</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                    </div>

                    {/* Fecha y Hora de Finalización */}
                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700">Fecha de Finalización</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700">Hora de Finalización</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-500 text-white rounded ml-2"
                            disabled={!title || !startDate || !startTime || !endDate || !endTime} // Deshabilitar si falta información
                        >
                            Guardar
                        </button>
                    </div>
                </Dialog.Panel>

            </div>
        </Dialog>
    );
};

export default EditEventDialog;
