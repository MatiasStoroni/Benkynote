import {
  UserIcon,
  CalendarIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PencilIcon,
  CogIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  BeakerIcon,
  BellAlertIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';

export default function LeftNavigator() {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    {
      name: 'Indicadores',
      path: '/admin/main',
      icon: <ChartPieIcon className="h-6 w-6" />,
    },
    {
      name: 'Usuarios',
      path: '/admin/users',
      icon: <UserIcon className="h-6 w-6" />,
    },
    {
      name: 'Instituciones',
      path: '/admin/institutions',
      icon: <AcademicCapIcon className="h-6 w-6" />,
    },
    {
      name: 'Perfiles',
      path: '/admin/profiles',
      icon: <CheckCircleIcon className="h-6 w-6" />,
    },
    {
      name: 'Permisos',
      path: '/admin/permissions',
      icon: <DocumentTextIcon className="h-6 w-6" />,
    },
    
    {
      name: 'Materias',
      path: '/admin/materias',
      icon: <BeakerIcon className="h-6 w-6" />,
    },

    {
      name: 'Sugerencias',
      path: '/admin/suggestions',
      icon: <BellAlertIcon className="h-6 w-6" />,
    },

    {
      name: 'Ajustes',
      path: '/personal/ajustes',
      icon: <CogIcon className="h-6 w-6" />,
    },
  ];

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-4 w-[13rem] h-fit mt-5 ml-3 flex">
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${pathname === item.path
                ? 'bg-gray-200 text-blue-600 dark:bg-slate-600'
                : 'text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
