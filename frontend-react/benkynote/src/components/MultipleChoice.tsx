'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface MultipleChoiceProps {
  input: string;
}

export default function MultipleChoice({ input }: MultipleChoiceProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (input) {
      try {
        const parsedQuestions = parseInput(input);
        setQuestions(parsedQuestions);
        setUserAnswers({});
        setShowResults(false);
        setError(null);
      } catch (err) {
        setError('Error parseando el input. Por favor, verifica el formato');
        console.error(err);
      }
    } else {
      setError(
        'No se registra input del usuario. Por favor proporciona apuntes para poder generar el examen.'
      );
    }
  }, [input]);

  const parseInput = (input: string): Question[] => {
    if (!input || typeof input !== 'string') {
      throw new Error('Error: Tienes que ingresar algún texto.');
    }

    const questionBlocks = input
      .split('\n\n')
      .filter((block) => block.trim() !== '');
    if (questionBlocks.length === 0) {
      throw new Error('No se encontraron preguntas válidas en el input');
    }

    return questionBlocks.map((block) => {
      const lines = block.split('\n');
      if (lines.length < 2) {
        throw new Error(
          'Formato de pregunta inválido: Cada pregunta debe tener por lo menos 1 consigna y 1 respuesta.'
        );
      }

      const question = lines[0].replace(/^\d+\.\s*/, '');
      const options = lines
        .slice(1)
        .map((line) => line.trim().replace(/^[a-d]\)\s*/, ''));
      const correctAnswer = options
        .find((option) => option.includes('[correcta]'))
        ?.replace(' [correcta]', '');

      if (!correctAnswer) {
        throw new Error(`No correct answer found for question: ${question}`);
      }

      return {
        question,
        options: options.map((option) => option.replace(' [correcta]', '')),
        correctAnswer,
      };
    });
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(97 + index); // 'a', 'b', 'c', 'd'
  };

  if (error) {
    return <div className="text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Multiple Choice</h2>
      {questions.map((question, questionIndex) => (
        <Card key={questionIndex} className="p-1">
          <CardContent>
            <p className="text-lg font-semibold mb-4">{`${questionIndex + 1}. ${
              question.question
            }`}</p>
            <RadioGroup
              onValueChange={(value) =>
                handleAnswerChange(questionIndex, value)
              }
              value={userAnswers[questionIndex] || ''}
            >
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center space-x-2 mb-2"
                >
                  <RadioGroupItem
                    value={option}
                    id={`q${questionIndex}-option${optionIndex}`}
                    disabled={showResults}
                  />
                  <Label
                    htmlFor={`q${questionIndex}-option${optionIndex}`}
                    className={`cursor-pointer ${
                      showResults
                        ? option === question.correctAnswer
                          ? 'text-green-600 font-bold'
                          : userAnswers[questionIndex] === option
                          ? 'text-red-600 line-through'
                          : ''
                        : ''
                    }`}
                  >
                    {`${getOptionLabel(optionIndex)}) ${option}`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {showResults && (
              <p className="mt-4 font-semibold">
                {userAnswers[questionIndex] === question.correctAnswer
                  ? '¡Correcto!'
                  : `Incorrecto. La respuesta correcta es: ${question.correctAnswer}`}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
      {questions.length > 0 && (
        <Button
          onClick={handleSubmit}
          disabled={
            showResults || Object.keys(userAnswers).length !== questions.length
          }
        >
          Enviar respuestas
        </Button>
      )}
      {showResults && (
        <p className="text-lg font-bold">
          Puntuación final:{' '}
          {
            questions.filter(
              (_, index) =>
                userAnswers[index] === questions[index].correctAnswer
            ).length
          }{' '}
          / {questions.length}
        </p>
      )}
    </div>
  );
}
