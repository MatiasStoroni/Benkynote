'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import LeftNavigator from '@/components/LeftNavigator';
import { ModeToggle } from '@/components/mode-toggle';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import StudySessionModal from '@/components/StudySession/StudySessionModal';
import StudySessionTimerDialog from '@/components/StudySession/StudySessionTimer';
import { stderr } from 'process';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode; // Propiedad para recibir el contenido dinámico
}

interface StudySessionParams {
  nombre: string;
  tiempoEstudio: number; // en minutos
  tiempoRecreo: number; // en minutos
}



const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const [params, setParams] = useState<StudySessionParams>({ nombre: '', tiempoEstudio: 0, tiempoRecreo: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  
  const [studyTimeLeft, setStudyTimeLeft] = useState(0); // Tiempo de estudio restante en segundos
  const [breakTimeLeft, setBreakTimeLeft] = useState(0); // Tiempo de recreo restante en segundos
  const [isBreakTime, setIsBreakTime] = useState(false); // Para controlar si estamos en recreo
  const [isPaused, setIsPaused] = useState(false); // Nuevo estado para manejar la pausa

  const [isLoadingSessionProps, setIsLoadingSessionProps] = useState(false);


  // useEffect(() => {
  //   if (!isLoading && user) {
  //     const roles = user?.["https://Benkynote/roles"] as string[] || [];
  //     if (roles.includes('administrador')) {
  //       router.push('/admin/users'); // Redirigir si es admin
  //     } else {
  //       router.push('/personal/main'); // Redirigir si es un usuario normal
  //     }
  //   }
  // }, [user, isLoading]);


  // Efecto para manejar el temporizador
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (sessionActive && !isPaused) {
      timer = setInterval(() => {
        if (!isBreakTime) {
          // Si estamos en tiempo de estudio
          if (studyTimeLeft > 0) {
            setStudyTimeLeft((prev) => prev - 1);
          } else {
            // Cambia a tiempo de recreo cuando se termina el tiempo de estudio
            setIsBreakTime(true);
            //setBreakTimeLeft(params.tiempoRecreo * 60); // Convierte minutos a segundos
          }
        } else {
          // Si estamos en tiempo de recreo
          if (breakTimeLeft > 0) {
            setBreakTimeLeft((prev) => prev - 1);
          } else {
            // Termina la sesión cuando el tiempo de recreo termina
            handleEndSession();
          }
        }
      }, 1000); // Actualiza cada segundo
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sessionActive, studyTimeLeft, breakTimeLeft, isBreakTime, isPaused]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Efecto de concentración (ej. cambia el fondo cuando la sesión está activa)
  const getConcentrationEffect = () => {
    if (sessionActive && !isBreakTime) {
      return 'bg-blue-200'; // Efecto de fondo cuando está en tiempo de estudio
    }
    if (sessionActive && isBreakTime) {
      return 'bg-green-200'; // Efecto de fondo cuando está en recreo
    }
    return 'bg-white'; // Fondo normal cuando la sesión no está activa
  };

  const handleSetSession = () => { 
    // Abre el Pop up para poner los parametros
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleStartSession = async (params) => {
    setIsLoadingSessionProps(true);
    try {
      // Comentar axios por ahora
      // await axios.put('/api/sessions/start', { nombre: params.nombre }); // Inicia la sesión
      
      setSessionActive(true);
      setStudyTimeLeft(params.tiempoEstudio * 60); // Convierte el tiempo de estudio a segundos
      setBreakTimeLeft(params.tiempoRecreo * 60);
      setIsBreakTime(false); // Comienza en tiempo de estudio
      console.log('Sesión iniciada');
    } catch (error) {
      console.error('Error al iniciar la sesión:', error);
    } finally {
      setIsLoadingSessionProps(false);
    }
  
  };

  const handlePauseSession = async () => {
    setIsPaused(true); // Solo pausa la sesión sin desactivarla
    console.log('Sesión pausada');
  };

  const handleResumeSession = async () => {
    setIsPaused(false); // Reanuda la sesión desde donde quedó
    console.log('Sesión reanudada');
  };
  
  // Manejador para terminar la sesión
  const handleEndSession = async () => {
    setIsLoadingSessionProps(true);
    try {
      // Comentar axios por ahora
      // await axios.put('/api/sessions/end'); // Termina la sesión

      setSessionActive(false); // Termina la sesión
      setStudyTimeLeft(0);
      setBreakTimeLeft(0);
      setIsBreakTime(false);
      setIsPaused(false); // Resetea el estado de pausa
      setModalOpen(false);
      console.log('Sesión terminada');
    } catch (error) {
      console.error('Error al terminar la sesión:', error);
    } finally {
      setIsLoadingSessionProps(false);
    }
  };


  const handleSaveSession = async (sessionData) => {
      setIsLoadingSessionProps(true);
      try {
        // Comentar axios por ahora
        // await axios.post('/api/sessions', params); // Guarda la sesión
        setSessionActive(true); // Activa la sesión de estudio
        handleEndSession(); // Cierra el modal después de guardar
        setStudyTimeLeft(sessionData.tiempoEstudio * 60); // Conversión a segundos
        setBreakTimeLeft(sessionData.tiempoRecreo * 60); // Conversión a segundos
        setIsBreakTime(false); // Inicia con tiempo de estudio
        console.log('Sesión guardada con éxito', params);
       
      } catch (error) {
        console.error('Error al guardar la sesión:', error);
      } finally {
        setIsLoadingSessionProps(false);
      }
    };
  

  return (
    <>
      <Header user={user} isLoading={isLoading} />
      <div className="flex w-full h-full bg-[#F5E3D7]">
        <div>
          <LeftNavigator />
          <div className="mt-4 ml-3">
            <button onClick={handleSetSession} className="w-[13rem] bg-blue-500 text-white py-2 px-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700">
              Sesión de Estudio
            </button>
            <StudySessionModal
                open={modalOpen}
                onStart={handleStartSession}
                onEnd={handleEndSession}
                onClose={handleCloseModal}
                onSave={handleSaveSession}
                handleResumeSession = {handleResumeSession}
                handlePauseSession = {handlePauseSession}
                sessionActive= {sessionActive}
                isBreakTime={isBreakTime}
                isPaused={isPaused}
                studyTimeLeft={studyTimeLeft}
                breakTimeLeft={breakTimeLeft}
                formatTime={formatTime}
                getConcentrationEffect={getConcentrationEffect}
            />

            {sessionActive && (
              <StudySessionTimerDialog
                studyTimeLeft={studyTimeLeft}
                breakTimeLeft={breakTimeLeft}
                isBreakTime={isBreakTime}
                getConcentrationEffect={getConcentrationEffect}
              />
            )}
          </div>
        </div>
          {children} {/* Renderiza el contenido de la página aquí */}
      </div>
    </>
  );
};

export default withPageAuthRequired(Layout);
