import { Dialog } from '@headlessui/react';

const EventInfoDialog = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4 text-green-900">{event.title}</Dialog.Title>
          <p className="mb-2"><strong>Descripción:</strong> {event.descripcion}</p>
          <p className="mb-2"><strong>Inicio:</strong> {new Date(event.start).toLocaleString()}</p>
          <p className="mb-4"><strong>Finalización:</strong> {new Date(event.end).toLocaleString()}</p>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cerrar
            </button>

            <button
              onClick={() => onDelete(event.id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Eliminar
            </button>
            <button
              onClick={() => onEdit(event.id)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Editar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EventInfoDialog;
