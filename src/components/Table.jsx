import React from 'react'
import Modal from './Modal';

// Table component to display array of objects in a tabular format
function Table({ data, setData, selectedAlgo }) {
    const [showModal, setShowModal] = React.useState(false);
    const [modalConfig, setModalConfig] = React.useState({});

    // Get table headers from keys of the first object
    const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

    
    const handleShowingModal = (type, index) => {

        if (selectedAlgo == '') {
            setModalConfig({
                type: 'message',
                header: 'Select a Algorithm',
                message: 'Make sure to select a algorithm to the selector before to perform some operations.'
            })
            setShowModal(true);
            return
        }

        switch (type) {
            case 'edit':
                setModalConfig({
                    type: type,
                    header: data[index]['Process'],
                    index: index,
                    labels: ['Arrival Time', 'Burst Time'],
                    values: {
                        'Arrival Time': data[index]['Arrival Time'],
                        'Burst Time': data[index]['Burst Time']
                    },
                    setData: setData
                })
                setShowModal(true);
                break;
            case 'addrow':
                setModalConfig({
                    type: type,
                    labels: ['Arrival Time', 'Burst Time'],
                    setData: setData
                })
                setShowModal(true);
                break;
            case 'delete':
                setModalConfig({
                    type: type,
                    header: data[index]['Process'],
                    message: 'Are you sure you want to delete this process?',
                    index: index,
                    setData: setData
                })
                setShowModal(true);
                break;
            default:
                setShowModal(false);
                break;
        }
        
    }

    return (
        <>
            {showModal && 
                <Modal 
                    setShow={setShowModal}
                    config={modalConfig}
                />
            }

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <table className="w-full text-md text-center rtl:text-right text-gray-500">
                        <thead className="text-lg text-gray-50 uppercase bg-blue-700 sticky top-0 z-10">
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
                            {
                                data.length === 0 || data.every((row) => headers.every((key) => row[key] == null)) ? (
                                    <tr>
                                        <td colSpan={headers.length + 1} className="px-6 py-4 text-gray-500">
                                            Empty table add row.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((row, rowIndex) => (
                                        <tr className="bg-white border-b border-gray-200" key={rowIndex}>
                                            {headers.map((key, colIndex) => (
                                                <td className="px-6 py-4 text-gray-900" key={colIndex}>
                                                    {row[key]}
                                                </td>
                                            ))}
                                            <td className="px-6 py-4">
                                                <a onClick={() => handleShowingModal('edit', rowIndex)} className='inline-flex justify-center p-1 hover:bg-gray-200 1ounded-lg cursor-pointer'>
                                                    <svg className="w-5 h-5 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                                    </svg>
                                                </a>
                                                <a onClick={() => handleShowingModal('delete', rowIndex)} className='inline-flex justify-center p-1 hover:bg-gray-200 1ounded-lg cursor-pointer'>
                                                    <svg className="w-5 h-5 text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <button 
                    onClick={
                        () => handleShowingModal('addrow')
                    }
                    className='inline-flex justify-center text-lg text-blue-700 bg-white w-full boorder-none hover:bg-blue-100 hover:text-blue-800 px-4 py-2 cursor-pointer'
                >
                    + Add Row
                </button>
            </div>
        </>
    )
}

export default Table
