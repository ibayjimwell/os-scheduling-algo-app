import React from 'react'
import ModalBody_SimpleMessage from './ModalBody_SimpleMessage.jsx'
import ModalBody_AddRow from './ModalBody_AddRow.jsx'
import ModalBody_EditRow from './ModalBody_EditRow.jsx'

function Modal({setShow, config}) {

    // The form's memory for what the user is typing
    const [inputValues, setInputValues] = React.useState({}); 

    // When the modal opens, if it's an 'edit' type, 
    // copy the existing data from 'config.values' into the form's memory.
    React.useEffect(() => {
        if (config.type == 'edit' && config.values) {
            setInputValues({...config.values}); // {...} is essential! It makes a copy!
        }
    }, []); // [] means: Do this only once when the modal first appears.

    const handleInputChange = (e) => {
        const { name, value } = e.target; // Get the input's name and what the user typed

        // The safe way to update an object in React:
        setInputValues((prevValues) => ({
            ...prevValues,     // 1. Take a copy of everything already in memory (inputValues)
            [name]: value      // 2. ONLY overwrite or add the one field that just changed.
        }));
    }

    // Different modal body components for different types of modals
     const renderModalBody = () => {
        switch (config.type) {
            case 'message':
            case 'delete':
                // For simple message or delete confirmation
                return (
                    <ModalBody_SimpleMessage
                        config={config}
                        setShow={setShow}
                    />
                );
            case 'addrow':
                // For adding a new row (requires complex data manipulation)
                return (
                    <ModalBody_AddRow
                        config={config}
                        setShow={setShow}
                        inputValues={inputValues}
                        handleInputChange={handleInputChange}
                    />
                );
            case 'edit':
                // For editing an existing row
                return (
                    <ModalBody_EditRow
                        config={config}
                        setShow={setShow}
                        inputValues={inputValues}
                        handleInputChange={handleInputChange}
                    />
                );
            default:
                return <div className="p-4 text-red-500">Invalid modal configuration type.</div>;
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
                                        config.type == 'edit' ? `Edit ${config.header}` : 
                                        config.type == 'delete' ? `Delete ${config.header}` :
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
                                { renderModalBody() }
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )
}

export default Modal