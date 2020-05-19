import React from 'react'
import classes from './styled.module.css'

export function LoaderComponent() {
  return (
    <div className={classes['loader']}>
      <h2>Loading...</h2>
    </div>
  )
}
