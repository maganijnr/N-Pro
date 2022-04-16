import Image from 'next/image'
import {useState, useEffect} from 'react'
import {Movie} from '../../typing'
import {movieBaseUrl as baseURL} from '../../utils/urls'
import {FaPlay, FaInfoCircle} from 'react-icons/fa'


interface IProps { 
   netflixOriginals: Movie[]
}
const Banner = ({netflixOriginals}:IProps) => {
   const [movie, setMovie] = useState<Movie | null>(null)

   useEffect(() => {
      setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
   }, [netflixOriginals])

   console.log(movie)
   return (
      <div className="flex flex-col justify-center space-y-2 py-16 h-[95vh] sm:h-[85vh] md:space-y-4 lg:h-[75vh] lg:justify-end overflow-hidden">
         <div className="absolute top-0 left-0 z-[1] h-[95vh] sm:h-[85vh] lg:h-[75vh] w-full">
            <Image 
               src={`${baseURL}${movie?.backdrop_path || movie?.poster_path}`} 
               layout="fill" 
               alt="banner image"
               objectFit='cover'
            />
         </div>
         <h2 className="text-white z-[3] relative text-4xl sm:text-5xl lg:text-6xl font-extrabold pl-4">
            {movie?.title || movie?.original_name || movie?.name }
         </h2>
         <p className="text-white z-[3] max-w-md lg:max-w-xl font-medium pl-4">
            {movie?.overview}
         </p>

         <div className="mt-5 z-[3] flex">
            <button className="bannerBtn bg-white rounded-md font-bold text-xl hover:opacity-80 duration-75">
               <FaPlay className="bannerBtnIcon" fontSize={20}/> Play
            </button>
            <button className="bannerBtn rounded-md font-bold text-xl text-white bg-[#4C4341] hover:opacity-80 duration-75">
               <FaInfoCircle className="bannerBtnIcon" fontSize={20}/> More Info
            </button>
         </div>
      </div>
   )
}

export default Banner