import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DeletePopup from '@/components/DeletePopup';

// const products = [
//   {
//     id: '1001',
//     code: 'nvklal433',
//     name: 'Black Watch',
//     description: 'Sleek and modern design watch.',
//     image: 'black-watch.jpg',
//     price: 75,
//     category: 'Accessories',
//     quantity: 15,
//     inventoryStatus: 'INSTOCK',
//     rating: 4,
//   },
//   {
//     id: '1002',
//     code: 'zz21cz3c1',
//     name: 'Blue T-Shirt',
//     description: 'Comfortable cotton t-shirt.',
//     image: 'blue-tshirt.jpg',
//     price: 20,
//     category: 'Clothing',
//     quantity: 45,
//     inventoryStatus: 'OUTOFSTOCK',
//     rating: 3,
//   },
//   {
//     id: '1003',
//     code: '244wgerg2',
//     name: 'Gaming Mouse',
//     description: 'High precision gaming mouse.',
//     image: 'gaming-mouse.jpg',
//     price: 40,
//     category: 'Electronics',
//     quantity: 32,
//     inventoryStatus: 'INSTOCK',
//     rating: 5,
//   },
//   {
//     id: '1004',
//     code: 'h456wer53',
//     name: 'Leather Wallet',
//     description: 'Stylish leather wallet.',
//     image: 'leather-wallet.jpg',
//     price: 35,
//     category: 'Accessories',
//     quantity: 18,
//     inventoryStatus: 'INSTOCK',
//     rating: 4,
//   },
//   {
//     id: '1005',
//     code: 'ghr4523g2',
//     name: 'Smartphone',
//     description: 'Latest model with cutting-edge features.',
//     image: 'smartphone.jpg',
//     price: 699,
//     category: 'Electronics',
//     quantity: 10,
//     inventoryStatus: 'INSTOCK',
//     rating: 5,
//   },
//   {
//     id: '1006',
//     code: 'jkl2334d2',
//     name: 'Running Shoes',
//     description: 'Lightweight and durable running shoes.',
//     image: 'running-shoes.jpg',
//     price: 120,
//     category: 'Clothing',
//     quantity: 22,
//     inventoryStatus: 'LOWSTOCK',
//     rating: 4,
//   },
//   {
//     id: '1007',
//     code: 'rty56yu7f',
//     name: 'Bluetooth Headphones',
//     description: 'Noise-cancelling over-ear headphones.',
//     image: 'bluetooth-headphones.jpg',
//     price: 150,
//     category: 'Electronics',
//     quantity: 8,
//     inventoryStatus: 'INSTOCK',
//     rating: 5,
//   },
//   {
//     id: '1008',
//     code: 'lkj0988j7',
//     name: 'Brown Boots',
//     description: 'Premium quality leather boots.',
//     image: 'brown-boots.jpg',
//     price: 85,
//     category: 'Clothing',
//     quantity: 12,
//     inventoryStatus: 'LOWSTOCK',
//     rating: 4,
//   },
//   {
//     id: '1009',
//     code: 'pol99dd4f',
//     name: 'Desk Lamp',
//     description: 'Modern LED desk lamp.',
//     image: 'desk-lamp.jpg',
//     price: 30,
//     category: 'Furniture',
//     quantity: 28,
//     inventoryStatus: 'INSTOCK',
//     rating: 3,
//   },
//   {
//     id: '1010',
//     code: 'yty22gf56',
//     name: 'Water Bottle',
//     description: 'Reusable water bottle with filter.',
//     image: 'water-bottle.jpg',
//     price: 15,
//     category: 'Accessories',
//     quantity: 50,
//     inventoryStatus: 'INSTOCK',
//     rating: 4,
//   },
//   {
//     id: '1011',
//     code: 'ppoi8765r',
//     name: 'Wireless Keyboard',
//     description: 'Compact wireless keyboard.',
//     image: 'wireless-keyboard.jpg',
//     price: 45,
//     category: 'Electronics',
//     quantity: 20,
//     inventoryStatus: 'INSTOCK',
//     rating: 4,
//   },
//   {
//     id: '1012',
//     code: 'iouyt55d2',
//     name: 'Sunglasses',
//     description: 'Polarized lenses for better protection.',
//     image: 'sunglasses.jpg',
//     price: 60,
//     category: 'Accessories',
//     quantity: 30,
//     inventoryStatus: 'INSTOCK',
//     rating: 5,
//   },
//   {
//     id: '1013',
//     code: 'qwerty98r',
//     name: 'Laptop Stand',
//     description: 'Adjustable ergonomic laptop stand.',
//     image: 'laptop-stand.jpg',
//     price: 50,
//     category: 'Furniture',
//     quantity: 25,
//     inventoryStatus: 'LOWSTOCK',
//     rating: 4,
//   },
//   {
//     id: '1014',
//     code: 'dsp9872j8',
//     name: 'Electric Kettle',
//     description: 'Fast boiling electric kettle.',
//     image: 'electric-kettle.jpg',
//     price: 35,
//     category: 'Home Appliances',
//     quantity: 14,
//     inventoryStatus: 'INSTOCK',
//     rating: 3,
//   },
//   {
//     id: '1015',
//     code: 'asop9844j',
//     name: 'Fitness Tracker',
//     description: 'Track your daily activity and health.',
//     image: 'fitness-tracker.jpg',
//     price: 99,
//     category: 'Electronics',
//     quantity: 35,
//     inventoryStatus: 'INSTOCK',
//     rating: 4,
//   },
// ];

const examenMock = [
  {
    idExamen: 1,
    nombreExamen: 'Matemáticas I - Parcial 1',
    descripcionExamen: 'Primer parcial de la materia.',
    fechaAltaExamen: '2024-03-01T08:00:00',
    fechaResolucionExamen: '2024-03-15T10:00:00',
    fechaFinVigenciaExamen: '2024-05-01T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 8.5,
    duracionExamen: 60,
    estructuraExamen: 'Cerrado',
  },
  {
    idExamen: 2,
    nombreExamen: 'Historia Contemporánea - Final',
    descripcionExamen: null,
    fechaAltaExamen: '2024-04-10T09:00:00',
    fechaResolucionExamen: '2024-04-25T11:30:00',
    fechaFinVigenciaExamen: '2024-06-10T23:59:59',
    estadoExamen: 'Desaprobado',
    calificacionExamen: 3.2,
    duracionExamen: 45,
    estructuraExamen: 'Mixto',
  },
  {
    idExamen: 3,
    nombreExamen: 'Física II - Parcial 2',
    descripcionExamen: 'Segundo parcial de la materia.',
    fechaAltaExamen: '2024-05-05T08:30:00',
    fechaResolucionExamen: null,
    fechaFinVigenciaExamen: '2024-07-05T23:59:59',
    estadoExamen: 'Pendiente',
    calificacionExamen: null,
    duracionExamen: 30,
    estructuraExamen: 'Cerrado',
  },
  {
    idExamen: 4,
    nombreExamen: 'Química General - Parcial 1',
    descripcionExamen: 'Examen escrito con preguntas de desarrollo.',
    fechaAltaExamen: '2024-02-15T07:45:00',
    fechaResolucionExamen: '2024-03-01T10:15:00',
    fechaFinVigenciaExamen: '2024-05-15T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 9.0,
    duracionExamen: 45,
    estructuraExamen: 'Abierto',
  },
  {
    idExamen: 5,
    nombreExamen: 'Economía - Examen Final',
    descripcionExamen: 'Examen de tipo múltiple choice.',
    fechaAltaExamen: '2024-06-01T08:00:00',
    fechaResolucionExamen: null,
    fechaFinVigenciaExamen: '2024-08-01T23:59:59',
    estadoExamen: 'Sin nota',
    calificacionExamen: null,
    duracionExamen: 60,
    estructuraExamen: 'Cerrado',
  },
  {
    idExamen: 6,
    nombreExamen: 'Cálculo III - Parcial 2',
    descripcionExamen: 'Ejercicios de desarrollo y preguntas cerradas.',
    fechaAltaExamen: '2024-05-20T10:00:00',
    fechaResolucionExamen: '2024-06-01T12:00:00',
    fechaFinVigenciaExamen: '2024-07-20T23:59:59',
    estadoExamen: 'Desaprobado',
    calificacionExamen: 4.0,
    duracionExamen: 30,
    estructuraExamen: 'Mixto',
  },
  {
    idExamen: 7,
    nombreExamen: 'Biología Molecular - Parcial Único',
    descripcionExamen: null,
    fechaAltaExamen: '2024-04-05T09:15:00',
    fechaResolucionExamen: '2024-04-20T10:45:00',
    fechaFinVigenciaExamen: '2024-06-05T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 7.8,
    duracionExamen: 60,
    estructuraExamen: 'Abierto',
  },
  {
    idExamen: 8,
    nombreExamen: 'Derecho Constitucional - Primer Parcial',
    descripcionExamen: 'Preguntas cerradas y abiertas.',
    fechaAltaExamen: '2024-03-10T07:30:00',
    fechaResolucionExamen: '2024-03-25T09:00:00',
    fechaFinVigenciaExamen: '2024-05-10T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 6.5,
    duracionExamen: 45,
    estructuraExamen: 'Mixto',
  },
  {
    idExamen: 9,
    nombreExamen: 'Algoritmos y Estructuras de Datos - Final',
    descripcionExamen: 'Evaluación de programación y teoría.',
    fechaAltaExamen: '2024-07-01T10:30:00',
    fechaResolucionExamen: '2024-07-15T13:00:00',
    fechaFinVigenciaExamen: '2024-09-01T23:59:59',
    estadoExamen: 'Desaprobado',
    calificacionExamen: 2.8,
    duracionExamen: 60,
    estructuraExamen: 'Abierto',
  },
  {
    idExamen: 10,
    nombreExamen: 'Programación Orientada a Objetos - Parcial 1',
    descripcionExamen: null,
    fechaAltaExamen: '2024-08-01T08:45:00',
    fechaResolucionExamen: '2024-08-20T11:00:00',
    fechaFinVigenciaExamen: '2024-09-30T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 8.0,
    duracionExamen: 30,
    estructuraExamen: 'Mixto',
  },
  {
    idExamen: 11,
    nombreExamen: 'Bases de Datos - Primer Parcial',
    descripcionExamen: 'Evaluación teórico-práctica.',
    fechaAltaExamen: '2024-02-20T09:30:00',
    fechaResolucionExamen: null,
    fechaFinVigenciaExamen: '2024-04-20T23:59:59',
    estadoExamen: 'Pendiente',
    calificacionExamen: null,
    duracionExamen: 45,
    estructuraExamen: 'Cerrado',
  },
  {
    idExamen: 12,
    nombreExamen: 'Ingeniería de Software - Final',
    descripcionExamen: 'Examen oral y escrito.',
    fechaAltaExamen: '2024-06-15T10:00:00',
    fechaResolucionExamen: '2024-06-30T12:30:00',
    fechaFinVigenciaExamen: '2024-08-15T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 9.2,
    duracionExamen: 60,
    estructuraExamen: 'Abierto',
  },
  {
    idExamen: 13,
    nombreExamen: 'Análisis Matemático - Recuperatorio Parcial 1',
    descripcionExamen: 'Recuperación del primer parcial.',
    fechaAltaExamen: '2024-04-01T07:00:00',
    fechaResolucionExamen: '2024-04-12T09:30:00',
    fechaFinVigenciaExamen: '2024-06-01T23:59:59',
    estadoExamen: 'Desaprobado',
    calificacionExamen: 4.5,
    duracionExamen: 45,
    estructuraExamen: 'Cerrado',
  },
  {
    idExamen: 14,
    nombreExamen: 'Lengua y Literatura - Parcial Único',
    descripcionExamen: 'Examen integrador final.',
    fechaAltaExamen: '2024-05-05T09:00:00',
    fechaResolucionExamen: '2024-05-20T10:30:00',
    fechaFinVigenciaExamen: '2024-07-05T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 8.8,
    duracionExamen: 60,
    estructuraExamen: 'Abierto',
  },
  {
    idExamen: 15,
    nombreExamen: 'Sistemas Operativos - Parcial 2',
    descripcionExamen: 'Evaluación de conceptos de sistemas.',
    fechaAltaExamen: '2024-03-20T08:15:00',
    fechaResolucionExamen: null,
    fechaFinVigenciaExamen: '2024-05-20T23:59:59',
    estadoExamen: 'Pendiente',
    calificacionExamen: null,
    duracionExamen: 30,
    estructuraExamen: 'Mixto',
  },
  {
    idExamen: 16,
    nombreExamen: 'Ética Profesional - Examen Final',
    descripcionExamen: 'Evaluación de casos prácticos y teoría.',
    fechaAltaExamen: '2024-06-01T09:45:00',
    fechaResolucionExamen: '2024-06-20T11:00:00',
    fechaFinVigenciaExamen: '2024-08-01T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 9.5,
    duracionExamen: 60,
    estructuraExamen: 'Abierto',
  },
  {
    idExamen: 17,
    nombreExamen: 'Sociología - Examen Final',
    descripcionExamen: null,
    fechaAltaExamen: '2024-04-10T10:30:00',
    fechaResolucionExamen: '2024-04-25T12:15:00',
    fechaFinVigenciaExamen: '2024-06-10T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 7.2,
    duracionExamen: 45,
    estructuraExamen: 'Cerrado',
  },
  {
    idExamen: 18,
    nombreExamen: 'Redes - Parcial Único',
    descripcionExamen: 'Examen sobre redes de computadoras.',
    fechaAltaExamen: '2024-07-15T08:00:00',
    fechaResolucionExamen: '2024-07-30T10:00:00',
    fechaFinVigenciaExamen: '2024-09-15T23:59:59',
    estadoExamen: 'Desaprobado',
    calificacionExamen: 5.0,
    duracionExamen: 60,
    estructuraExamen: 'Cerrado',
  },
  {
    idExamen: 19,
    nombreExamen: 'Filosofía - Recuperatorio Final',
    descripcionExamen: 'Recuperación del examen final.',
    fechaAltaExamen: '2024-05-05T08:00:00',
    fechaResolucionExamen: '2024-05-15T10:30:00',
    fechaFinVigenciaExamen: '2024-07-05T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 6.5,
    duracionExamen: 30,
    estructuraExamen: 'Mixto',
  },
  {
    idExamen: 20,
    nombreExamen: 'Estadística - Parcial 1',
    descripcionExamen: 'Preguntas cerradas sobre estadística descriptiva.',
    fechaAltaExamen: '2024-03-20T09:30:00',
    fechaResolucionExamen: '2024-04-01T11:00:00',
    fechaFinVigenciaExamen: '2024-06-20T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 8.0,
    duracionExamen: 45,
    estructuraExamen: 'Cerrado',
  },
  {
    idExamen: 21,
    nombreExamen: 'Introducción a la Programación - Primer Parcial',
    descripcionExamen:
      'Examen teórico práctico de introducción a la programación.',
    fechaAltaExamen: '2024-09-01T09:00:00',
    fechaResolucionExamen: null,
    fechaFinVigenciaExamen: '2024-11-01T23:59:59',
    estadoExamen: 'Pendiente',
    calificacionExamen: null,
    duracionExamen: 45,
    estructuraExamen: 'Mixto',
  },
  {
    idExamen: 22,
    nombreExamen: 'Ciencias Políticas - Parcial Único',
    descripcionExamen: 'Examen de desarrollo sobre teorías políticas.',
    fechaAltaExamen: '2024-06-15T10:15:00',
    fechaResolucionExamen: '2024-06-30T12:00:00',
    fechaFinVigenciaExamen: '2024-08-15T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 7.9,
    duracionExamen: 60,
    estructuraExamen: 'Abierto',
  },
  {
    idExamen: 23,
    nombreExamen: 'Tecnología de los Materiales - Examen Final',
    descripcionExamen: 'Evaluación teórico-práctica sobre materiales.',
    fechaAltaExamen: '2024-04-25T08:45:00',
    fechaResolucionExamen: '2024-05-10T10:00:00',
    fechaFinVigenciaExamen: '2024-06-25T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 9.0,
    duracionExamen: 60,
    estructuraExamen: 'Mixto',
  },
  {
    idExamen: 24,
    nombreExamen: 'Sistemas de Información - Primer Parcial',
    descripcionExamen: 'Examen sobre diseño de sistemas de información.',
    fechaAltaExamen: '2024-05-01T09:00:00',
    fechaResolucionExamen: null,
    fechaFinVigenciaExamen: '2024-07-01T23:59:59',
    estadoExamen: 'Pendiente',
    calificacionExamen: null,
    duracionExamen: 30,
    estructuraExamen: 'Abierto',
  },
  {
    idExamen: 25,
    nombreExamen: 'Lógica Matemática - Parcial 2',
    descripcionExamen: 'Evaluación de lógica formal y proposicional.',
    fechaAltaExamen: '2024-06-05T07:30:00',
    fechaResolucionExamen: '2024-06-20T09:45:00',
    fechaFinVigenciaExamen: '2024-08-05T23:59:59',
    estadoExamen: 'Aprobado',
    calificacionExamen: 8.7,
    duracionExamen: 45,
    estructuraExamen: 'Cerrado',
  },
];

export default function TablePR() {
  //   const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     ProductService.getProductsMini().then((data) => setProducts(data));
  //   }, []);

  return (
    <div className="card dark:bg-slate-800">
      <DataTable
        value={examenMock}
        tableClassName="min-w-full dark:bg-slate-800"
        showGridlines
        stripedRows
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10]}
        paginatorClassName="bg-blue-50 dark:bg-slate-800 dark:text-white"
        editMode="row"
        // rowClassName={(rowData) =>
        //   rowData.calificacionExamen < 7
        //     ? 'bg-red-50 dark:bg-red-900'
        //     : 'bg-green-50 dark:bg-green-900'
        // }
      >
        <Column
          field="idExamen"
          header="ID"
          className="dark:bg-slate-700 dark:text-white"
          headerClassName="dark:bg-slate-800 dark:text-white border-[2px] border-white"
          sortable
          style={{ width: '10%' }}
        ></Column>
        <Column
          field="nombreExamen"
          header="Nombre"
          className="dark:bg-slate-700 dark:text-white"
          headerClassName="dark:bg-slate-800 dark:text-white border-[2px] border-white"
          style={{ width: '40%' }}
          sortable
        ></Column>
        {/* <Column
          field="descripcionExamen"
          header="Descripción"
          style={{ width: '25%' }}
          sortable
        ></Column> */}
        <Column
          field="calificacionExamen"
          header="Calificación"
          className="dark:bg-slate-700 dark:text-white"
          headerClassName="dark:bg-slate-800 dark:text-white border-[2px] border-white"
          style={{ width: '10%' }}
          sortable
        ></Column>
        <Column
          field="estadoExamen"
          header="Estado"
          className="dark:bg-slate-700 dark:text-white"
          headerClassName="dark:bg-slate-800 dark:text-white border-[2px] border-white"
          style={{ width: '12%' }}
          sortable
        ></Column>
        <Column
          field="fechaResolucionExamen"
          header="Fecha de Resolución"
          className="dark:bg-slate-700 dark:text-white"
          headerClassName="dark:bg-slate-800 dark:text-white border-[2px] border-white"
          style={{ width: '20%' }}
          sortable
        ></Column>
        <Column
          header="Acciones"
          style={{ width: '5%' }}
          className="dark:bg-slate-700 dark:text-white"
          headerClassName="dark:bg-slate-800 dark:text-white border-[2px] border-white"
          body={
            <DeletePopup
              title="Eliminar Examen"
              desc1="Está seguro/a de que quiere eliminar el examen?"
              desc2="Si elimina el examen no podrá recuperarlo."
            ></DeletePopup>
          }
          //   bodyClassName={(rowData) =>
          //     rowData.calificacionExamen < 0
          //       ? 'bg-red-50 dark:bg-red-900'
          //       : 'bg-green-50 dark:bg-green-900'
          //   }
          //   bodyClassName={'flex justify-center m-auto'}
        ></Column>
      </DataTable>
    </div>
  );
}
