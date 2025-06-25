import React from "react";

const LoadingCircle = () => {
  return (
    <div className='bg-white h-[600px] w-full m-5 rounded-lg p-6 flex flex-col justify-center items-center'>
      <p className="mb-4">Cargando datos del usuario...</p>
      <LoadingCircle />
    </div>
  );
};

export default LoadingCircle;