import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useRoutes } from './routes'
import { HeaderComponent } from './components/header'
import classes from './App.module.css'

function App() {
  const { pathname } = useLocation()
  return (
    <div className={classes['App']}>
      <HeaderComponent>
        {pathname !== '/' && (
          <div className={classes['header_button__wrapper']}>
            <Link className={classes['header_button']} to="/">
              Home
            </Link>
          </div>
        )}
      </HeaderComponent>
      {useRoutes()}
    </div>
  )
}

export default App
