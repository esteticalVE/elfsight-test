import React from 'react'
import { useLocation } from 'react-router-dom'
import classes from './styled.module.css'

export function CardComponent(props) {
  const { item, modalHandler, type, onClick } = props
  const location = useLocation()

  switch (type) {
    case 'photos':
      return (
        <div
          className={classes['photo_card']}
          style={{
            backgroundImage: `url(${item && item.thumbnailUrl})`,
          }}
          onClick={() => modalHandler(item.id, item.url)}
        />
      )

    case 'albums':
      return (
        <div
          className={classes['album_card']}
          style={{
            backgroundImage: `url(${props.coverData})`,
          }}
          onClick={() => onClick(location.pathname, props.item.id)}
        >
          <p className={classes['album_card__total']}> {props.total} </p>
          <div className={classes['album_card__content']}>
            <p>
              {props.title} name: {props.item.title}
            </p>
          </div>
        </div>
      )
    default:
      return null
  }
}
