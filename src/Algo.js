/**
 * Maps the calculated results back to the original order of the input array.
 * @param {Array} originalProcesses - The initial, unsorted array of processes.
 * @param {Array} calculatedProcesses - The array of processes after calculation, likely sorted.
 * @returns {Array} The calculated processes array, sorted back to the original order.
 */
const mapToOriginalOrder = (originalProcesses, calculatedProcesses) => {
    // 1. Create a map from Process Name to the calculated result object
    const calculatedMap = new Map();
    calculatedProcesses.forEach(p => {
        // Ensure no extra simulation properties are leaked (like remainingBurst or lastRunTime)
        calculatedMap.set(p.Process, {
            'Process': p.Process,
            'Arrival Time': p['Arrival Time'],
            'Burst Time': p['Burst Time'],
            'Completion Time': p['Completion Time'],
            'Turnaround Time': p['Turnaround Time'],
            'Waiting Time': p['Waiting Time'],
        });
    });

    // 2. Iterate over the original order and retrieve the calculated result
    return originalProcesses.map(originalP => calculatedMap.get(originalP.Process));
};

const calculateFCFS = (processes) => {
    // 1. Create a deep copy for safe modification and simulation
    const simulationProcs = JSON.parse(JSON.stringify(processes));
    
    // Sort the copy by Arrival Time for simulation logic
    simulationProcs.sort((a, b) => a['Arrival Time'] - b['Arrival Time']);

    let currentTime = 0;
    let totalTAT = 0;
    let totalWT = 0;

    for (let i = 0; i < simulationProcs.length; i++) {
        const process = simulationProcs[i];

        const startTime = Math.max(currentTime, process['Arrival Time']);
        
        process['Completion Time'] = startTime + process['Burst Time'];
        process['Turnaround Time'] = process['Completion Time'] - process['Arrival Time'];
        process['Waiting Time'] = process['Turnaround Time'] - process['Burst Time'];
        
        currentTime = process['Completion Time'];

        totalTAT += process['Turnaround Time'];
        totalWT += process['Waiting Time'];
    }

    // 2. Map the calculated results back to the original process order
    const finalProcesses = mapToOriginalOrder(processes, simulationProcs);

    const avgTAT = totalTAT / processes.length;
    const avgWT = totalWT / processes.length;

    return {
        processes: finalProcesses, // Original order
        averageTurnaroundTime: avgTAT,
        averageWaitingTime: avgWT
    };
};

const calculateSJF = (processes) => {
    const simulationProcs = JSON.parse(JSON.stringify(processes));
    simulationProcs.sort((a, b) => a['Arrival Time'] - b['Arrival Time']); // Initial sort for simulation start
    
    let n = simulationProcs.length;
    let completed = 0;
    let currentTime = 0;
    let totalTAT = 0;
    let totalWT = 0;
    let calculatedProcesses = []; // Stores processes as they complete

    // Mark processes as completed within the simulationProcs array
    const completionFlags = new Array(n).fill(false); 

    while (completed < n) {
        let shortestJobIndex = -1;
        let minBurst = Infinity;

        // Find the shortest job that has arrived and is not yet completed
        for (let i = 0; i < n; i++) {
            if (!completionFlags[i] && simulationProcs[i]['Arrival Time'] <= currentTime) {
                if (simulationProcs[i]['Burst Time'] < minBurst) {
                    minBurst = simulationProcs[i]['Burst Time'];
                    shortestJobIndex = i;
                }
            }
        }

        if (shortestJobIndex === -1) {
            // CPU is idle, advance time to the next arrival time of an uncompleted job
            const nextArrival = simulationProcs
                .filter((p, i) => !completionFlags[i])
                .reduce((min, p) => Math.min(min, p['Arrival Time']), Infinity);
            currentTime = nextArrival;
            continue;
        }

        const process = simulationProcs[shortestJobIndex];

        const startTime = currentTime;
        
        process['Completion Time'] = startTime + process['Burst Time'];
        process['Turnaround Time'] = process['Completion Time'] - process['Arrival Time'];
        process['Waiting Time'] = process['Turnaround Time'] - process['Burst Time'];
        
        currentTime = process['Completion Time'];

        calculatedProcesses.push(process);
        completionFlags[shortestJobIndex] = true; 
        completed++;

        totalTAT += process['Turnaround Time'];
        totalWT += process['Waiting Time'];
    }

    // Map the calculated results back to the original process order
    const finalProcesses = mapToOriginalOrder(processes, calculatedProcesses);

    const avgTAT = totalTAT / n;
    const avgWT = totalWT / n;

    return {
        processes: finalProcesses, // Original order
        averageTurnaroundTime: avgTAT,
        averageWaitingTime: avgWT
    };
};

const calculateRR = (processes, quantum = 2) => {
    const simulationProcs = JSON.parse(JSON.stringify(processes));
    let n = simulationProcs.length;

    // 1. Initial Setup: Sort by Arrival Time for initial queueing logic
    simulationProcs.sort((a, b) => a['Arrival Time'] - b['Arrival Time']);
    simulationProcs.forEach(p => {
        p.remainingBurst = p['Burst Time'];
        p.lastRunTime = p['Arrival Time']; // Time it last entered the CPU/ready queue
    });

    let currentTime = 0;
    let readyQueue = [];
    let completedProcessesCount = 0;
    let totalTAT = 0;
    let totalWT = 0;

    let procIndex = 0; // Index for tracking processes that haven't arrived yet
    let finalResults = []; // Stores processes as they complete

    while (completedProcessesCount < n) {
        // Add newly arrived processes to the ready queue
        while (procIndex < n && simulationProcs[procIndex]['Arrival Time'] <= currentTime) {
            readyQueue.push(simulationProcs[procIndex]);
            procIndex++;
        }

        if (readyQueue.length === 0) {
            if (procIndex < n) {
                // CPU is idle, advance time to the next arrival
                currentTime = simulationProcs[procIndex]['Arrival Time'];
                continue;
            } else {
                break;
            }
        }

        const currentProcess = readyQueue.shift();
        
        // Waiting Time calculation: Time spent waiting since it last became ready/ran
        totalWT += currentTime - currentProcess.lastRunTime; 
        
        const timeSlice = Math.min(quantum, currentProcess.remainingBurst);

        currentTime += timeSlice;
        currentProcess.remainingBurst -= timeSlice;

        // Check for new arrivals during this time slice and add them BEFORE re-queueing
        while (procIndex < n && simulationProcs[procIndex]['Arrival Time'] <= currentTime) {
            readyQueue.push(simulationProcs[procIndex]);
            procIndex++;
        }

        if (currentProcess.remainingBurst === 0) {
            // Process completed
            currentProcess['Completion Time'] = currentTime;
            currentProcess['Turnaround Time'] = currentProcess['Completion Time'] - currentProcess['Arrival Time'];
            // WT is already accumulated in totalWT, but for the object we use the standard formula
            currentProcess['Waiting Time'] = currentProcess['Turnaround Time'] - currentProcess['Burst Time']; 

            finalResults.push(currentProcess);
            totalTAT += currentProcess['Turnaround Time'];
            
            completedProcessesCount++;
        } else {
            // Process preempted, update lastRunTime and put back into the ready queue
            currentProcess.lastRunTime = currentTime;
            readyQueue.push(currentProcess);
        }
    }

    // Map the calculated results back to the original process order
    const finalProcesses = mapToOriginalOrder(processes, finalResults);

    const avgTAT = totalTAT / n;
    const avgWT = totalWT / n;

    return {
        processes: finalProcesses, // Original order
        averageTurnaroundTime: avgTAT,
        averageWaitingTime: avgWT
    };
};

const calculateAlgo = (algo, processes, quantum) => {
    switch (algo) {
        case 'FCFS':
            return calculateFCFS(processes);
        case 'SJF':
            return calculateSJF(processes);
        case 'RR':
            return calculateRR(processes, quantum);
        default:
            return;
    }
};

export default calculateAlgo;