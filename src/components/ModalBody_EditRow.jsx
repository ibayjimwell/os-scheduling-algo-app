import React from 'react';

function ModalBody_EditRow({ config, setShow, inputValues, handleInputChange }) {
    
    const handleAction = () => {
        if (config.setData && config.index !== undefined) {
            config.setData(prevData => {
                // 1. Create a shallow copy of the entire data array (immutability for array)
                const newData = [...prevData];
                
                // 2. Create a shallow copy of the specific item being edited (immutability for object)
                //    We use || to fall back to the existing value if parsing fails.
                newData[config.index] = {
                    ...newData[config.index],
                    'Arrival Time': parseInt(inputValues['Arrival Time']) || newData[config.index]['Arrival Time'],
                    'Burst Time': parseInt(inputValues['Burst Time']) || newData[config.index]['Burst Time']
                    // Note: 'Process' is intentionally not edited here.
                };
                
                return newData; // Return the NEW array to update state
            });
        }
        setShow(false);
    };

    return (
        <div className="space-y-4">
            {/* Render the input fields */}
            {config.labels.map((label, index) => (
                <div key={index}>
                    <label className="block mb-2 text-base font-medium text-gray-900">{label}</label>
                    <input 
                        type="number" 
                        name={label} 
                        id={label}
                        // Connect to the state managed in the parent Modal
                        value={inputValues[label] ?? ''} 
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        required 
                    />
                </div>
            ))}
            
            <button 
                type="submit" 
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                onClick={handleAction}
            >
                Done
            </button>
        </div>
    );
}

export default ModalBody_EditRow;