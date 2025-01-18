
function VerticalTimeline({ Steps }: {
    Steps: {
        date: string, detailedSteps: {
            description: string,
            time: string,
            msg: string,
            location: string
        }[]
    }[]
}) {
    return (
        <div className='flex flex-col'>
            {Steps?.map((step, index) => (
                <div className='flex flex-row my-1 justify-start gap-x-5' key={index}>
                    <div className='flex flex-col items-center w-4 pt-2'>
                        <div className='flex flex-col justify-center items-center relative w-full h-full'>
                            <div className='sm:w-4 w-3 aspect-square rounded-full z-10 flex justify-center items-center bg-light-gray mb-2'                            >
                            </div>
                            <div className=' w-[0.15rem] h-full bg-light-gray'></div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <h1 className="sm:text-xl text-lg">{step.date}</h1>
                        {step.detailedSteps?.map((detailedStep, i) => (
                            <div className="flex flex-col justify-between border-2 border-light-gray rounded-md p-2 my-1 sm:text-sm text-xs" key={i}>
                                <div className="text-text-dark-gray ">{detailedStep.description}</div>
                                <div className="text-text-light-gray mb-1">{detailedStep.msg}</div>
                                <div className="text-text-light-gray ">{detailedStep.time}<span>{detailedStep.location != ''? ' • ' + detailedStep.location : ''}</span></div>
                            </div>
                        ))}

                    </div>
                </div>))
            }
        </div>)
}


export default VerticalTimeline