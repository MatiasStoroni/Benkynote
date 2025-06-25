"use client";
import RichTextEditor from "@/components/TextEditor/RichTextEditor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/TextEditor/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {

    const [apunte, setApunte] = useState(null);

    const { apunteId } = useParams(); // Obtiene apunteid de la URL


    function handleChange() {
        console.log("works!")
    }

    useEffect(() => {
        const selectedApunte = localStorage.getItem('selectedApunte');

        setApunte(JSON.parse(selectedApunte));
    }, []);

    if (!apunteId || !apunte) {
        return <p>Cargando...</p>;  // Muestra un mensaje de carga mientras obtienes el apunteid
    }

    return (
        <div className="bg-white min-h-[600px] overflow-y-auto w-full m-5 rounded-lg p-6">

            <h1>{apunte.nombreApunte}</h1>
            <h1>ID: {apunteId}</h1>
            <RichTextEditor
                content={apunte.contenidoApunte}
                apunte={apunte}
            />
            <button>Guardar</button>
        </div>
    );
}