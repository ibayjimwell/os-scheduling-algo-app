import React from 'react'

function Modal({setShow, config}) {

    const handleButtonClicked = () => {

        switch (config.type) {
            case 'message':
                setShow(false)
                break
            default:
                break
        }

    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black/50 z-40">
                <div className="w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow-sm">
                            {/* Modal header  */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    { 
                                        config.type == 'edit' ? `Edit the value of ${config.header}` : 
                                        config.type == 'addrow' ? 'Add new row' : 
                                        config.type == 'message' ? config.header :
                                        'Modal Component'
                                    } 
                                </h3>
                                <button onClick={() => setShow(false)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5">
                                <div className="space-y-4" action="#">
                                    {
                                    config.type != 'message' ?
                                    config.labels.map((label, index) => (
                                        <div key={index}>
                                            <label className="block mb-2 text-base font-medium text-gray-900">{label}</label>
                                            <input 
                                                type="number" 
                                                name={label} 
                                                id={label}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                                required 
                                            />
                                        </div>
                                    )) :
                                        (
                                            <div className='text-gray-800 text-base'>
                                                {config.message}
                                            </div>
                                        )
                                    }
                                    <button 
                                        type="submit" 
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                                        onClick={() => handleButtonClicked()}
                                    >
                                        { 
                                            config.type == 'edit' ? 'Done' : 
                                            config.type == 'addrow' ? 'Add Row' : 
                                            config.type == 'message' ? 'Ok' :
                                            'Button'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )
}

export default Modal