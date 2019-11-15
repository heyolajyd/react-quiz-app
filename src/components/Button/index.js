import React from 'react'
import classnames from 'classnames'
import style from './index.module.scss'

const Button = props => {
  const { value, answer, isAnswerButton, isNextButton, onClick, disabled=false } = props;

  const className = classnames(style['base-button'], {
    [style['answer-button']]: isAnswerButton,
    [style['is-answer']]: (value === answer),
    [style['next-button']]: isNextButton
  })

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {value}
    </button>
  )
}

export default Button;
