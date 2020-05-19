import React from 'react'
import classes from './styled.module.css'

export function ListComponent(props) {
  const {
    items = [],
    picturesData,
    onClick,
    modalHandler,
    RenderProp,
    title,
    type,
  } = props

  switch (type) {
    case 'photos':
      return (
        <div className={classes['photos_list']}>
          {items.map((item, index) => {
            return (
              <RenderProp
                key={`${item.id}/${index}`}
                item={item}
                type={type}
                modalHandler={modalHandler}
              />
            )
          })}
        </div>
      )

    case 'albums':
      return (
        <div className={classes['albums_list']}>
          {items.map((item, index) => {
            return (
              <RenderProp
                type={type}
                key={`${item.id}/${index}`}
                item={item}
                title={title}
                onClick={onClick}
                coverData={picturesData[index].thumbnailUrl}
                total={picturesData[index].totalLength}
              />
            )
          })}
        </div>
      )
    default:
      return null
  }
}
