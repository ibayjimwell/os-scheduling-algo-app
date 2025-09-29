import React from 'react'
import Navbar from './components/Navbar.jsx'
import AlgoSelector from './components/AlgoSelector.jsx'
import Table from './components/Table.jsx'

// The root component of the application
function App() {

  // Get the selectd Algorithm
  const [selectedAlgo, setSelectedAlgo] = React.useState('');

  return (
    <>
      <Navbar title='Operating System Scheduling'/>
      <div className='mt-16 p-4'>

        {/* Algorithm Selector: It's a selector component that can only select one on the provided name and key. */}
        <AlgoSelector 
            algos={[
              {
                name: 'First Come First Serve',
                key: 'FCFS'
              },
              {
                name: 'Shortest Job First',
                key: 'SJF'
              },
              {
                name: 'Round Robin',
                key: 'RR'
              }
          ]}
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
        />
        
      </div>
      
      <div className='mx-4'>
        <Table data={
          [
            { 'Process': 'Process 0', 'Arrival Time': 0, 'Burst Time': 0, 'Completed Time': 0, 'Turnaround Time': 0 },
          ]
        }
        selectedAlgo={selectedAlgo}
        />
      </div>

    </>
  )
}

export default App