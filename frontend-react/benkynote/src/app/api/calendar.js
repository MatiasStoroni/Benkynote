import axios from "axios";
import getJavaId from "./userId";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export async function getEvents(userId) {
  try {

    let userJavaID = await getJavaId(userId);

    const res = await fetch('http://localhost:8080/users/' + userJavaID + '/events');
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("error events: " + e);
  }
}

export async function postEventToAPI(event, userId) {
  console.log(event)
  let userJavaID = await getJavaId(userId);
  try {
    await axios.post('http://localhost:8080/users/'+ userJavaID +'/events', {
      "nombre": event.nombre,
      "descripcion": event.descripcion,
      "fechaHoraInicio": event.fechaHoraInicio,
      "fechaHoraFinal": event.fechaHoraFinal
    }
    )
  } catch (e) {
    console.log("error events: " + e);
  }
}

export async function updateEvent(event, userId) {

  let userJavaID = await getJavaId(userId);
  try {
    console.log(event)
    await axios.put('http://localhost:8080/users/'+ userJavaID +'/events/' + event.id,
      {
        "nombre": event.nombre,
        "descripcion": event.descripcion,
        "fechaHoraInicio": event.fechaHoraInicio,
        "fechaHoraFinal": event.fechaHoraFinal
      }
    )
  } catch (e) {
    console.log("error events: " + e);
  }
}

export async function deleteEventFromAPI(id, userId) {
  let userJavaID = await getJavaId(userId);
  try {
    await axios.delete('http://localhost:8080/users/'+ userJavaID +'/events/' + id);
  } catch (e) {
    console.log("error events: " + e);
  }
}