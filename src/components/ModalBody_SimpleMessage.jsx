import React from 'react';

function ModalBody_SimpleMessage({ config, setShow }) {
    
    const handleAction = () => {
        // Handle deletion logic if it's a 'delete' type
        if (config.type === 'delete' && config.setData && config.index !== undefined) {
            config.setData(prevData => {
                // Use Array.prototype.filter() to return a NEW array without the item at config.index
                return prevData.filter((_, i) => i !== config.index);
            });
        }
        
        // Always close the modal after the action
        setShow(false);
    };

    return (
        <div className="space-y-4">
            <div className='text-gray-800 text-base'>
                {config.message || 'Are you sure you want to proceed?'}
            </div>
            
            <button
                type="submit"
                className={`w-full text-white ${config.type === 'delete' ? 'bg-red-700 hover:bg-red-800 focus:ring-red-300' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300'} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer`}
                onClick={handleAction}
            >
                {config.type === 'delete' ? 'Delete' : 'Ok'}
            </button>
        </div>
    );
}

export default ModalBody_SimpleMessage;