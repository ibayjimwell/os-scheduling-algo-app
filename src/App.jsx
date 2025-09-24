import React from 'react'
import Navbar from './components/Navbar.jsx'
import AlgoSelector from './components/AlgoSelector.jsx'
import Table from './components/Table.jsx'

// The root component of the application
function App() {
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
        />
        
      </div>
      
      <div className='mx-4'>
        <Table data={
          [
            { 'Process': 'P1', 'Arrival Time': 0, 'Burst Time': 8 },
            { 'Process': 'P2', 'Arrival Time': 1, 'Burst Time': 4 },
            { 'Process': 'P3', 'Arrival Time': 2, 'Burst Time': 9 },
            { 'Process': 'P4', 'Arrival Time': 3, 'Burst Time': 5 }
          ]
        }
        />
      </div>

    </>
  )
}

export default App