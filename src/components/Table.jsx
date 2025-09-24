import React from 'react'
import EditModal from './EditModal';

// Table component to display array of objects in a tabular format
function Table({ data }) {
    const [showAddRow, setShowAddRow] = React.useState(false);

    // Get table headers from keys of the first object
    const headers = Object.keys(data[0]);

    return (
        <>
            <EditModal />
            <div
                className="relative overflow-x-auto shadow-md sm:rounded-lg"
                onMouseEnter={() => setShowAddRow(true)}
                onMouseLeave={() => setShowAddRow(false)}
            >
                <table className="w-full text-md text-center rtl:text-right text-gray-500">
                    <thead className="text-lg text-gray-50 uppercase bg-blue-700">
                        <tr>
                            {headers.map((key, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>
                                    {key}
                                </th>
                            ))}
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr className="bg-white border-b border-gray-200" key={rowIndex}>
                                {headers.map((key, colIndex) => (
                                    <td className="px-6 py-4 text-gray-900" key={colIndex}>
                                        {row[key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ))}
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
