import axios from "axios";

export default async function getJavaId(userAuthId) {

    //call function that sends auth ID and gets the Database ID
    try {
        const res = await axios.post('http://localhost:8080/users/getJavaId', {
         "userId": userAuthId
        })
        return res.data;
    } catch (e) {
        console.log("error get JAVA ID: ", e);
    }
  
  }