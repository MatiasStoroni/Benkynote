'use client';

import { getAccessToken, GetAccessToken } from '@auth0/nextjs-auth0';
import { useState } from 'react';

import Image from 'next/image';
import NavBar from '@/components/Home/NavBar';
import MainPage from '@/components/Home/MainPage';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Admin() {
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const { accessToken } = await getAccessToken();
      console.log('Token:', accessToken);
      setToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <NavBar></NavBar>
      <MainPage></MainPage> */}
    </>
  );
}
