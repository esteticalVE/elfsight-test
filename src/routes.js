import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/main'
import { AuthorPage } from './pages/author'
import { AlbumPage } from './pages/album'

export function useRoutes() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/author/:id" exact>
          <AuthorPage />
        </Route>
        <Route path="/author/:id/album/:id">
          <AlbumPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  )
}
