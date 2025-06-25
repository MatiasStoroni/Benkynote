import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export default function TableComponent() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 p-4">
      <div className="w-full md:w-2/3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Creación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0
                    ? 'bg-blue-100 hover:bg-blue-200 transition-colors duration-300 dark:bg-cyan-950 dark:hover:bg-cyan-800 border-0'
                    : 'hover:bg-gray-100 transition-colors duration-300 dark:hover:bg-slate-600 border-0'
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>Transcripcion {index + 1}</TableCell>
                <TableCell>
                  {index % 3 === 0 ? 'Resuelto' : 'Pendiente'}
                </TableCell>
                <TableCell>
                  {new Date(2024, 4, 24 + index).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <FilePenIcon className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform duration-300" />
                  <TrashIcon className="text-red-500 cursor-pointer hover:scale-110 transition-transform duration-300" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
