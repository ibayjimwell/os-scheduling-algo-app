import React from 'react'
import Navbar from './components/Navbar.jsx'
import AlgoSelector from './components/AlgoSelector.jsx'
import Table from './components/Table.jsx'
import calculateAlgo from './Algo.js';
import Averages from './components/Averages.jsx';
import GanttTimeline from './components/GanttTimeline.jsx';

// --- Utility Function to Check for Empty Table ---
const isTableEmpty = (data) => {
    if (data.length === 0) return true;
    
    // Check if the array contains only one row AND all values in that row are null
    if (data.length === 1) {
        return Object.values(data[0]).every(value => value === null || value === undefined);
    }
    
    return false;
};

// The root component of the application
function App() {

  // Get the selectd Algorithm
  const [selectedAlgo, setSelectedAlgo] = React.useState('');

  // Initial data for the table 
  const initialData = { 'Process': null, 'Arrival Time': null, 'Burst Time': null, 'Completion Time': null, 'Turnaround Time': null, 'Waiting Time': null };

  // The data
  // Those state is always have changes 
  const [data, setData] = React.useState([initialData]);
  const [calculatedData, setCalculatedData] = React.useState([initialData]);

  // Time Quantum for Round Robin
  const [timeQuantum, setTimeQuantum] = React.useState(2);

  // Avereges
  const [averages, setAverages] = React.useState({});

   React.useEffect(() => {
        // console.log('Data changed:', data);

        // 1. Check if the table is logically empty (only the placeholder row exists)
        if (isTableEmpty(data)) {
            // Ensure data state has the single placeholder row for display
            if (data.length === 0) {
                 setData([initialData]);
            }
            // CRITICAL FIX: Reset calculatedData to the placeholder state and stop the useEffect here.
            setCalculatedData([initialData]);
            setAverages({});
            return;
        }

        // 2. If valid data and an algorithm is selected, proceed with calculation
        if (selectedAlgo) {
            const result = calculateAlgo(selectedAlgo, data, timeQuantum);
            if (result) {
                setCalculatedData(result.processes);
                setAverages({
                    'Average Turnaround Time': result.averageTurnaroundTime,
                    'Average Waiting Time': result.averageWaitingTime
                });
            }
        }
        
        // If an algorithm is NOT selected but data exists, it won't calculate,
        // which is correct (it will just show the entered AT/BT values).

    }, [data, selectedAlgo, timeQuantum]);

  return (
    <>
      <Navbar title='OS Sheduling Calculator'/>
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
          timeQuantum={timeQuantum}
          setTimeQuantum={setTimeQuantum}
        />
        
      </div>
      
      <div className='mx-4 mb-4'>

        <Table 
          data={calculatedData}
          setData={setData}
          selectedAlgo={selectedAlgo}
        />

        <Averages 
          name="Average Turnaround Time:"
          value={averages['Average Turnaround Time']?.toFixed(2)}
        />
        <Averages 
          name="Average Waiting Time:"
          value={averages['Average Waiting Time']?.toFixed(2)}
        />

      </div>

      <div className='mx-4 bg-white shadow-md border border-gray-200 rounded-lg'>
        <GanttTimeline data={calculatedData} />
      </div>

      <div className='text-center text-sm text-gray-500 my-4'>
        Ibay Jimwell, Flores Charizza Mae, Calara John Benedict, Parone Justin Railey, Tadle Aries
      </div>

    </>
  )
}

export default App