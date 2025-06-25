'use client';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { ModeToggle } from '../mode-toggle';

export default function NavBar() {
  const { user, error, isLoading } = useUser();

  return (
    <nav className="bg-primary p-4 shadow-sm dark:bg-slate-800">
      <div className="container mx-auto flex justify-between items-center dark:bg-slate-800">
        <div>
          <ModeToggle />
        </div>

        {/* Right side links and buttons */}
        <div className="flex space-x-6 items-center">
          <a
            href="#"
            className="text-gray-800 text-m font-medium hover:text-gray-600"
          >
            Tutorial
          </a>
          <a
            href="#"
            className="text-gray-800 text-m font-medium hover:text-gray-600"
          >
            Suscripciones
          </a>
          <a
            href="#"
            className="text-gray-800 text-m font-medium hover:text-gray-600"
          >
            Instituciones
          </a>
          {user ? (
            <a
              href="/api/auth/logout"
              className="text-white text-m font-medium bg-red-800 rounded-full px-4 py-1 hover:text-black hover:bg-red-500"
            >
              Logout
            </a>
          ) : (
            //else
            <a
              href="/api/auth/login"
              className="text-white text-m font-medium bg-green-800 rounded-full px-4 py-1 hover:text-black hover:bg-green-500"
            >
              Login
            </a>
          )}
          <a
            href="/api/auth/signup"
            className="text-gray-800 text-m font-medium border-2 border-gray-800 rounded-full px-4 py-1 hover:bg-gray-800 hover:text-white hover:cursor-pointer"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
}
