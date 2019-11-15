import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import style from './index.module.css';
import Button from '../Button';
import { decodeURI, randomizeArray } from '../../helper';

const Question = (props) => {
  const {
    type,
    question,
    incorrectAnswers,
    nextQuestion,
    handleScore
  } = props;

  const [correctAnswer, setCorrectAnswer] = useState()
  const [mixedAnswers, setMixedAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState()
  
  const handleAnswer = (answer) => {
    // If an answer is already selected, don't update the selected answer
    if (selectedAnswer) return
    setSelectedAnswer(answer);
  }

  const handleNext = () => {
    if (correctAnswer === selectedAnswer) {
      handleScore()
    }
    nextQuestion()
    setSelectedAnswer(null)
  }

  const displayResult = () => {
    const isCorrectAnswer = correctAnswer === selectedAnswer;
    return (selectedAnswer &&
      <div className={style['result-container']}>
        <h3 className={classnames(style['message' ], { [style['correct-answer'] ]: isCorrectAnswer }) }>
          {isCorrectAnswer ? 'Correct!' : 'Sorry!'}
        </h3>
        <Button isNextButton onClick={handleNext} value='Next Question' />
      </div>
    )
  }

  useEffect(() => {
    if (!props.correctAnswer || !incorrectAnswers) return

    setCorrectAnswer(props.correctAnswer)

    const randomizedAnswers = randomizeArray([...incorrectAnswers, correctAnswer]);

    setMixedAnswers(randomizedAnswers);
}, [correctAnswer, incorrectAnswers, props.correctAnswer])  
  
  return (
    <div className={style['container']}>
      <div className={style['content']}>
        {decodeURI(question)}
      </div>
      <div className={style['answers']}>
        {mixedAnswers.map((answer, idx) => {
          const value = type === 'boolean'
            ? (answer === 'True' ? 'Yes' : 'No')
            : decodeURI(answer);
          
          return (
            <Button
              isAnswerButton
              key={idx}
              value={value}
              answer={selectedAnswer}
              onClick={() => handleAnswer(answer)}
              disabled={selectedAnswer}
              correctAnswer={props.correctAnswer}
            />
          )
        })}
      </div>
      {displayResult()}
    </div>
  );
}

export default Question;
