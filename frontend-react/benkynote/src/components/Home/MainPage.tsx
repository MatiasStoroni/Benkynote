'use client'
import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';

const MainPage: React.FC = () => {



  const [isTeacher, setIsTeacher] = useState(false);


  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full px-10 py-20 dark:bg-slate-900 gap-6 h-screen">
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src="/images/benky-logo.png"
            alt="Benkynote logo"
            width={300}
            height={300}
          />

          <h1 className="text-6xl font-bold text-gray-800">Benkynote</h1>

          <p className="text-xl text-gray-600 mt-2">Studying should be fun</p>
        </div>

        <a
          href="/api/auth/signup"
          className="text-white text-lg font-bold bg-gray-800 border-2 border-gray-800 rounded-full px-6 py-3 hover:bg-gray-100 hover:text-gray-800 hover:cursor-pointer transition-all duration-300 mt-6"
        >
          Comenzar Ahora
        </a>
      </div>



      <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${!isTeacher ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: 'url(/images/Profesores.jpg)' }}
        ></div>
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isTeacher ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: 'url(/images/Estudiantes.jpg)' }}
        ></div>

        {/* Contenido */}
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold text-white transition-opacity duration-1000 ease-in-out">
            ¿Eres {isTeacher ? 'Profesor' : 'Estudiante'}?
          </h2>
          <p className="text-xl text-white mt-4 transition-opacity duration-1000 ease-in-out">
            {isTeacher
              ? 'Explora nuestras herramientas para profesores.'
              : 'Descubre cómo BenkyNote puede ayudarte a estudiar mejor.'}
          </p>
          <a
            href="#"
            className="mt-12 flex justify-center text-white text-m font-medium border-2 border-white rounded-full px-4 py-2 hover:bg-white hover:text-gray-800 hover:cursor-pointer transition-all duration-300"
          >
            Descubre más
          </a>

          {/* Links para cambiar roles */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setIsTeacher(false)} // Estudiante primero
              className={`px-4 py-2 text-white rounded-full transition-all duration-300 ${!isTeacher ? 'bg-gray-800' : 'bg-gray-500 hover:bg-gray-800'
                }`}
            >
              Estudiante
            </button>
            <button
              onClick={() => setIsTeacher(true)} // Cambiar a Profesor
              className={`px-4 py-2 text-white rounded-full transition-all duration-300 ${isTeacher ? 'bg-gray-800' : 'bg-gray-500 hover:bg-gray-800'
                }`}
            >
              Profesor
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Suscribite</h2>
        <div className="flex justify-center space-x-10">
          {/* Plan 1 */}
          <div className="w-80 p-6 bg-gray-200 rounded-lg text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Plan Basic</h3>
            <p className="text-lg text-gray-700 mb-6">$9.99 / mes</p>
            <p className="mb-6">Acceso limitado a las funcionalidades básicas y espacio de almacenamiento de 5GB.</p>
            <button className="px-4 py-2 bg-green-500 text-white text-lg rounded-md hover:bg-green-600">Elegir Plan</button>
          </div>

          {/* Plan 2 */}
          <div className="w-80 p-6 bg-gray-200 rounded-lg text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Plan Pro</h3>
            <p className="text-lg text-gray-700 mb-6">$19.99 / mes</p>
            <p className="mb-6">Funcionalidades avanzadas, colaboración y almacenamiento de 50GB.</p>
            <button className="px-4 py-2 bg-green-500 text-white text-lg rounded-md hover:bg-green-600">Elegir Plan</button>
          </div>

          {/* Plan 3 */}
          <div className="w-80 p-6 bg-gray-200 rounded-lg text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Plan Premium</h3>
            <p className="text-lg text-gray-700 mb-6">$29.99 / mes</p>
            <p className="mb-6">Todas las funcionalidades, almacenamiento ilimitado y soporte prioritario.</p>
            <button className="px-4 py-2 bg-green-500 text-white text-lg rounded-md hover:bg-green-600">Elegir Plan</button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-screen flex items-center justify-center bg-gray-100 mt-20">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/Instituciones.jpg')` }}
        ></div>

        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold text-gray-900 transition duration-500">
            ¿Perteneces a una Institución?
          </h2>
          <p className="text-xl text-gray-700 mt-4">
            Disfruta de BenkyNote Liberado registrándote con tu escuela/universidad
          </p>
          <a
            href="/api/auth/signup"
            className="mt-12 flex justify-center text-white text-lg font-bold bg-gray-800 border-2 border-gray-800 rounded-full px-6 py-3 hover:bg-gray-100 hover:text-gray-800 hover:cursor-pointer transition-all duration-300"
          >
            Registrate Ahora
          </a>
        </div>
      </div>

      <footer className="mt-20 bg-slate-800 py-10 text-white text-center">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Columna 1: Sobre Nosotros */}
            <div>
              <h3 className="flex text-left font-bold text-lg mb-4">Sobre Nosotros</h3>
              <ul className="space-y-2">
                <li><a href="#" className="flex text-left hover:underline">¿Qué es BenkyNote?</a></li>
                <li><a href="#" className="flex text-left hover:underline">Misión</a></li>
              </ul>
            </div>

            {/* Columna 2: Ayuda y Soporte */}
            <div>
              <h3 className="flex text-left font-bold text-lg mb-4">Ayuda y Soporte</h3>
              <ul className="space-y-2">
                <li><a href="#" className="flex text-left hover:underline">Tutoriales</a></li>
                <li><a href="#" className="flex text-left hover:underline">Contacto</a></li>
              </ul>
            </div>

            {/* Columna 3: Términos y Privacidad */}
            <div>
              <h3 className="flex text-left font-bold text-lg mb-4">Términos y Privacidad</h3>
              <ul className="space-y-2">
                <li><a href="#" className="flex text-left hover:underline">Términos</a></li>
                <li><a href="#" className="flex text-left hover:underline">Privacidad</a></li>
              </ul>
            </div>

            {/* Columna 4: Social */}
            <div>
              <h3 className="flex text-left font-bold text-lg mb-4">Social</h3>
              <div className=" space-x-2">
                <a href="https://www.youtube.com" className="flex text-left hover:underline">YouTube</a>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p>Benkynote © 2024. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;