import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { FilePenIcon, TrashIcon } from 'lucide-react';

type Institution = {
  id: number;
  nombreInstitucion: string;
  correoInstitucion: string;
  telefonoInstitucion: string;
  fechaAlta:Date;
  estado:String

};
interface InstitutionTableProps {
  institutions: Institution[];
  onDelete: (id: number) => void;
  totalInstitutions: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const InstitutionTable: React.FC<InstitutionTableProps> = ({ institutions, onDelete, totalInstitutions, currentPage, setCurrentPage }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalInstitutions / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 p-4">
      <div className="w-full md:w-2/3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {institutions.map((institution, index) => (
              <TableRow
                key={institution.id}
                className={index % 2 === 0
                  ? 'bg-blue-100 hover:bg-blue-200 transition-colors duration-300 dark:bg-cyan-950 dark:hover:bg-cyan-800 border-0'
                  : 'hover:bg-gray-100 transition-colors duration-300 dark:hover:bg-slate-600 border-0'}
              >
                <TableCell>{institution.id}</TableCell>
                <TableCell>{institution.nombreInstitucion}</TableCell>
                <TableCell>{institution.correoInstitucion}</TableCell>
                <TableCell>{institution.telefonoInstitucion}</TableCell>
                <TableCell>{new Date(institution.fechaAlta).toLocaleDateString()}</TableCell>
                <TableCell>{institution.estado}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <FilePenIcon className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform duration-300" />
                  <TrashIcon 
                    className="text-red-500 cursor-pointer hover:scale-110 transition-transform duration-300"
                    onClick={() => onDelete(institution.id)} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionTable;
