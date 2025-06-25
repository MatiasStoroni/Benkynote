import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { NextResponse } from "next/server";


export const POST = withApiAuthRequired(async function POST(req) {
  const { accessToken } = await getAccessToken(req);
  
  const {user} = req;

  const backendUrl = process.env.JAVA_BACKEND_URL || 'http://localhost:8080'
  
  

  try {
    // Send user data to the Java backend
    const response = await axios.post(`${backendUrl}/users/sync`, user, 
      {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
      withCredentials: true,
      }
    
    );

    console.log(NextResponse.json)

    return NextResponse.json({ message: 'User sync completed', data: response.data });

  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ message: 'Error syncing user', error: error.message });
  }
});