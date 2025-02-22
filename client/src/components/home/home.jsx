import React from 'react'
import { useNavigate } from 'react-router-dom';
function Home() {
const navigate = useNavigate();
const handleClick=()=>{
  navigate('/login');
}

  return (
   <div >
    

      <div className="body-home h-[100vh] w-[100vw] grid grid-cols-[1fr_2fr] bg-[url(src/assets/background-home.jpg)] bg-cover bg-center bg-linear-to-r from-cyan-100 to-blue-200 ">
      <div className="flex items-center"> </div>



  <div className="right-part-home mt-[25%] ml-[10%]">
    <div className='rounded-md grid grid-rows-2 '>
      <div className='text-2xl font-bold text-center text-gray-800 p-1 mb-0'> Join us to be part of smarter healthcare future
      <div className='text-xs text-gray-400 text-center pt-2 pr-2 pl-2'>Get verified access to trusted doctors and manage your health history effortlessly</div>
         </div > 
        
         <div className=' flex justify-center place-items-center'>
       
        <button className='border text-md text-gray-600 font-bold w-[60px] h-[30px] rounded-md bg-green-100 hover:bg-green-200 'onClick={handleClick}>Login</button>
         </div>
    </div>
   
  </div>
</div>

      

     

   </div>
  )
}

export default Home
