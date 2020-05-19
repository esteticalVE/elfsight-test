import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { MainLayout } from '../layouts/main'
import { AuthorCardComponent } from '../components/author-card'
import classes from './styled.module.css'

export function MainPage() {
  const history = useHistory()
  const { request, loading } = useFetch()
  const [authors, setAuthors] = useState([])

  const fetchAuthors = useCallback(async () => {
    try {
      const authors = await request(`${process.env.REACT_APP_MAIN_URL}/users`)
      setAuthors(authors)
    } catch (e) {
      // console.log(e)
    }
  }, [request])

  function handleRouting(path) {
    history.push(`/author/${path}`)
  }

  useEffect(() => {
    fetchAuthors()
    const fetching = window.addEventListener('fetchAuthorsEnd', fetchAuthors)
    return () => {
      window.removeEventListener('fetchAuthorsEnd', fetching)
    }
  }, [fetchAuthors])

  return (
    <MainLayout loading={loading}>
      <div className={classes['author_list']}>
        {authors.map((item, index) => {
          return (
            <AuthorCardComponent
              onClick={handleRouting}
              key={`${item.name}/${index}`}
              name={item.name}
              id={index + 1}
            />
          )
        })}
      </div>
    </MainLayout>
  )
}
