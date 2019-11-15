import React, { useState, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'
import Question from './components/Question'
import ScoreBar from './components/ScoreBar'
import Header from './components/Header'
import Button from './components/Button'
import { getQuestion } from './util/request';
import { randomizeArray, calulatePercent } from './helper'
import style from './App.module.css'

function App () {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion ] = useState({})
  const [currentNumber, setCurrentNumber ] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [completedQuiz, setCompletedQuiz] = useState(false)
  
  const questionCount = questions.length
  const {
    category,
    difficulty,
    type,
    correct_answer,
    incorrect_answers,
    question
  } = currentQuestion

  const initializeState = () => {
    setQuestions([])
    setCurrentQuestion({})
    setCurrentNumber(0)
    setQuizScore(0)
    setCompletedQuiz(false)
  }
  
  const loadQuestion = async() => {
    const loadedQuestion = await getQuestion()
    const shuffledQuestions = randomizeArray(loadedQuestion)

    setQuestions(shuffledQuestions)
  }

  const handleNextQuestion = () => {
    const nextNumber = currentNumber + 1
    return nextNumber < questionCount
      ? setCurrentNumber(nextNumber)
      : setCompletedQuiz(true)
  }

  const handleScore = () => {
    setQuizScore(quizScore + 1)
  }

  const handleStartQuiz = () => {
    initializeState()
    loadQuestion()
  }

  useEffect(() => {
    loadQuestion()
  }, [])

  useEffect(() => {
    if (questions.length) {
      const question = questions[currentNumber]
      setCurrentQuestion(question)
    }
  }, [questions, currentNumber])
  
  return (
    <div className={style['app-container']}>
      <ProgressBar questionNumber={currentNumber + 1} questionCount={questionCount} />
      {completedQuiz ? (
        <div className={style['quiz-score']}>
          <h1>Your score: {calulatePercent(quizScore, questionCount)}%</h1>
          <Button onClick={handleStartQuiz} value="Start Again" />
        </div>
      ): (
        <div className={style['quiz-content']}>
          <Header
            questionNumber={currentNumber}
            questionCount={questionCount}
            category={category}
            difficulty={difficulty}
          />
          <Question
            type={type}
            question={question}
            correctAnswer={correct_answer}
            incorrectAnswers={incorrect_answers}
            nextQuestion={handleNextQuestion}
            handleScore={handleScore}
            questionCount={questionCount}
            currentNumber={currentNumber + 1}
          />
          <ScoreBar
            score={quizScore}
            questionCount={questionCount}
            questionNumber={currentNumber}
          />
        </div>          
      )}
    </div>
  )
}

export default App
