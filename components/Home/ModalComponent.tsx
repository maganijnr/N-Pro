import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../../atoms/modalAtom'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
import {
   CheckIcon,
   PlusIcon,
   ThumbUpIcon,
   VolumeOffIcon,
   VolumeUpIcon,
   XIcon,
} from '@heroicons/react/outline'
import { Element, Genre, Movie } from '../../typing'
import MuiModal from '@mui/material/Modal'
import {
   collection,
   deleteDoc,
   doc,
   DocumentData,
   onSnapshot,
   setDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import useAuth from '../../hooks/useAuth'
import toast, { Toaster } from 'react-hot-toast'

const ModalComponent = () => {
   const [movie, setMovie] = useRecoilState(movieState)
   const [trailer, setTrailer] = useState('')
   const [showModal, setShowModal] = useRecoilState(modalState)
   const [muted, setMuted] = useState(true)
   const [genres, setGenres] = useState<Genre[]>([])
   const [addedToList, setAddedToList] = useState(false)
   const { user } = useAuth()
   const [movies, setMovies] = useState<DocumentData[] | Movie[]>([])

   const toastStyle = {
      background: 'white',
      color: 'black',
      fontWeight: 'bold',
      fontSize: '16px',
      padding: '15px',
      borderRadius: '9999px',
      maxWidth: '1000px',
   }

   console.log(modalState.key)
   useEffect(() => {
      if (!movie) return

      async function fetchMovie() {
         const data = await fetch(
            `https://api.themoviedb.org/3/${
               movie?.media_type === 'tv' ? 'tv' : 'movie'
               }/${movie?.id}?api_key=${
               process.env.NEXT_PUBLIC_API_KEY
               }&language=en-US&append_to_response=videos`
         ).then((response) => response.json())
         if (data?.videos) {
            const index = data.videos.results.findIndex(
               (element: Element) => element.type === 'Trailer'
            )
            setTrailer(data.videos?.results[index]?.key)
         }
         if (data?.genres) {
            setGenres(data.genres)
         }
      }

      fetchMovie()
   }, [movie])

   const handleClose = () => {
      setShowModal(false)
      setMovie(null)
      toast.dismiss()
   }
   console.log(trailer)
   return (
      <MuiModal
         open={showModal}
         onClose={handleClose}
         className="modal fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
         <>
            <button onClick={handleClose} className="modalButton text-white absolute !z-40 h-9 w-9 border-none bg-[#181818] top-5 right-5">
               <XIcon className="h-6 w-6"/>
            </button>
            <div className="modalContent relative pt-[56.25%]">
               <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: '0', left: '0' }}
                  playing
                  controls={true}
               />
            </div>
         </>
      </MuiModal>
   )
}

export default ModalComponent  