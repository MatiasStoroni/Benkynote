import { Dialog } from '@headlessui/react';

function CreateEventDialog({ isCreateOpen, setIsCreateOpen, formData, handleChange, handleSubmit, isSaveEnabled }) {
  return (
    <Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">Crear nuevo Evento</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Fecha y Hora de Inicio */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                  readOnly
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Hora de Inicio</label>
                <input
                  type="time"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
            </div>

            {/* Fecha y Hora de Finalización */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Fecha de Finalización</label>
                <input
                  type="date"
                  name="fechaFinal"
                  value={formData.fechaFinal}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Hora de Finalización</label>
                <input
                  type="time"
                  name="horaFinal"
                  value={formData.horaFinal}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
            </div>

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
                className={`px-4 py-2 rounded text-white ${isSaveEnabled ? 'bg-blue-500' : 'bg-blue-300 cursor-not-allowed'}`}
                disabled={!isSaveEnabled}
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

export default CreateEventDialog;
