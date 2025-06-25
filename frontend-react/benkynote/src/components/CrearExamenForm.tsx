'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
// import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MultiSelect from './MultiSelect';
import { Option } from '@/components/ui/multiple-selector';

type Subject = {
  id: string;
  name: string;
};

type Note = {
  id: string;
  name: string;
  subject: string;
};

export default function GenerateExamForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [structure, setStructure] = useState('');

  // Datos hardcodeados de ejemplo para Materias y Apuntes
  const subjects: Option[] = [
    { label: 'Matemáticas', value: 'matemáticas' },
    { label: 'Física', value: 'física' },
    { label: 'Química', value: 'química' },
    { label: 'Biología', value: 'biología' },
    { label: 'Historia', value: 'historia' },
  ];

  const notes: Option[] = [
    { label: 'Álgebra básica', value: 'álgebra básica' },
    { label: 'Cinemática', value: 'cinemática' },
    { label: 'Tabla periódica', value: 'tabla periódica' },
    { label: 'Célula', value: 'célula' },
    { label: 'Revolución Francesa', value: 'revolución francesa' },
  ];

  const handleSubjectToggle = (subject: Subject) => {
    setSelectedSubjects((prev) =>
      prev.some((s) => s.id === subject.id)
        ? prev.filter((s) => s.id !== subject.id)
        : [...prev, subject]
    );
  };

  const handleNoteSelect = (note: Note) => {
    if (!selectedNotes.find((n) => n.id === note.id)) {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const handleNoteRemove = (noteId: string) => {
    setSelectedNotes(selectedNotes.filter((n) => n.id !== noteId));
  };

  const handleSubmit = () => {
    // Implement exam generation logic here
    console.log('Generating exam...', {
      name,
      selectedSubjects,
      selectedNotes,
      description,
      duration,
      structure,
    });
    setIsOpen(false); // Close the dialog after submission
  };

  const isFormValid =
    name &&
    selectedSubjects.length > 0 &&
    selectedNotes.length > 0 &&
    duration &&
    structure;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Crear Examen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] rounded-lg max-h-screen h-[90vh] bg-blue-50 dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-2 text-center text-indigo-700">
            Generar Examen
          </DialogTitle>
          {/* <DialogDescription>
            Complete los siguientes campos para crear un nuevo examen.
          </DialogDescription> */}
        </DialogHeader>
        <div className="w-full mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 overflow-hidden overflow-y-auto">
          <div className="max-h-full space-y-6">
            <div>
              <Label htmlFor="name" className="text-indigo-700">
                Nombre *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 bg-white border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-indigo-700 my-4">Materia/s *</Label>
              <MultiSelect
                options={subjects}
                placeholder="Selecciona las materias"
              ></MultiSelect>
            </div>

            <div>
              <Label className="text-indigo-700">Apunte/s *</Label>
              <MultiSelect
                options={notes}
                placeholder="Selecciona los apuntes"
              ></MultiSelect>
            </div>
            <div>
              <Label htmlFor="description" className="text-indigo-700">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 bg-white border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-indigo-700">
                Duración *
              </Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-white border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Seleccionar duración" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="45">45 minutos</SelectItem>
                  <SelectItem value="60">60 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="structure" className="text-indigo-700">
                Estructura de examen *
              </Label>
              <Select value={structure} onValueChange={setStructure}>
                <SelectTrigger className="bg-white border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Seleccionar estructura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="closed">Ejercicios Cerrados</SelectItem>
                  <SelectItem value="open">Ejercicios Abiertos</SelectItem>
                  <SelectItem value="mixed">Ejercicios Mixtos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-indigo-500 text-indigo-700 hover:bg-indigo-50"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Simular Examen
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
