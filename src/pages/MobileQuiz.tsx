
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileNavbar from '../components/MobileNavbar';
import MobileFooter from '../components/MobileFooter';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const MobileQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: 1,
      explanation: "Mercury is the closest planet to the Sun at 0.39 AU."
    },
    {
      id: 2,
      question: "How many moons does Jupiter have?",
      options: ["27", "16", "95", "146"],
      correct: 2,
      explanation: "Jupiter has 95 confirmed moons, making it the planet with the most moons."
    },
    {
      id: 3,
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Venus", "Mercury", "Mars", "Jupiter"],
      correct: 2,
      explanation: "Mars is known as the 'Red Planet' due to iron oxide (rust) on its surface."
    },
    {
      id: 4,
      question: "What is the largest planet in our solar system?",
      options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
      correct: 1,
      explanation: "Jupiter is the largest planet with a diameter of 139,820 km."
    },
    {
      id: 5,
      question: "Which planet rotates on its side?",
      options: ["Saturn", "Neptune", "Uranus", "Venus"],
      correct: 2,
      explanation: "Uranus rotates on its side like a rolling ball, with an axial tilt of about 98 degrees."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Stellar! You're a space expert! 🌟";
    if (percentage >= 70) return "Great job! You know your planets! 🚀";
    if (percentage >= 50) return "Good work! Keep exploring! 🌙";
    return "Keep studying the cosmos! 🌌";
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Stars background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, white, transparent),
              radial-gradient(2px 2px at 40px 70px, white, transparent),
              radial-gradient(1px 1px at 90px 40px, white, transparent),
              radial-gradient(1px 1px at 130px 80px, white, transparent),
              radial-gradient(2px 2px at 160px 30px, white, transparent)
            `,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 100px'
          }} />
        </div>

        <MobileNavbar />

        <main className="relative z-10 flex-1 p-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Quiz Complete!
            </h1>
            <div className="text-4xl mb-4">
              {score >= questions.length * 0.9 ? '🌟' : score >= questions.length * 0.7 ? '🚀' : score >= questions.length * 0.5 ? '🌙' : '🌌'}
            </div>
            <p className="text-xl mb-2">Score: {score}/{questions.length}</p>
            <p className="text-sm text-gray-300 mb-6">{getScoreMessage()}</p>
          </div>

          <Card className="bg-gray-900 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-lg">Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div key={question.id} className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      {answers[index] ? 
                        <CheckCircle className="text-green-500 w-5 h-5" /> : 
                        <XCircle className="text-red-500 w-5 h-5" />
                      }
                    </div>
                    <span className="text-gray-300 text-sm flex-1">
                      Q{index + 1}: {question.question.slice(0, 30)}...
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={resetQuiz} className="w-full bg-blue-600 hover:bg-blue-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link to="/mobile">
              <Button className="w-full bg-gray-800 border-gray-600 hover:bg-gray-700 text-white border-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mobile Home
              </Button>
            </Link>
            <Link to="/">
              <Button className="w-full bg-gray-800 border-gray-600 hover:bg-gray-700 text-white border-2">
                <Home className="w-4 h-4 mr-2" />
                Desktop Version
              </Button>
            </Link>
          </div>
        </main>

        <MobileFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Stars background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 40px 70px, white, transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(2px 2px at 160px 30px, white, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 100px'
        }} />
      </div>

      <MobileNavbar />

      <main className="relative z-10 flex-1 p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Mobile Quiz
          </h1>
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-300">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-gray-300">Score: {score}/{currentQuestion}</span>
          </div>
          <Progress value={(currentQuestion / questions.length) * 100} className="mb-4" />
        </div>

        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  variant="outline"
                  className={`w-full text-left justify-start h-auto p-3 text-white border-2 ${
                    selectedAnswer === index
                      ? "bg-blue-600 border-blue-500 hover:bg-blue-700"
                      : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                  } ${
                    showResult && index === questions[currentQuestion].correct
                      ? "bg-green-600 border-green-500 hover:bg-green-700"
                      : showResult && selectedAnswer === index && index !== questions[currentQuestion].correct
                      ? "bg-red-600 border-red-500 hover:bg-red-700"
                      : ""
                  }`}
                  disabled={showResult}
                >
                  <span className="mr-2 font-bold text-white">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-white text-sm">{option}</span>
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-white font-semibold mb-2 text-sm">
                  {selectedAnswer === questions[currentQuestion].correct ? "Correct!" : "Incorrect!"}
                </p>
                <p className="text-gray-300 text-xs">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Link to="/mobile">
                <Button className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-white border-2" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              </Link>
              
              <Button 
                onClick={handleNextQuestion} 
                disabled={selectedAnswer === null || showResult} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileFooter />
    </div>
  );
};

export default MobileQuiz;
