import React from 'react'

// Navbar Component
// Props: 
// - title: Title to be displayed on the navbar
function Navbar({title}) {
  return (
    <>
        <nav class="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
                <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap">{title}</span>
                </a>
            </div>
        </nav>
    </>
  )
}

export default Navbar