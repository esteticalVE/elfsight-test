import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { MainLayout } from '../layouts/main'
import { ListComponent } from '../components/list'
import { CardComponent } from '../components/card'

export function AuthorPage() {
  const { id } = useParams()
  const history = useHistory()
  const [albums, setAlbums] = useState([])
  const [picturesData, setPicturesData] = useState([])
  const { request } = useFetch()
  const [loading, setLoading] = useState(true)

  const fetchAlbums = useCallback(
    async (id) => {
      try {
        const albums = await request(
          `${process.env.REACT_APP_MAIN_URL}/albums?userId=${id}`
        )
        setAlbums(albums)
      } catch (e) {
        // console.log(e)
      }
    },
    [request]
  )

  useEffect(() => {
    fetchAlbums(id)
    const fetching = window.addEventListener('fetchAlbumsEnd', fetchAlbums)
    return () => {
      window.removeEventListener('fetchAlbumsEnd', fetching)
    }
  }, [fetchAlbums, id])

  const fetchPhotos = useCallback(async () => {
    try {
      const photos = await Promise.allSettled(
        albums.map(async ({ id }) => {
          return await request(
            `${process.env.REACT_APP_MAIN_URL}/photos?albumId=${id}`
          )
        })
      )
      const photosUrls = photos.map((item) => {
        return {
          photoUrl: item.value[0].url,
          thumbnailUrl: item.value[0].thumbnailUrl,
          totalLength: item.value.length,
        }
      })

      setPicturesData(photosUrls)
    } catch (e) {
      // console.log(e)
    }
  }, [albums, request])

  useEffect(() => {
    fetchPhotos()
    const fetching = window.addEventListener('fetchPhotosEnd', fetchPhotos)

    if (picturesData.length !== 0) {
      setLoading(false)
    }

    return () => {
      window.removeEventListener('fetchPhotosEnd', fetching)
    }
  }, [fetchPhotos, picturesData.length])

  function handleRouting(currentPath, toId) {
    history.push(`${currentPath}/album/${toId}`)
  }

  return (
    <MainLayout loading={loading}>
      <div>
        <h2>Albums</h2>
      </div>
      <ListComponent
        type="albums"
        items={albums}
        picturesData={picturesData}
        RenderProp={CardComponent}
        onClick={handleRouting}
      />
    </MainLayout>
  )
}
