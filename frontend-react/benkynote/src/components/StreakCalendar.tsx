import { useState } from 'react';
import { Calendar, Badge } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'; 

export default function StreakCalendar() {
    const [studyStreak, setStudyStreak] = useState(5);
    const studyDates = ['2024-10-08', '2024-10-09', '2024-10-10', '2024-10-11', '2024-10-12'];

    const isStudyDay = (date) => {
        const dateString = date.toISOString().split('T')[0];
        return studyDates.includes(dateString);
    };

    return (
        <div id='calendar' className="w-[300px] mb-6">
            <h1 className="text-xl font-bold mb-4 text-center">Racha de Estudio: 
                <span className="text-blue-500 ml-2">{studyStreak} días</span>
            </h1>
            <Calendar
                style={{ 
                    backgroundColor: '#3b82f6', // Fondo azul claro
                    borderRadius: '20px', // Bordes redondeados
                    padding: '20px', // Espaciado interno
                    width: '100%', // Ajustar ancho
                    maxWidth: '500px', 
                    maxHeight: '500px'
                }}
                tileContent={({ date }) => 
                    isStudyDay(date) ? (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            backgroundColor: '#FFD700', // Fondo amarillo
                            borderRadius: '50%', // Redondear el fondo
                            width: '40px', 
                            height: '40px' 
                        }}>
                            🔥
                        </div>
                    ) : null
                }
                tileClassName={({ date }) => 
                    isStudyDay(date) ? 'bg-yellow-400' : ''
                }
                dayClassName={(date) => 
                    isStudyDay(date) ? 'border-4 border-yellow-500 rounded-lg' : ''
                } // Marcar el borde con amarillo y redondear el día
            />
        </div>
    );
}
