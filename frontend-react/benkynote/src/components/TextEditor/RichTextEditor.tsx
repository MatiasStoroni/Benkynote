"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import { CodeBlock } from '@tiptap/extension-code-block';
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";
import ToolBar from "./Toolbar";

import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor';

// COLLAB
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import React, { useState, useEffect } from 'react';

import Collaboration from '@tiptap/extension-collaboration';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// HOCUSPOCUS
import { TiptapCollabProvider } from '@hocuspocus/provider';
import { useUser } from "@auth0/nextjs-auth0/client";

const doc = new Y.Doc(); // Initialize Y.Doc for shared editing

export default function RichTextEditor({ content, apunte }) {
  const [provider, setProvider] = useState(null);
  const { user, isLoading } = useUser();

  // Si los datos del usuario aún están cargándose, mostramos un indicador
  if (isLoading || !user) {
    return <p>Cargando editor...</p>; // O mostrar un loader
  }

  const username = user?.nickname || user?.name || user?.email || user?.sub || ("Invitado" + user.name);

  // Función para generar colores aleatorios
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    if (apunte) {
      // Crear un documento Yjs y WebSocket para el apunte específico
      const ydoc = new Y.Doc();

      // Intenta conectar al WebSocket
      const wsProvider = new WebsocketProvider(`ws://localhost:1234`, apunte.id, ydoc);

      wsProvider.on('status', (status) => {
        // Manejar el estado de la conexión
        if (status == 'connected') {
          console.log('Conectado al WebSocket');
        } else {
          console.error('Conexión al WebSocket fallida:', status);
        }
      });

      setProvider(wsProvider);  // Establece el provider WebSocket
      return () => {
        wsProvider.destroy(); // Destruir el WebSocket cuando se cambie de apunte
      };
    }
  }, [apunte.id]);


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Deshabilita el historial por defecto para usar el historial de Collaboration
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: (level) => ({
          class: level == 1 ? "text-3xl font-bold" : level == 2 ? "text-2xl font-bold" : "text-xl font-bold",
        }),
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Highlight,
      CodeBlock,
      Image,
      ImageResize,
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc, // Configura Y.Doc para colaboración
      }),
      provider ? CollaborationCursor.configure({
        provider: provider, // El proveedor WebSocket, solo si está disponible
        user: {
          name: username, // Aquí puedes pasar el nombre del usuario
          color: getRandomColor(), // El color que representa al usuario
        },
        render: (user) => {
          const cursor = document.createElement('span');
          cursor.classList.add('collaboration-cursor__caret');
          cursor.style.borderColor = user.color;

          const label = document.createElement('div');
          label.classList.add('collaboration-cursor__label');
          label.textContent = user.name;
          label.style.backgroundColor = user.color;

          const line = document.createElement('div');
          line.classList.add('collaboration-cursor__line');
          line.style.backgroundColor = user.color;

          const container = document.createElement('span');
          container.classList.add('collaboration-cursor');
          container.append(cursor, label, line);

          return container;
        },
      }) : null, // Verificación para evitar que CollaborationCursor se configure sin provider
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  return (
    <>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
