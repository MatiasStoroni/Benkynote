export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { content } = req.body;

        try {
            // Guarda el contenido en tu base de datos o archivo
            // Aquí puedes hacer una operación como escribir en un archivo, guardar en una base de datos, etc.

            // Simulando el guardado con un console.log
            console.log('Contenido guardado:', content);

            // Envía una respuesta exitosa
            res.status(200).json({ message: 'Contenido guardado correctamente' });
        } catch (error) {
            console.error('Error al guardar el contenido:', error);
            res.status(500).json({ message: 'Error al guardar el contenido' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
