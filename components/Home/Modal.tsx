import React from 'react'
import User from '../../public/images/user.jpg'
import Image from 'next/image'
import {RiCloseLine} from 'react-icons/ri'
import ReactPlayer from 'react-player'

const Modal = () => {
   return (
      <div className="modal-body">
         <div className="modal-top flex items-center justify-between px-2">
            <div className="flex items-center">
               <div className="flex justify-center items-center rounded-full overflow-hidden mr-2">
                  <Image src={User} alt="user" width={50} height={50}/>
               </div>
               <h2>Name of movie</h2>
            </div>
            <div className="flex items-center justify-center text-gray-50 border-2 border-gray-50 rounded-full cursor-pointer">
               <RiCloseLine fontSize={25}/>
            </div>
         </div>
         <div>
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width="100%" controls={true}/>
         </div>
         Modal
      </div>
   )
}

export default Modal