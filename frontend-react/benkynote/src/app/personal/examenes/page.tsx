'use client';
import { ModeToggle } from '@/components/mode-toggle';
import ExamenApp from '@/components/Examen';
import CrearExamenForm from '@/components/CrearExamenForm';

export default function Page() {
  return (
    <>
      <div className="bg-white h-[81vh] w-full m-5 rounded-lg p-6">
        <CrearExamenForm></CrearExamenForm>
        <ExamenApp></ExamenApp>
      </div>
      {/* </div> */}
    </>
  );
}
