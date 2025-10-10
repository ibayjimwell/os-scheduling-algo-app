import React from 'react';
import '../GanttTimeline.css'; 

/**
 * Transforms the scheduling result data into Gantt blocks data, safely handling nulls and invalid numbers.
 * @param {Array<Object>} rawData - The array of process objects.
 * @returns {Array<Object>} The transformed, validated data array.
 */
const transformDataForGantt = (rawData) => {
    if (!Array.isArray(rawData) || rawData.length === 0) {
        return [];
    }

    // 1. Sort by Completion Time to ensure correct chronological order
    const sortedData = [...rawData].sort((a, b) => 
        (a["Completion Time"] ?? Infinity) - (b["Completion Time"] ?? Infinity)
    );

    const transformed = sortedData.map(item => {
        // Safely extract and convert time values, defaulting to 0 for null/undefined/NaN
        const completionTime = parseFloat(item["Completion Time"]) || 0;
        const burstTime = parseFloat(item["Burst Time"]) || 0;
        
        // Calculate the execution start time, ensuring it's not negative
        const startTime = Math.max(0, completionTime - burstTime);
        
        return {
            process: item["Process"] ?? 'N/A',
            start: startTime,
            duration: burstTime,
            end: completionTime,
        };
    })
    // 2. Filter out invalid or zero-duration blocks (processes that haven't run or have invalid data)
    .filter(item => item.duration > 0 && isFinite(item.start) && isFinite(item.end));

    return transformed;
};

// --------------------------------------------------------------------------------
// REACT COMPONENT
// --------------------------------------------------------------------------------

function GanttTimeline({ data }) {
    
    // Transform the data safely using useMemo
    const ganttData = React.useMemo(() => {
        return transformDataForGantt(data);
    }, [data]);

    // Handle the case where the transformed data is empty
    if (ganttData.length === 0) {
        return <div className="text-center p-4 text-gray-500">No valid scheduling data available to render the Gantt Chart.</div>;
    }

    // Determine the total length of the timeline
    // Use Math.max to ensure the max time is correctly captured, even if the last element is strange.
    const maxTime = Math.max(...ganttData.map(item => item.end), 0);
    
    // If maxTime is 0, we can't draw the chart
    if (maxTime === 0) {
         return <div className="text-center p-4 text-gray-500">Total execution time is zero, cannot render chart.</div>;
    }

    // Collect all unique time points for the markers (0 is usually implicitly included)
    const timeMarkers = Array.from(new Set(
        ganttData.flatMap(item => [item.start, item.end])
    )).sort((a, b) => a - b);
    
    // Simple color utility (kept simple for brevity)
    const getColor = (processName) => {
        const hash = processName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colors = [
            '#4ADE80', 
            '#60A5FA', 
            '#FBBF24', 
            '#F87171', 
            '#A78BFA'
        ];
        return colors[hash % colors.length];
    };
    
    // --- Render Logic ---
    return (
        <div className="gantt-container">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">GANTT CHART</h3>
            
            <div className="gantt-timeline">
                {ganttData.map((item, index) => {
                    // Calculate the block's size and position based on maxTime
                    const widthPercent = (item.duration / maxTime) * 100;
                    const offsetPercent = (item.start / maxTime) * 100;
                    
                    const blockStyle = {
                        width: `${widthPercent}%`,
                        backgroundColor: getColor(item.process),
                        // Position the block by setting the left margin based on its start time
                        // This only needs to be calculated if the block doesn't directly follow the previous one.
                        // We rely on the flexbox layout here, but we explicitly set margin-left for the first block's offset.
                    };
                    
                    // For a pure timeline, we position the first block with margin-left
                    // and let subsequent blocks align automatically due to the sorted data.
                    const finalBlockStyle = {
                        ...blockStyle,
                        // If it's the first block, apply the offset.
                        // For subsequent blocks, they are adjacent in the data if the algorithm is FCFS/SJF.
                        // We use the start time to dynamically calculate the margin-left to ensure correct placement.
                        marginLeft: `${offsetPercent}%`
                    };
                    
                    // To get the contiguous look of the image, we should only apply margin-left to the first block's start time
                    // For subsequent blocks, if their start time is the previous block's end time, they should have margin-left: 0.
                    // Since the data is sorted and assumes one contiguous timeline, we only need to calculate the *first* block's offset.
                    
                    let prevEnd = index > 0 ? ganttData[index - 1].end : 0;
                    let currentStart = item.start;
                    let idleDuration = currentStart - prevEnd;
                    
                    // --- IDLE Block Handling (for gaps) ---
                    let idleBlock = null;
                    if (idleDuration > 0) {
                        const idleWidthPercent = (idleDuration / maxTime) * 100;
                        idleBlock = (
                            <div 
                                key={`idle-${index}`}
                                className="gantt-block gantt-idle"
                                style={{ width: `${idleWidthPercent}%` }}
                            >
                                <span className="process-label" style={{ color: 'black' }}>
                                    Idle
                                </span>
                            </div>
                        );
                    }

                    return (
                        <React.Fragment key={item.process + index}>
                            {/* Render Idle block if a gap exists */}
                            {idleBlock}
                            
                            {/* Render Process block */}
                            <div 
                                className="gantt-block" 
                                style={{ width: `${widthPercent}%`, backgroundColor: getColor(item.process) }}
                            >
                                <span className="process-label" style={{ color: 'white' }}>
                                    {item.process}
                                </span>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
            
            {/* --- Time Axis --- */}
            <div className="time-axis">
                {timeMarkers.map((time) => (
                    <div 
                        key={time} 
                        className="time-marker-wrapper" 
                        style={{ left: `${(time / maxTime) * 100}%` }}
                    >
                        <div className="time-line"></div>
                        <span className="time-label">{time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GanttTimeline;