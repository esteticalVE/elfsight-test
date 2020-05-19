import React from 'react'
import classes from './styled.module.css'
import { LoaderComponent } from '../components/loader'

export function MainLayout(props) {
  const { children, loading } = props

  if (loading) {
    return <LoaderComponent />
  }

  return <div className={classes['main_layout']}>{children}</div>
}
