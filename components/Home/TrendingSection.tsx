import { useState } from 'react'
import Image from 'next/image'
import {Movie} from '../../typing'
import {movieBaseUrl as baseURL} from '../../utils/urls'

interface IProps {
   trendingNow: Movie[]
}
const TrendingSection = ({trendingNow}: IProps) => {

   return (
      <div className="relative text-white h-[350px] py-2 px-5 mb-[30px]">
         <h2 className="font-bold text-2xl lg:text-4xl">Trending Shows & Movies</h2>
         <div className="moviesContainer w-full mx-auto  flex items-center justify-between overflow-x-scroll overflow-y-hidden cursor-pointer ">
            {
               trendingNow.map((trending) => (
                  <div className="relative min-w-300 h-[300px] mx-4 hover:scale-110 duration-75" key={trending?.id}>
                     <Image src={`${baseURL}${trending?.backdrop_path || trending?.poster_path}`} alt="image" layout="fill" objectFit='contain' objectPosition="center"/>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default TrendingSection