import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/images/logo.png'
import User from '../../public/images/user.jpg'
import {useEffect, useState} from 'react'
import {FaSearch, FaBell} from 'react-icons/fa'


function Navbar(){
   const [scroll, setScroll] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         if(window.scrollY >= 100){
            setScroll(true)
         } else {
            setScroll(false)
         }
      }
      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   const trueScroll = "bg-black fixed z-10 top-0 left-0 w-full duration-75 flex items-center justify-between px-3"
   const falseScroll = "bg-transparent fixed z-10 top-0 left-0 w-full duration-75 flex items-center justify-between px-3"
   return (
      <div className={scroll ? trueScroll : falseScroll}>
         <div className="relative flex">
            <Link href="/">
               <a>
                  <Image src={Logo} alt="logo" width={100} height={100}/>
               </a>
            </Link>

            <ul className='hidden lg:flex items-center ml-5'>
               <li className="headerLink text-white">
                  <Link href="/">
                     <a>Home</a>
                  </Link>
               </li>
               <li className="headerLink text-white">
                  <Link href="/about">
                     <a>About</a>
                  </Link>
               </li>
               <li className="headerLink text-white">
                  <Link href="/movies">
                     <a>Movies</a>
                  </Link>
               </li>
               <li className="headerLink text-white">
                  <Link href="/news">
                     <a>News & Popular</a>
                  </Link>
               </li>
            </ul>
         </div>

         <div className="relative flex h-full items-center">
            <div className="flex items-center relative mr-5">
               <input className="bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-50 leading-tight focus:outline-none focus:bg-transparent focus:border-red-500" type="text" placeholder="Search" />
               <FaSearch onClick={() => alert('Hello')} className="searchIcon text-white absolute right-2 z-2 cursor-pointer" fontSize={20}/>
            </div>
            <div className="mr-5">
               <FaBell className="text-white cursor-pointer" fontSize={20}/>
            </div>
            <div className="userContainer rounded-full overflow-hidden">
               <Image src={User} alt="logo" width={40} height={40}/>
            </div>
         </div>
      </div>
   )
}

export default Navbar