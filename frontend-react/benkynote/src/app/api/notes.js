import axios from "axios";
import getJavaId from "./userId";

export async function getNotes(userId) {
  try {

    let userJavaID = await getJavaId(userId);
    console.log("JAVA ID: " + userJavaID)

    const res = await axios.get('http://localhost:8080/users/' + userJavaID + '/notes/user');
    return res;
  } catch (e) {
    console.log("error notes: " + e);
  }
}

export async function postNote(note, userId) {
  console.log(note)
  let userJavaID = await getJavaId(userId);
  try {
    await axios.post('http://localhost:8080/users/' + userJavaID + '/notes/createNote', {
      "nombreApunte": note.nombreApunte,
      "etiquetaApunte": note.etiquetaApunte,
      "esTranscripcion": false,
      "contenidoApunte": note.contenidoApunte,
      "nombreMateria": note.nombreMateria,
      "colaboradoresEmail": note.colaboradores
    }
    )
  } catch (e) {
    console.log("error notes: " + e);
  }
}


export async function deleteNote(note, userId) {
  console.log(note)
  let userJavaID = await getJavaId(userId);
  try {
    const res = await axios.delete('http://localhost:8080/users/' + userJavaID + '/notes/' + note.id + '/deleteNote');
    return res;
  } catch (e) {
    console.log("error notes: " + e);
  }
}


export async function updateNote(note, userId) {
  console.log(note)
  let userJavaID = await getJavaId(userId);
  try {
    await axios.put('http://localhost:8080/users/' + userJavaID + '/notes/' + note.id + '/deleteNote', {
      "nombreApunte": note.nombreApunte,
      "etiquetaApunte": note.etiquetaApunte,
      "esTranscripcion": false,
      "contenidoApunte": note.contenidoApunte,
      "nombreMateria": note.nombreMateria,
      "colaboradoresEmail": note.colaboradores
    }
    )
  } catch (e) {
    console.log("error notes: " + e);
  }
}


export async function getSubjects() {
  try {
    const res = await axios.get('http://localhost:8080/subjects');
    return res;
  } catch (e) {
    console.log("error notes: " + e);
  }
}