import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { mergeRefs } from 'rsuite/esm/internals/utils';

interface Item {
  id: string;
  content: string;
  position: number;
}

interface JoinWithArrowsProps {
  input: string;
}

const DraggableItem: React.FC<{
  item: Item;
  isAssociated: boolean;
}> = ({ item, isAssociated }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ITEM',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: !isAssociated,
  }));

  const combinedRef = useRef<HTMLDivElement>(null);

  // Combina el dragRef con el ref del motion.div
  useEffect(() => {
    if (dragRef && combinedRef.current) {
      dragRef(combinedRef.current);
    }
  }, [dragRef]);

  return (
    
    <motion.div
      ref={combinedRef}
      className={`p-4 mb-2 rounded-md shadow-sm cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${isAssociated ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
      whileHover={{ scale: isAssociated ? 1 : 1.02 }}
      whileTap={{ scale: isAssociated ? 1 : 0.98 }}
    >
      {`${item.position}. ${item.content}`}
    </motion.div>
  );
};

const DropTarget: React.FC<{
  id: string;
  onDrop: (conceptId: string, definitionId: string) => void;
  onRemove: (conceptId: string) => void;
  associatedDefinition: Item | null;
  children: React.ReactNode;
}> = ({ id, onDrop, onRemove, children, associatedDefinition }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item: { id: string }) => onDrop(id, item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const combinedRef = mergeRefs(drop);
  return (
    <motion.div
      ref={combinedRef}
      className={`p-4 mb-2 rounded-md transition-colors duration-200 ${
        isOver ? 'bg-blue-100' : 'bg-gray-100'
      } flex justify-between items-center`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex-grow">{children}</div>
      {associatedDefinition && (
        <div className="flex items-center">
          <span className="mr-2 text-blue-600">
            ➜ {associatedDefinition.position}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default function JoinWithArrows({ input }: JoinWithArrowsProps) {
  const [concepts, setConcepts] = useState<Item[]>([]);
  const [definitions, setDefinitions] = useState<Item[]>([]);
  const [correctAssociations, setCorrectAssociations] = useState<
    Record<string, string>
  >({});
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const parsedData = parseInput(input);
    setConcepts(parsedData.concepts);
    setDefinitions(parsedData.definitions);
    setCorrectAssociations(parsedData.correctAssociations);
    setMatches({});
    setShowResults(false);
  }, [input]);

  const parseInput = (input: string) => {
    const lines = input.split('\n').filter((line) => line.trim() !== '');
    const conceptsData: Item[] = [];
    const definitionsData: Item[] = [];
    const correctAssociations: Record<string, string> = {};

    lines.slice(2).forEach((line, index) => {
      const [conceptPart, definitionPart] = line.split(' - ');

      // Extraer el texto del concepto y eliminar cualquier numeración o letra
      const conceptText = conceptPart.replace(/^[a-zA-Z]\)\s*/, '').trim();

      // Extraer el texto de la definición y eliminar cualquier etiqueta
      const definitionText = definitionPart.replace(/\[.\]\s*/, '').trim();

      // Asignar IDs neutrales
      const conceptId = `concept-${index}`;
      const definitionId = `definition-${index}`;

      // Crear objetos de concepto y definición
      conceptsData.push({
        id: conceptId,
        content: conceptText,
        position: index + 1,
      });

      definitionsData.push({
        id: definitionId,
        content: definitionText,
        position: index + 1,
      });

      // Almacenar la asociación correcta internamente
      correctAssociations[conceptId] = definitionId;
    });

    // Mezclar las definiciones
    const shuffledDefinitions = definitionsData.sort(() => Math.random() - 0.5);

    return {
      concepts: conceptsData,
      definitions: shuffledDefinitions,
      correctAssociations,
    };
  };

  const handleDrop = (conceptId: string, definitionId: string) => {
    setMatches((prev) => {
      if (Object.values(prev).includes(definitionId)) {
        return prev;
      }
      return { ...prev, [conceptId]: definitionId };
    });
  };

  const handleRemoveAssociation = (conceptId: string) => {
    setMatches((prev) => {
      const updatedMatches = { ...prev };
      delete updatedMatches[conceptId];
      return updatedMatches;
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const isCorrect = (conceptId: string, definitionId: string) => {
    return correctAssociations[conceptId] === definitionId;
  };

  const isDefinitionAssociated = (definitionId: string) => {
    return Object.values(matches).includes(definitionId);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Unir con Flechas
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Conceptos</h3>
              {concepts.map((concept) => {
                const associatedDefinitionId = matches[concept.id];
                const associatedDefinition = definitions.find(
                  (def) => def.id === associatedDefinitionId
                );
                return (
                  <DropTarget
                    key={concept.id}
                    id={concept.id}
                    onDrop={handleDrop}
                    onRemove={handleRemoveAssociation}
                    associatedDefinition={associatedDefinition || null}
                  >
                    <div className="flex justify-between items-center min-h-[3rem]">
                      <span className="text-sm">{`${concept.content}`}</span>
                      {matches[concept.id] && (
                        <span
                          className={`ml-2 ${
                            showResults
                              ? isCorrect(concept.id, matches[concept.id])
                                ? 'text-green-600'
                                : 'text-red-600'
                              : 'text-blue-600'
                          }`}
                        >
                          ➜ {matches[concept.id]}
                        </span>
                      )}
                    </div>
                  </DropTarget>
                );
              })}
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Definiciones</h3>
              {definitions.map((definition) => (
                <div key={definition.id} className="flex justify-between items-center min-h-[3rem]">
                  <DraggableItem 
                    item={definition}
                    isAssociated={isDefinitionAssociated(definition.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={
              showResults || Object.keys(matches).length !== concepts.length
            }
            className="mt-6"
          >
            Verificar respuestas
          </Button>
          {showResults && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">Resultados:</h3>
              <p className="text-lg font-semibold text-gray-800">
                Correctas:{' '}
                {
                  Object.entries(matches).filter(([conceptId, definitionId]) =>
                    isCorrect(conceptId, definitionId)
                  ).length
                }{' '}
                / {concepts.length}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </DndProvider>
  );
}
