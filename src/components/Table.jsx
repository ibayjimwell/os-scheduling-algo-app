import React from 'react'

function Table() {

  const [showAddRow, setShowAddRow] = React.useState(false);

  return (
    <>
        <div 
            class="relative overflow-x-auto shadow-md sm:rounded-lg"
            onMouseEnter={() => setShowAddRow(true)}
            onMouseLeave={() => setShowAddRow(false)}
        >
            <table class="w-full text-md text-center rtl:text-right text-gray-500"
            >
                <thead  class="text-lg text-gray-50 uppercase bg-blue-700">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Process ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Arrival Time
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Burst Time
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Completion Time
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Turn Around Time
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Waiting Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Process 0
                        </th>
                        <td class="px-6 py-4 text-gray-900">
                            <input 
                                type="number" 
                                class="ml-2.5 w-16 border-none text-center focus:ring-0 focus:outline-none" 
                                value={0}
                            />
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            <input 
                                type="number" 
                                class="ml-2.5 w-16 border-none text-center focus:ring-0 focus:outline-none" 
                                value={5}
                            />
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            5
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            5
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            0
                        </td>
                    </tr>
                    <tr class="bg-white border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Process 1
                        </th>
                        <td class="px-6 py-4 text-gray-900">
                            <input 
                                type="number" 
                                class="ml-2.5 w-16 border-none text-center focus:ring-0 focus:outline-none" 
                                value={1}
                            />
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            <input 
                                type="number" 
                                class="ml-2.5 w-16 border-none text-center focus:ring-0 focus:outline-none" 
                                value={3}
                            />
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            8
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            7
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            4
                        </td>
                    </tr>
                    <tr class="bg-white border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Process 2
                        </th>
                        <td class="px-6 py-4 text-gray-900">
                            <input 
                                type="number" 
                                class="ml-2.5 w-16 border-none text-center focus:ring-0 focus:outline-none" 
                                value={2}
                            />
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            <input 
                                type="number" 
                                class="ml-2.5 w-16 border-none text-center focus:ring-0 focus:outline-none" 
                                value={8}
                            />
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            16
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            14
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            6
                        </td>
                    </tr>
                    <tr class="bg-white border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Process 3
                        </th>
                        <td class="px-6 py-4 text-gray-900">
                            <input 
                                type="number" 
                                class="ml-2.5 w-16 border-none text-center focus:ring-0 focus:outline-none" 
                                value={3}
                            />
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            <input 
                                type="number" 
                                class="ml-2.5 w-16 border-none text-center focus:ring-0 focus:outline-none" 
                                value={6}
                            />
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            22
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            19
                        </td>
                        <td class="px-6 py-4 text-gray-900">
                            13
                        </td>
                    </tr>
                </tbody>
            </table>
            {showAddRow && 
                <button className='inline-flex justify-center text-lg text-blue-700 bg-transparent w-full boorder-none hover:bg-blue-100 hover:text-blue-800 px-4 py-2 cursor-pointer'>
                    + Add Row
                </button>
            }
        </div>
    </>
  )
}

export default Table