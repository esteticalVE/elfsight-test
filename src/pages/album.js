import React, { useCallback, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { MainLayout } from '../layouts/main'
import { ListComponent } from '../components/list'
import { CardComponent } from '../components/card'
import { ModalComponent } from '../components/modal'
import modalClasses from '../components/modal/styled.module.css'
import classes from './styled.module.css'

export function AlbumPage() {
  const history = useHistory()
  const { id } = useParams()
  const { request, loading } = useFetch()
  const [photos, setPhotos] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalData, setModalData] = useState()

  function modalHandler(id, url) {
    setModalData({ id, url })
    setIsOpenModal(!isOpenModal)
  }

  const fetchAuthors = useCallback(async () => {
    try {
      const photos = await request(
        `${process.env.REACT_APP_MAIN_URL}/photos?albumId=${id}`
      )
      setPhotos(photos)
    } catch (e) {
      // console.log(e)
    }
  }, [id, request])

  useEffect(() => {
    fetchAuthors()
    const fetching = window.addEventListener('fetching', fetchAuthors)
    return () => {
      window.removeEventListener('fetching', fetching)
    }
  }, [fetchAuthors])

  function nextSlide() {
    const slide = photos.find((item) => item.id === modalData.id + 1)
    if (slide) {
      setModalData({ id: slide.id, url: slide.url })
    }
  }

  function prevSlide() {
    const slide = photos.find((item) => item.id === modalData.id - 1)
    if (slide) {
      setModalData({ id: slide.id, url: slide.url })
    }
  }

  return (
    <MainLayout loading={loading}>
      <div className={classes['album_button__wrapper']}>
        <button onClick={history.goBack} className={classes['album_button']}>
          Back to albums
        </button>
      </div>
      <h2>Photos</h2>
      {photos ? (
        <ListComponent
          type="photos"
          items={photos}
          RenderProp={CardComponent}
          modalHandler={modalHandler}
        />
      ) : (
        <h1>No photos yet</h1>
      )}

      <ModalComponent isOpen={isOpenModal} clickHandler={modalHandler}>
        {modalData && modalData.url && (
          <>
            <div
              className={modalClasses['modal_arrow']}
              onClick={() => prevSlide()}
            >
              ←
            </div>
            <img
              className={modalClasses['modal_image']}
              src={modalData.url}
              alt="title"
            />
            <div
              className={modalClasses['modal_arrow']}
              onClick={() => nextSlide()}
            >
              →
            </div>
          </>
        )}
      </ModalComponent>
    </MainLayout>
  )
}
