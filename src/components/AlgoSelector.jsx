import React from 'react'

// Algorithm Selector Component
// Props: 
// - algos: Array of objects with name and key properties
// Functionality: Select one algorithm at a time, highlight the selected one
function AlgoSelector({algos, selectedAlgo, setSelectedAlgo, timeQuantum, setTimeQuantum}) {

    // Handle selecting an algorithm
    const handleSelect = (algo) => {
        setSelectedAlgo(algo);
    }

    // Handle change for Time Quantum input
    const handleInputChange = (e) => {
        const { value } = e.target;
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue) && intValue > 0) {
            setTimeQuantum(intValue);
        }
    }

    return (
        <>
            <div className="w-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-md rounded-lg">
                {
                    algos.map((algo, idx) => {
                        const isSelected = selectedAlgo === algo.key;
                        const isFirst = idx === 0;
                        const isLast = idx === algos.length - 1;
                        let selectedClasses = 'text-gray-50 bg-blue-700';
                        if (isSelected && isFirst) selectedClasses += ' rounded-t-lg';
                        if (isSelected && isLast) selectedClasses += ' rounded-b-lg';
                
                        return (
                            <a
                                className={`block text-xl w-full px-4 py-4 border-b border-gray-200 cursor-pointer ${isSelected ? selectedClasses : 'hover:bg-blue-100 hover:text-blue-800'}`}
                                onClick={() => handleSelect(algo.key)}
                                key={algo.key}
                            >
                                <div className='flex justify-between'>
                                    {
                                        algo.key == 'RR' ? (
                                            <>
                                                <div>
                                                    {`${algo.name} (${algo.key})`.toUpperCase()}
                                                </div>
                                                <div className='flex items-center justify-between space-x-2'>
                                                    <label className={`text-base font-semibold ${isSelected ? 'text-white' : ''} `} htmlFor="Time Quantum">Time Quantum (QT):</label>
                                                    <input 
                                                        type="number" 
                                                        name="Time Quantum" 
                                                        id="Time Quantum"
                                                        value={timeQuantum}
                                                        onChange={handleInputChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 w-10" 
                                                        required 
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                {`${algo.name} (${algo.key})`.toUpperCase()}
                                            </div>
                                        )
                                    }
                                </div>
                            </a>
                        );
                    })
                }
            </div>
        </>
    )
}

export default AlgoSelector