import { useState } from 'react'
import {Movie} from '../../typing'

interface IProps {
   trendingNow: Movie[]
}
const TrendingSection = ({trendingNow}: IProps) => {

   console.log(trendingNow)
   return (
      <div className="relative text-white h-40 py-2 px-5 mb-[50px]">
         <h2 className="font-bold text-2xl">Trending Shows & Movies</h2>
         <div className="moviesContainer w-full max-w-7xl mx-auto mt-4 h-full flex items-center justify-between overflow-x-scroll">
            {
               trendingNow.map((trending) => (
                  <h2 key={trending?.id} className="text-white">
                     {trending?.original_name || trending?.title}
                  </h2>
               ))
            }
         </div>
      </div>
   )
}

export default TrendingSection