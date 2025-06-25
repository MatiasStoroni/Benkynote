"use client"
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import esLocale from '@fullcalendar/core/locales/es';
import { useUser } from '@auth0/nextjs-auth0/client'
import { deleteEventFromAPI, getEvents, postEventToAPI, updateEvent } from '../../api/calendar'
import EventInfoDialog from './EventInfoDialog'
import EditEventDialog from './EditEventDialog'
import CreateEventDialog from "./CreateEventDialog";
import LoadingCircle from "@/components/LoadingCircle";


export default function Page() {

  const { user, error, isLoading } = useUser();

  const [allEvents, setAllEvents] = useState([])
  const fileUrl = "";
  let importedCalendar = {
    url: fileUrl, //cambiar con el archivo del usuario
    format: "ics"
  }

  //states for handling modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);


  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFinal: '',
    horaInicio: '',
    horaFinal: '',
  });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  //for handling error messages
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  //handle functions

  const handleDateClick = (info) => {
    setFormData({ ...formData, fechaInicio: info.dateStr });
    setIsCreateOpen(true);
  };



  const handleSubmit = async (e) => {
    e.preventDefault()

    const { fechaInicio, horaInicio, fechaFinal, horaFinal } = formData;

    if (!fechaInicio || !horaInicio || !fechaFinal || !horaFinal) {
      setErrorMessage('Por favor, complete todos los campos de fecha y hora.');
      setIsErrorOpen(true);
      return;
    }

    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinalObj = new Date(fechaFinal);

    if (fechaFinalObj < fechaInicioObj) {
      setErrorMessage('La fecha de finalización debe ser posterior a la fecha de inicio.');
      setIsErrorOpen(true);
      return;
    }

    if (fechaInicio === fechaFinal && horaInicio >= horaFinal) {
      setErrorMessage('La hora de finalización debe ser posterior a la hora de inicio.');
      setIsErrorOpen(true);
      return;
    }


    try {
      await postEvent(formData);

      setAllEvents([...allEvents, transformEvent(formData)]);

      setIsCreateOpen(false);
      getAllEvents(user?.sub)
    } catch (error) {
      console.error('Error al guardar el evento:', error);
    }
  };

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event)
    setSelectedEvent(clickInfo.event);
    setIsInfoOpen(true);
  };



  const handleEditEvent = () => {
    setIsInfoOpen(false);
    setIsEditOpen(true);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      await updateEvent(updatedEvent, user.sub)
      // setAllEvents(allEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
      setIsEditOpen(false);
      getAllEvents(user?.sub)
    } catch (error) {
      console.error('Error al guardar el evento:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEventFromAPI(eventId, user.sub);
      setIsInfoOpen(false);
      getAllEvents(user?.sub)
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }
  };


  // fetch events when component mounts

  useEffect(() => {
    if (user?.sub) {
      getAllEvents(user.sub)
    }
  }, [user]);

  const getAllEvents = async (authId) => {
    const res = await getEvents(authId)

    setAllEvents(formatAllEvents(res))
  };





  // format functions
  const formatAllEvents = (list) => {
    //transform the events so they have the required format for FullCalendar
    let formattedList = [];
    list?.forEach((e) => {
      formattedList.push(transformEvent(e))
    })

    return formattedList;
  }

  const transformEvent = (event) => {
    //simplemente cambia el nombre de los atributos
    return {
      "id": event.id,
      "title": event.nombre,
      "descripcion": event.descripcion,
      "start": event.fechaHoraInicio,
      "end": event.fechaHoraFinal,
    };
  };

  //end format





  const postEvent = async (event) => {
    const startDateTime = combineDateAndTime(event.fechaInicio, event.horaInicio);
    const endDateTime = combineDateAndTime(event.fechaFinal, event.horaFinal);

    const eventToPost = {
      nombre: event.nombre,
      descripcion: event.descripcion,
      fechaHoraInicio: startDateTime.toString(),
      fechaHoraFinal: endDateTime.toString(),
    };

    await postEventToAPI(eventToPost, user?.sub);
    //dejamos vacio el formulario para el proximo evento
    setFormData({
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFinal: '',
      horaInicio: '',
      horaFinal: '',
    })

  }
  const combineDateAndTime = (date, time) => {
    return (date + "T" + time + ":00"); // Formato ISO 8601
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "fechaFinal") {

    }
    setFormData({ ...formData, [name]: value });
  };

  // Check if fields are filled in before activating "Save" button on the form
  useEffect(() => {
    const { nombre, fechaInicio, fechaFinal, horaInicio, horaFinal } = formData;
    const isFormValid =
      nombre.trim() !== '' &&
      fechaInicio.trim() !== '' &&
      fechaFinal.trim() !== '' &&
      horaInicio.trim() !== '' &&
      horaFinal.trim() !== '';
    setIsSaveEnabled(isFormValid);
  }, [formData]);

  return (
    <>

      <div className='bg-white h-[600px] w-full m-5 rounded-lg p-6'>
        <FullCalendar
          locale={esLocale}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            iCalendarPlugin
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
          eventSources={[
            allEvents,
            importedCalendar
          ]}
          // events={allEvents as EventSourceInput}
          fixedWeekCount={false}
          nowIndicator={true}
          selectable={true}
          selectMirror={true}
          dateClick={handleDateClick}
          eventClick={(data) => handleEventClick(data)}
          height={"100%"}
        />
      </div>

      {/* Pop-up message for creating event */}
      <CreateEventDialog
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSaveEnabled={isSaveEnabled}
      />


      {/* pop-up message for seeing the data of the event */}
      <EventInfoDialog
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        event={selectedEvent ? {
          id: selectedEvent.id,
          title: selectedEvent.title,
          descripcion: selectedEvent.extendedProps.descripcion,
          start: selectedEvent.start,
          end: selectedEvent.end,
        } : null}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      {/* pop-up message for editing event */}
      <EditEventDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        event={selectedEvent ? {
          id: selectedEvent.id,
          title: selectedEvent.title,
          description: selectedEvent.extendedProps.descripcion,
          start: selectedEvent.start,
          end: selectedEvent.end,
        } : null}
        onSave={handleUpdateEvent}
      />

      {/* Error Dialog */}
      <Dialog open={isErrorOpen} onClose={() => setIsErrorOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          {/* Backdrop with higher z-index */}
          <div className="fixed inset-0 bg-black opacity-30 z-40"></div>

          {/* Dialog content */}
          <div className="inline-block max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg z-50">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              Error de Validación
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{errorMessage}</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600"
                onClick={() => setIsErrorOpen(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
