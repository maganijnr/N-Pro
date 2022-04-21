import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/images/logo.png'
import {useEffect, useState} from 'react'
import {FaSearch, FaBell} from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'

function Navbar(){
   const [scroll, setScroll] = useState(false)

   const {logout, user} = useAuth()

   const initials = user?.email?.split('@')[0]?.split('.')[0]?.slice(0,1)

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

   const router = useRouter()

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
            <div className="menu relative lg:mx-5 cursor-pointer bg-black w-10 h-10 px-2 rounded-full flex items-center justify-center">
               <h1 className="text-white font-bold text-xl uppercase">{initials}</h1>
               <div className="menu-items text-red-700 absolute bg-white">
                  <button onClick={() => router.push('/profile')}>Profile</button>
                  <button onClick={() => logout()}>Sign Out</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Navbar