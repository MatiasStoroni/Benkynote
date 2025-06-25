import React from 'react';

interface StudySessionTimerDialogProps {
  studyTimeLeft: number;
  breakTimeLeft: number;
  isBreakTime: boolean;
  getConcentrationEffect: ()=>void;
}



const StudySessionTimerDialog: React.FC<StudySessionTimerDialogProps> = ({
  studyTimeLeft,
  breakTimeLeft,
  isBreakTime,
  getConcentrationEffect
}) => {
  // Formato del tiempo en minutos y segundos'

  //console.log("Temporizador se está renderizando");
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`p-4 rounded-md shadow-lg mt-2 transition-colors duration-500 ${getConcentrationEffect()} `}>
      <h3 className="text-lg font-semibold">
        {isBreakTime ? 'Tiempo de Recreo' : 'Tiempo de Estudio'}:
      </h3>
      <div className="mt-2 text-center">
        {/* Se usa un width fijo para que el temporizador no cambie de tamaño */}
        <span className="inline-block w-[80px] text-center text-3xl">
          {isBreakTime ? formatTime(breakTimeLeft) : formatTime(studyTimeLeft)}
        </span>
      </div>
    </div>
  );
  
};

export default StudySessionTimerDialog;

