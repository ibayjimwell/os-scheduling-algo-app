import React from 'react'

function Averages({name, value}) {
  return (
    <>
        <div className='flex justify-between text-lg bg-blue-100 w-full px-4 py-2 border border-blue-200 shadow-md'>
            <div className='text-gray-900 font-medium'>
                {name.toUpperCase()}
            </div>
            <div className='text-gray-900 font-medium'>
                {value}
            </div>
        </div>
    </>
  )
}

export default Averages