import Head from 'next/head'
import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form";
import {LoginProps as IProps} from '../typing'
import {useState } from 'react'
import useAuth from '../hooks/useAuth'

interface Inputs {
   email: IProps["email"],
   password: IProps["password"]
}
const Login = () => {
   const [login, setLogin] = useState<boolean>(true)

   const {signIn, signUp} = useAuth()

   const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
      if(login === true){
         await signIn(email, password)
      } else {
         await signUp(email, password)
      }
   };

   return (
      <div className="flex relative flex-col h-screen w-screen md:items-center md:justify-center md:bg-transparent">
         <Head>
            <title>N Pro | Login</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Image 
            src="https://rb.gy/p2hphi" 
            layout="fill" 
            alt="image" 
            className='-z-10 !hidden opacity-60 sm:!inline'
         />
         <img
            src="https://rb.gy/ulxxee"
            className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
            width={150}
            height={150}
            alt="logo"
            />
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 "
         >
            {
               login ?  <h1 className="text-white font-bold text-3xl">Sign In</h1> : <h1 className="text-white font-bold text-3xl">Sign Up</h1>
            }
            <div className="space-y-4">
               <label className="inline-block w-full">
                  <input 
                     type="email" 
                     placeholder="Email" 
                     className='loginInput'
                     {...register("email",{required:true})}
                  />
                  {errors.email && (
                     <p className="p-1 text-[14px] text-red-600">Email is required.</p>
                  )}
               </label>
               <label className="inline-block w-full">
                  <input 
                     type="password" 
                     placeholder="Password" 
                     className='loginInput'
                     {...register("password", {required:true})}
                  />
                  {errors.password && (
                     <p className="p-1 text-[14px] text-red-600">Password is required.</p>
                  )}
               </label>
               
            </div>
            <button 
               className="inlie-block w-full text-white bg-red-600 py-3.5 px-5 focus:bg-red-700 hover:bg-red-700 text-xl font-semibold mt-10 rounded"
               type="submit"
            >
               Sign In
            </button>

            {
               login 
               ? <div className="text-[gray] font-medium">
                     New to Netflix?{'  '}<button className='text-white focus:underline hover:underline' onClick={() => setLogin(false)}>Sign Up Now</button>
                  </div>
               : <div className="text-[gray] font-medium">
                     Got an account?{'  '}<button className='text-white focus:underline hover:underline' onClick={() => setLogin(true)}>Sign In Now</button>
                  </div>
            }
         </form>
      </div>
   )
}

export default Login

// 