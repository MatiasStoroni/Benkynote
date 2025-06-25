// pages/_error.js
import React from 'react';
import Link from 'next/link';

function ErrorPage({ statusCode, message }) {
    return (
        <div className="text-xl text-red-800 font-bold" style={{ textAlign: 'center', padding: '50px' }}>
            <h1>{statusCode ? `Error ${statusCode}` : 'Ocurrió un error inesperado.'}</h1>
            {message && <p>{message}</p>}
            <p>
                <Link href="/" className="text-blue-600 underline font-medium" >
                    Volver a la página principal.
                </Link>
            </p>
        </div>
    );
}

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    const message = err ? err.message : 'Algo salió mal, intente más tarde.';

    return { statusCode, message };
};

export default ErrorPage;