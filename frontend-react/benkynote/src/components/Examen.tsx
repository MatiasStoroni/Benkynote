'use client';

import React, { useState, useEffect } from 'react';
import MultipleChoice from './MultipleChoice';
import TrueAndFalse from './TrueAndFalse';
import JoinWithArrows from './JoinWithArrows';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ExamenApp() {
  const [inputText, setInputText] = useState<string>('');
  const [MC, setMC] = useState<string>('');
  const [VF, setVF] = useState<string>('');
  const [UCF, setUCF] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  // const handleGenerateExam = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch('http://localhost:8005/examenes', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ user_notes: inputText }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Error al generar el Examen');
  //     }

  //     const data = await response.json();

  //     console.log(data.content);

  //     // Encuentra el índice donde comienza "### Multiple Choice"
  //     const startOfMultipleChoice = data.content.indexOf('### Multiple Choice');

  //     // Si no se encuentra "### Multiple Choice", maneja el error
  //     if (startOfMultipleChoice === -1) {
  //       console.error(
  //         'Sección "### Multiple Choice" no encontrada en el contenido.'
  //       );
  //     } else {
  //       // Encuentra el índice de la siguiente "###" después de "### Multiple Choice"
  //       const startOfNextSection = data.content.indexOf(
  //         '###',
  //         startOfMultipleChoice + 1
  //       );

  //       // Si no hay más secciones, toma hasta el final del contenido
  //       const endOfMultipleChoice =
  //         startOfNextSection !== -1 ? startOfNextSection : data.content.length;

  //       // Extrae el contenido de la sección "Multiple Choice"
  //       const multipleChoiceContent = data.content
  //         .slice(startOfMultipleChoice, endOfMultipleChoice)
  //         .trim();

  //       console.log(`Multiple Choice:\n${multipleChoiceContent}`);
  //       setExam(multipleChoiceContent);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setError(
  //       'Se ha producido un error generando el Examen, por favor intente nuevamente'
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGenerateExam = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8005/examenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_notes: inputText }), // Enviamos los apuntes al servidor de backend
      });

      if (!response.ok) {
        throw new Error('Error al intentar conectarse al servidor backend');
      }

      const data = await response.json(); // Esperamos y convertimos a json la respuesta del backend

      // console.log(data.content);

      // Dividimos el contenido en secciones basadas en "###"
      const sections = data.content
        .split('###')
        .map((section) => section.trim());

      // Función para extraer una sección específica
      const getSectionContent = (sectionName) => {
        const section = sections.find((sec) => sec.startsWith(sectionName));
        return section ? section : '';
      };

      // Extraemos cada sección
      const multipleChoiceContent = getSectionContent('Multiple Choice');
      const verdaderoFalsoContent = getSectionContent('Verdadero y Falso');
      const unirConFlechasContent = getSectionContent('Unir con Flechas');

      // Mostramos cada sección por consola para verificar que esté bien
      console.log(`Multiple Choice:\n${multipleChoiceContent}`);
      console.log(`Verdadero y Falso:\n${verdaderoFalsoContent}`);
      console.log(`Unir con Flechas:\n${unirConFlechasContent}`);

      setMC(multipleChoiceContent);
      setVF(verdaderoFalsoContent);
      setUCF(unirConFlechasContent);
    } catch (error) {
      console.error('Error:', error);
      setError(
        'Se ha producido un error generando el Examen, por favor intente nuevamente'
      );
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(`El contenido actualizado de exam es: ${exam}`);
  // }, [exam]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Generador de Examen</h1>
      <div className="space-y-6">
        <Textarea
          placeholder="Ingresa tu texto aquí"
          value={inputText}
          onChange={handleTextChange}
          className="min-h-[200px] w-full"
        />
        <Button
          onClick={handleGenerateExam}
          disabled={loading || inputText.trim() === ''}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generando examen...
            </>
          ) : (
            'Generar Examen'
          )}
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {MC && VF && UCF && (
          <div>
            {/* <h2 className="text-2xl font-bold mb-4">Examen Generado</h2>
            <MultipleChoice input={MC} />
            <TrueAndFalse input={VF} />
          </div> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Ver Examen Generado</Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[94vh] overflow-y-auto p-4">
                {/* <DialogHeader>
                  <DialogTitle>Examen Generado</DialogTitle>
                </DialogHeader> */}
                <div className="space-y-8">
                  <MultipleChoice input={MC} />
                  <TrueAndFalse input={VF} />
                  <JoinWithArrows input={UCF} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Loader2 } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import MultipleChoice from './MultipleChoice';
// import TrueAndFalse from './TrueAndFalse';

// export default function ExamenApp() {
//   const [inputText, setInputText] = useState<string>('');
//   const [MC, setMC] = useState<string>('');
//   const [VF, setVF] = useState<string>('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [examGenerated, setExamGenerated] = useState(false);

//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInputText(e.target.value);
//   };

//   const handleGenerateExam = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:8005/examenes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user_notes: inputText }),
//       });

//       if (!response.ok) {
//         throw new Error('Error al generar el Examen');
//       }

//       const data = await response.json();

//       // Assuming the API returns MC and VF sections separately
//       setMC(data.MC);
//       setVF(data.VF);
//       setExamGenerated(true);
//     } catch (error) {
//       console.error('Error:', error);
//       setError(
//         'Se ha producido un error generando el Examen, por favor intente nuevamente'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6">Generador de Examen</h1>
//       <div className="space-y-6">
//         <Textarea
//           placeholder="Ingresa tu texto aquí"
//           value={inputText}
//           onChange={handleTextChange}
//           className="min-h-[200px] w-full"
//         />
//         <Button
//           onClick={handleGenerateExam}
//           disabled={loading || inputText.trim() === ''}
//         >
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Generando examen...
//             </>
//           ) : (
//             'Generar Examen'
//           )}
//         </Button>
//         {error && (
//           <Alert variant="destructive">
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         {examGenerated && (
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="outline">Ver Examen Generado</Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle>Examen Generado</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-8">
//                 <MultipleChoice input={MC} />
//                 <TrueAndFalse input={VF} />
//               </div>
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>
//     </div>
//   );
// }
