import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface DeletePopupProps {
  title: string;
  desc1: string;
  desc2?: string;
  onCancel?: () => void;
  onDelete?: () => void;
  button_color?: string;
  button_style?: string;
  button_size?: string;
}

export default function DeletePopup({
  title = 'Título',
  desc1 = 'Título del Contenido',
  desc2 = 'Descripción del Contenido',
  onCancel = () => {},
  onDelete = () => {},
  button_color = 'red',
  button_style = 'bg-transparent hover:bg-red-200 duration-500 px-2 py-2 rounded-full dark:bg-transparent dark:hover:bg-red-300',
  button_size,
}: DeletePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={button_style}>
        <Trash2 color={button_color} size={button_size}></Trash2>
      </Button>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[3px]"
          >
            <Card className="flex flex-col rounded-lg w-[460px] shadow-2xl">
              <CardHeader className="bg-[#FF0000]/70 text-white py-2 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-center">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex py-8 space-x-6">
                <div className="bg-cover w-1/4 mt-1">
                  <Image
                    src="/images/delete-logo.png"
                    alt="Delete Logo"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="text-xl font-extrabold">{desc1}</div>
                  <div className="text-sm">{desc2}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center ml-6 space-x-3 pb-6">
                <Button
                  className="bg-[#140202]/70 hover:bg-[#140202]/80 font-semibold"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-[#FF0000]/70 hover:bg-[#FF0000]/90 font-semibold"
                  onClick={handleDelete}
                >
                  Eliminar Examen
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
