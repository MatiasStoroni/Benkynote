import {
  UserIcon,
  CalendarIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PencilIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';

export default function LeftNavigator() {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    {
      name: 'Área personal',
      path: '/personal/main',
      icon: <UserIcon className="h-6 w-6" />,
    },
    {
      name: 'Calendario',
      path: '/personal/calendario',
      icon: <CalendarIcon className="h-6 w-6" />,
    },
    {
      name: 'Apuntes',
      path: '/personal/apuntes',
      icon: <BookOpenIcon className="h-6 w-6" />,
    },
    {
      name: 'Transcripciones',
      path: '/personal/transcripciones',
      icon: <DocumentTextIcon className="h-6 w-6" />,
    },
    {
      name: 'Exámenes',
      path: '/personal/examenes',
      icon: <PencilIcon className="h-6 w-6" />,
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
