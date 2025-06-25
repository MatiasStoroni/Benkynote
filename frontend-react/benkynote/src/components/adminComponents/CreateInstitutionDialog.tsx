import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type InstitutionForm = {
  nombreInstitucion: string;
  correoInstitucion: string;
  telefonoInstitucion: string;
  
 

};

interface InstitutionDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (institution: InstitutionForm) => void;
}

const InstitutionDialog: React.FC<InstitutionDialogProps> = ({ open, onClose, onSave }) => {
  
  const [formValues, setFormValues] = useState<InstitutionForm>({
    nombreInstitucion: '',
    correoInstitucion: '',
    telefonoInstitucion: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  };;

  const handleSave = () => {
    onSave(formValues);
    setFormValues({ nombreInstitucion: '', correoInstitucion: '', telefonoInstitucion: ''}); // Limpiar el formulario
    onClose(); // Cerrar el diálogo
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Añadir Institución
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="mt-2">
                        <input
                          type="text"
                          name="nombreInstitucion"
                          placeholder="Nombre de la Institución"
                          value={formValues.nombreInstitucion}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="correoInstitucion"
                          placeholder="Email"
                          value={formValues.correoInstitucion}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="telefonoInstitucion"
                          placeholder="Teléfono"
                          value={formValues.telefonoInstitucion}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSave}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default InstitutionDialog;
