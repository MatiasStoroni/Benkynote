import React, { useState } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Card, Title } from '@tremor/react';
import { Tab as HeadlessTab } from '@headlessui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

// Registrar los elementos de Chart.js que se utilizarán
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

export default function Dashboard() {
    const exampleTimeData = [
        { apunte: 'Matemáticas', time: 3, studyTime: 2 },
        { apunte: 'Historia', time: 4, studyTime: 3 },
        { apunte: 'Química', time: 2, studyTime: 1 },
    ];

    const exampleExamsData = [
        { examen: 'Parcial Matemáticas', materia: 'Matemáticas', nota: 8 },
        { examen: 'Examen Historia', materia: 'Historia', nota: 7 },
        { examen: 'Parcial Química', materia: 'Química', nota: 6 },
    ];

    const [selectedGraph, setSelectedGraph] = useState(0); // 0 = Tiempos, 1 = Exámenes

    // Datos para el gráfico de torta (Pie)
    const pieData = {
        labels: exampleTimeData.map((item) => item.apunte),
        datasets: [
            {
                data: exampleTimeData.map((item) => item.studyTime),
                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
                hoverBackgroundColor: ['#0077E2', '#00B78E', '#FFAA00'],
            },
        ],
    };

    // Datos para el gráfico de líneas (Line)
    const lineData = {
        labels: exampleExamsData.map((item) => item.examen),
        datasets: [
            {
                label: 'Notas',
                data: exampleExamsData.map((item) => item.nota),
                borderColor: 'orange',
                backgroundColor: 'rgba(255,165,0,0.5)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    // Datos para el gráfico de barras (Bar)
    const barData = {
        labels: exampleExamsData.map((item) => item.examen),
        datasets: [
            {
                label: 'Notas',
                data: exampleExamsData.map((item) => item.nota),
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 1,
            },
        ],
    };

    const handleGenerateReport = () => {
        console.log('Generando reporte...');
    };

    return (
        <div id='dashboard' className="w-full">
            <Card>
                <Title>{selectedGraph === 0 ? 'Tiempo de Estudio por Apunte' : 'Notas de Exámenes por Materia'}</Title>

                <div className="flex items-center justify-between"> {/* Contenedor con flex para alinear el botón y las pestañas */}
                    <button
                        onClick={handleGenerateReport}
                        className="p-2 justify-center bg-green-500 text-white rounded"
                    >
                        Generar Reporte
                    </button>

                    <HeadlessTab.Group selectedIndex={selectedGraph} onChange={setSelectedGraph}>
                        <HeadlessTab.List className="flex space-x-1">
                            <HeadlessTab
                                as="button"
                                className={({ selected }) =>
                                    selected
                                        ? 'p-2 bg-blue-500 text-white rounded'
                                        : 'p-2 bg-gray-200 text-black rounded'
                                }
                            >
                                Tiempos de Estudio
                            </HeadlessTab>
                            <HeadlessTab
                                as="button"
                                className={({ selected }) =>
                                    selected
                                        ? 'p-2 bg-blue-500 text-white rounded'
                                        : 'p-2 bg-gray-200 text-black rounded'
                                }
                            >
                                Exámenes
                            </HeadlessTab>
                        </HeadlessTab.List>
                    </HeadlessTab.Group>
                </div>

                <div className="h-64 mt-4">
                    {selectedGraph === 0 ? (
                        <Pie data={pieData} />
                    ) : (
                        <div>
                            <Bar data={barData} />
                            <div className="h-64 mt-4">
                                <Line data={lineData} />
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
