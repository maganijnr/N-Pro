import Image from 'next/image'
import {Movie} from '../../typing'
import {movieBaseUrl as baseURL} from '../../utils/urls'
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from 'react-icons/md'
import {useRef, useState} from 'react'
import {useRecoilState} from 'recoil'
import {movieState, modalState} from '../../atoms/modalAtom'
interface IProps {
   movie: Movie[]
   title: string
}

const RowSection = ({movie, title}: IProps) => {
   const rowRef = useRef<HTMLDivElement>(null)
   const [isMoved, setIsMoved] = useState<boolean>(false)
   const [current, setCurrentMovie] = useRecoilState(movieState)
   const [showModal, setShowModal] = useRecoilState(modalState)

   //Function to move row section
   const handleClick = (direction: string) =>{
      //To show arrow icon
      setIsMoved(true)
      

      if(rowRef.current){
         const {scrollLeft, clientWidth} = rowRef.current

         const scrollTo = 
            direction === "left" 
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth

         rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"})
      }
   }

   return (
      <div className="relative text-white h-[300px] lg:h-[350px] py-2 px-5 mb-[30px] mt-[20px]">
         <h2 className="font-bold text-2xl lg:text-4xl">{title}</h2>
         <div  className=" relative  flex items-center justify-between">
            <MdOutlineKeyboardArrowLeft 
               fontSize={40} 
               onClick={() => handleClick("left")}
               className={`text-white absolute z-[2] bg-transparent w-10 h-10 items-center justify-center left-2 cursor-pointer`}
            />
            <div ref={rowRef} className="moviesContainer w-full mx-auto flex items-center justify-between overflow-x-scroll overflow-y-hidden cursor-pointer">
               {
               movie.map((show) => (
                  <div
                     onClick={() => {
                        setCurrentMovie(show);
                        setShowModal(true)
                     }}
                     className="relative min-w-300 h-[300px] mx-4 hover:scale-110 duration-75" key={show?.id}>
                     <Image src={`${baseURL}${show?.backdrop_path || show?.poster_path}`} alt="image" layout="fill" objectFit='contain' objectPosition="center"/>
                  </div>
               ))
            }
            </div>
            <MdOutlineKeyboardArrowRight 
               fontSize={40}
               onClick={() => handleClick("right")}
               className='text-white absolute z-[2] bg-transparent w-10 h-10 flex items-center justify-center right-2 cursor-pointer'
            />
         </div>
      </div>
   )
}

export default RowSection