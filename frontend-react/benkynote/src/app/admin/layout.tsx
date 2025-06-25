'use client';
import Header from '@/components/Header';
import LeftNavigator from '@/components/adminComponents/LeftNavigatorAdmin';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface LayoutProps {
  children: React.ReactNode; // Propiedad para recibir el contenido dinámico
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, error, isLoading } = useUser();
  return (
    <>
      <Header user={user} isLoading={isLoading} />
      <div className="flex w-full h-full bg-[#F5E3D7]">
        <div>
          <LeftNavigator />
         </div>

         <div className='bg-white h-[800px] w-full m-5 rounded-lg p-6'>
          {children} 
        </div>
        </div>
        
    </>
  );
}
export default Layout;