import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Question {
  question: string;
  correctAnswer: boolean;
}

interface TrueAndFalseProps {
  input: string;
}

export default function TrueAndFalse({ input }: TrueAndFalseProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
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
        setError('Error parsing input. Please check the format.');
        console.error(err);
      }
    } else {
      setError(
        'No input provided. Please provide questions in the correct format.'
      );
    }
  }, [input]);

  const parseInput = (input: string): Question[] => {
    if (!input || typeof input !== 'string') {
      throw new Error('Invalid input: expected a non-empty string');
    }

    const lines = input.split('\n').filter((line) => line.trim() !== '');
    const questions: Question[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^\d+\.\s(.+)\s\[(verdadero|falso)\]$/);
      if (match) {
        questions.push({
          question: match[1].trim(),
          correctAnswer: match[2] === 'verdadero',
        });
      }
    }

    if (questions.length === 0) {
      throw new Error('No valid questions found in the input');
    }

    return questions;
  };

  const handleAnswerChange = (questionIndex: number, answer: boolean) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Verdadero y Falso</h2>
      {questions.map((question, questionIndex) => (
        <Card key={questionIndex} className="p-1">
          <CardContent>
            <p className="text-lg font-semibold mb-4">{`${questionIndex + 1}. ${
              question.question
            }`}</p>
            <RadioGroup
              onValueChange={(value) =>
                handleAnswerChange(questionIndex, value === 'true')
              }
              value={userAnswers[questionIndex]?.toString() || ''}
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  value="true"
                  id={`q${questionIndex}-true`}
                  disabled={showResults}
                />
                <Label
                  htmlFor={`q${questionIndex}-true`}
                  className={`cursor-pointer ${
                    showResults
                      ? question.correctAnswer
                        ? 'text-green-600 font-bold'
                        : userAnswers[questionIndex] === true
                        ? 'text-red-600 line-through'
                        : ''
                      : ''
                  }`}
                >
                  Verdadero
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="false"
                  id={`q${questionIndex}-false`}
                  disabled={showResults}
                />
                <Label
                  htmlFor={`q${questionIndex}-false`}
                  className={`cursor-pointer ${
                    showResults
                      ? !question.correctAnswer
                        ? 'text-green-600 font-bold'
                        : userAnswers[questionIndex] === false
                        ? 'text-red-600 line-through'
                        : ''
                      : ''
                  }`}
                >
                  Falso
                </Label>
              </div>
            </RadioGroup>
            {showResults && (
              <p className="mt-4 font-semibold">
                {userAnswers[questionIndex] === question.correctAnswer
                  ? '¡Correcto!'
                  : `Incorrecto. La respuesta correcta es: ${
                      question.correctAnswer ? 'Verdadero' : 'Falso'
                    }`}
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
