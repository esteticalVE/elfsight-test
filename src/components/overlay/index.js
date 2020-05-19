import React from 'react'
import classes from './styled.module.css'

export function OverlayComponent(props) {
  const { onClick } = props

  return <div onClick={onClick} className={classes['modal_overlay']} />
}
