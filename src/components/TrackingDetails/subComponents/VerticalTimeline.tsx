/**
 * Interface for a detailed timeline step
 */
interface DetailedStep {
    /** Description of the timeline event */
    description: string;
    /** Time of the event */
    time: string;
    /** Additional message or details */
    msg: string;
    /** Location where the event occurred */
    location: string;
}

/**
 * Interface for a timeline step group
 */
interface TimelineStep {
    /** Date for the group of steps */
    date: string;
    /** Detailed steps that occurred on this date */
    detailedSteps: DetailedStep[];
}

/**
 * Props interface for the VerticalTimeline component
 */
interface VerticalTimelineProps {
    /** Array of timeline steps grouped by date */
    Steps: TimelineStep[];
}

/**
 * VerticalTimeline component that displays a chronological sequence of events
 * with dates, descriptions, times, and locations in a vertical layout
 */
function VerticalTimeline({ Steps }: VerticalTimelineProps) {
    return (
        <div className='flex flex-col'>
            {Steps?.map((step, index) => (
                <div 
                    className='flex flex-row my-1 justify-start gap-x-5' 
                    key={index}
                >
                    {/* Timeline connector with dot */}
                    <div className='flex flex-col items-center w-4 pt-2'>
                        <div className='flex flex-col justify-center items-center relative w-full h-full'>
                            {/* Timeline dot */}
                            <div className='sm:w-4 w-3 aspect-square rounded-full z-10 flex justify-center items-center bg-light-gray mb-2'>
                            </div>
                            {/* Vertical connecting line */}
                            <div className='w-[0.15rem] h-full bg-light-gray'></div>
                        </div>
                    </div>

                    {/* Timeline content */}
                    <div className="flex flex-col flex-1">
                        {/* Date header */}
                        <h1 className="sm:text-xl text-lg">{step.date}</h1>
                        
                        {/* Detailed steps for this date */}
                        {step.detailedSteps?.map((detailedStep, i) => (
                            <div 
                                className="flex flex-col justify-between border-2 border-light-gray rounded-md p-2 my-1 sm:text-sm text-xs" 
                                key={i}
                            >
                                <div className="text-text-dark-gray">
                                    {detailedStep.description}
                                </div>
                                <div className="text-text-light-gray mb-1">
                                    {detailedStep.msg}
                                </div>
                                <div className="text-text-light-gray">
                                    {detailedStep.time}
                                    {detailedStep.location && (
                                        <span>{' • ' + detailedStep.location}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default VerticalTimeline;