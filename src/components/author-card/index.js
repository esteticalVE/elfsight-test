import React from 'react'
import classes from './styled.module.css'

export function AuthorCardComponent(props) {
  const { name, id, onClick } = props

  return (
    <div
      className={classes['author_card']}
      style={{
        marginTop: id === 1 ? 50 : 35,
      }}
      onClick={() => onClick(id)}
    >
      <div className={classes['author_card__title']}>
        <h2 className={classes['heading_arrow']}>{name}</h2>
      </div>
    </div>
  )
}
