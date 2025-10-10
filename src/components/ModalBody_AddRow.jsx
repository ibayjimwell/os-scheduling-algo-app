import React from 'react';

function ModalBody_AddRow({ config, setShow, inputValues, handleInputChange }) {
    
    const handleAction = () => {
        if (!config.setData) return;

        const newRowTemplate = {
            'Arrival Time': parseInt(inputValues['Arrival Time']) || 0,
            'Burst Time': parseInt(inputValues['Burst Time']) || 0,
            'Completion Time': null,
            'Turnaround Time': null,
            'Waiting Time': null
        };

        config.setData((prevData) => {
            // Check if prevData contains only one row and all its values are null
            const isAllNullRow = Array.isArray(prevData) &&
                prevData.length === 1 &&
                Object.values(prevData[0]).every((val) => val === null);

            if (isAllNullRow) {
                // If the table is empty (has the null placeholder), REPLACE it.
                return [{ 'Process': 'Process 0' , ...newRowTemplate}];
            } else {
                // If data exists, figure out the next process number.
                
                // 1. Filter out any null/empty rows from the existing data
                const filteredData = prevData.filter(row =>
                    !(row && Object.values(row).every(val => val === null))
                );

                // 2. Find the highest existing process number (e.g., Process 5 -> 5)
                const maxProcessNum = filteredData.reduce((max, row) => {
                    const match = row['Process'] && row['Process'].match(/Process (\d+)/);
                    const num = match ? parseInt(match[1], 10) : -1;
                    return num > max ? num : max;
                }, -1);
                
                // 3. Construct the final new row with the next number
                const finalNewRow = {
                    'Process': `Process ${maxProcessNum + 1}`, // Next available process number
                    ...newRowTemplate
                };

                // 4. Return a NEW array: old data spread + new row
                return [
                    ...filteredData, // Spread the existing valid rows
                    finalNewRow      // Append the new row
                ];
            }
        });

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
                Add
            </button>
        </div>
    );
}

export default ModalBody_AddRow;