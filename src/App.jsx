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
        <Table />
      </div>

    </>
  )
}

export default App