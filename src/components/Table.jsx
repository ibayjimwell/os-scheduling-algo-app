import React from 'react'
import Modal from './Modal';

// Table component to display array of objects in a tabular format
function Table({ data, selectedAlgo }) {
    const [showModal, setShowModal] = React.useState(false);
    const [modalConfig, setModalConfig] = React.useState({});

    // Get table headers from keys of the first object
    const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

    
    const handleShowingModal = (type) => {

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
                    header: 'Wala pa',
                    labels: ['Arrival Time', 'Burst Time']
                })
                setShowModal(true);
                break;
            case 'addrow':
                setModalConfig({
                    type: type,
                    labels: ['Arrival Time', 'Burst Time']
                })
                setShowModal(true);
                break;
            default:
                setShowModal(false);

        }
        
    }

    return (
        <>

            {
                showModal && 
                 <Modal 
                    setShow={setShowModal}
                    config={modalConfig}
                />
            }

            <div
                className="relative overflow-x-auto shadow-md sm:rounded-lg"
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
                                    <a onClick={() => handleShowingModal('edit')} className="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
