'use client';
import TableComponent from '@/components/Table';
import Header from '@/components/Header';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ModeToggle } from '@/components/mode-toggle';
import LeftNavigator from '@/components/LeftNavigator';

export default function Page() {


  return (
    <div className="bg-white h-[600px] w-full m-5 rounded-lg p-6">
      <TableComponent />
    </div>
  );
}
