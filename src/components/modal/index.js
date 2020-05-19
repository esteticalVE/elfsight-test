import React, { useEffect } from 'react'
import classes from './styled.module.css'
import { OverlayComponent } from '../overlay/'

export function ModalComponent(props) {
  const { isOpen, children, clickHandler } = props

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  })

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className={classes['modal']}>
        <div className={classes['modal_content']}>{children}</div>
      </div>
      <OverlayComponent onClick={clickHandler} />
    </>
  )
}
