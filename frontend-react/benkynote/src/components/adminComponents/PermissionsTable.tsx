import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { FilePenIcon, TrashIcon } from 'lucide-react';

export default function PermissionsTable({ permissions, onDelete, onEdit }) {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 p-4">
      <div className="w-full md:w-2/3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission, index) => (
              <TableRow
                key={permission.id}
                className={index % 2 === 0
                  ? 'bg-blue-100 hover:bg-blue-200 transition-colors duration-300 dark:bg-cyan-950 dark:hover:bg-cyan-800 border-0'
                  : 'hover:bg-gray-100 transition-colors duration-300 dark:hover:bg-slate-600 border-0'}
              >
                <TableCell>{permission.id}</TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <FilePenIcon
                    className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform duration-300"
                    onClick={() => onEdit(permission)} // Editar el permiso al hacer clic
                  />
                  <TrashIcon
                    className="text-red-500 cursor-pointer hover:scale-110 transition-transform duration-300"
                    onClick={() => onDelete(permission.id)} // Eliminar el permiso al hacer clic
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
