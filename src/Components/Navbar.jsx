import React from 'react'

export const Navbar = () => {
  return (
    <nav className=' bg-violet-600 text-white flex justify-between py-2 w-full'>
        <div>
          <span className='font-bold mx-2 cursor-pointer'>UrTask</span>
        </div>
        <ul className='flex gap-6 mx-5'>
          <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
          <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}
