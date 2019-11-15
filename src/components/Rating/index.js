import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames';
import styles from './index.module.css';


const Rating = ({ isValid }) => {
  return (
    <span className={classnames(styles['rating'], { [styles['is-valid']]: isValid })}>
      <FontAwesomeIcon icon={faStar} />
    </span>
  )
}

export default Rating;
