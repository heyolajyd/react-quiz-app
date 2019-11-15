import React, { useState, useEffect } from 'react';
import style from './index.module.css'
import { calulatePercent } from '../../helper';

const ScoreBar = ({
  score,
  questionCount,
  questionNumber
}) => {
  const [correctAnswersScore, setCorrectAnswersScore] = useState(0)
  const [completedAllScore, setCompletedAllScore] = useState(0)
  const [maximumScore, setMaximumScore] = useState(0)
  const [expectedScore, setExpectedScore] = useState(0)

  useEffect(() => {
    if (score !== undefined ) {
      const correctAnswers = calulatePercent(score, questionCount)
      const completedAnswers = calulatePercent(score, questionNumber)
      const maxAnswers = calulatePercent((questionCount - questionNumber + score), questionCount)
      
      setCorrectAnswersScore(correctAnswers)
      setCompletedAllScore(completedAnswers - correctAnswers)
      setMaximumScore(maxAnswers)
      setExpectedScore(maxAnswers - correctAnswers)
    }
  }, [score, questionCount, questionNumber])
  
  return (
    <div className={style['score-bar-container']}>
      <div className={style['stats-container']}>
        <div className={style['stats']}>Score: {correctAnswersScore}%</div>
        <div className={style['stats']}>Max: {maximumScore}%</div>
      </div>
      <div className={style['score-bar']}>
        <div className={style['correct-score-bar']} style={{ width: `${correctAnswersScore}%` }}/>
        <div className={style['completed-score-bar']} style={{ width: `${completedAllScore}%` }} />
        <div className={style['expected-score-bar']} style={{ width: `${expectedScore}%` }} />
      </div>
    </div>
  )
}

export default ScoreBar;
