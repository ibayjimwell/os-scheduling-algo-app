import React from 'react'

// Algorithm Selector Component
// Props: 
// - algos: Array of objects with name and key properties
// Functionality: Select one algorithm at a time, highlight the selected one
function AlgoSelector({algos}) {

    const [selectedAlgo, setSelectedAlgo] = React.useState('');

    const handleSelect = (algo) => {
        setSelectedAlgo(algo);
    }

    return (
        <>
            <div className="w-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
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
                                {`${algo.name} (${algo.key})`.toUpperCase()}
                            </a>
                        );
                    })
                }
            </div>
        </>
    )
}

export default AlgoSelector