import Check from '../../../assets/icons/Check.svg'
import { useMainContext } from '../../../contexts/MainContext'
function HorizontalTimeLine({ Steps }: { Steps: { title: string, description: string, done: boolean }[] }) {
  const { language } = useMainContext();
  return (
    <div className='flex sm:flex-row flex-col w-full lg:p-12 md:p-8 sm:p-5 py-3 px-2' >
      {Steps?.map((step, index) => (
        <>
          {/* Desktop & Tablets */}
          <div className='sm:flex flex-col hidden items-center w-full' key={index}>
            <div className='flex sm:flex-row flex-col justify-center relative w-full'>
              <div className='w-4 h-4 rounded-full z-10 flex justify-center items-center'
                style={{
                  border: step.done ? '2px solid var(--teal)' : '2px dashed var(--light-gray)',
                  background: step.done ? 'var(--teal)' : 'var(--light-gray)'
                }}
              >
                {step.done && <img src={Check} alt="" className='w-3 h-3 rotate-[9deg]' />}
              </div>
              {index !== Steps.length - 1 &&
                <div className='absolute w-1/2 h-0 left-1/2 top-1/2 -translate-y-1/2 '
                  style={{
                    ...(step.done
                      ? {
                        border: '1.75px solid var(--teal)',
                      }
                      : {
                        border: 'none',
                        background: 'repeating-linear-gradient(90deg, var(--light-gray) 0%, var(--light-gray) 15px, transparent 15px, transparent 30px)',
                        backgroundSize: '22px 100%',
                        padding: '1.75px',
                      }),
                    ...{
                      left: language === 'en' ? '50%' : '0',
                    }
                  }
                  }
                ></div>}
              {index !== 0 &&
                <div className='absolute w-1/2 h-0 left-0 top-1/2 -translate-y-1/2'
                  style={{
                    ...(step.done
                      ? {
                        border: '1.75px solid var(--teal)',
                      }
                      : {
                        border: 'none',
                        background: 'repeating-linear-gradient(90deg, var(--light-gray) 0%, var(--light-gray) 15px, transparent 15px, transparent 30px)',
                        backgroundSize: '22px 100%',
                        padding: '1.75px',
                      }),
                    ...{
                      right: language === 'en' ? '50%' : '0',
                    }
                  }}
                ></div>}
            </div>
            <div className='flex flex-col items-center mt-4 md:w-2/3 w-[80%] justify-center text-center'>
              <h3 className='md:text-xs text-[0.60rem] text-text-dark-gray font-[500]'>{step.title}</h3>
              <h3 className='md:text-xs text-[0.60rem] text-text-dark-gray font-[400]'>{step.description}</h3>
            </div>
          </div>
          {/* Mobile */}
          <div className='flex flex-row items-center justify-start sm:hidden gap-x-3' key={index+"_2"}>
            <div className='flex flex-col justify-center items-center'>
              {index !== 0 && <div className='w-0 h-5' style={!step.done ? {
                border: '1.75px dashed var(--light-gray)',
              } : {
                width: '0.25rem',
                background: 'var(--teal)',
              }}></div>}
              <div className='w-3 aspect-square rounded-full' style={{
                backgroundColor: step.done ? 'var(--teal)' : 'var(--light-gray)'
              }}></div>
              {index !== Steps.length - 1 && <div className='w-0 h-5' style={!step.done ? {
                border: '1.75px dashed var(--light-gray)',
              } : {
                width: '0.25rem',
                background: 'var(--teal)',
              }}></div>}
            </div>
            <div className='flex flex-col items-start w-full justify-start h-full' style={{
              alignSelf: index === 0 ? 'start' : index === Steps.length - 1 ? 'end' : 'center',
            }}>
              <h3 className='sm:text-xs text-[0.65rem] text-text-dark-gray font-[500]'>{step.title}</h3>
              <h3 className='sm:text-xs text-[0.65rem] text-text-light-gray font-[400]'>{step.description}</h3>
            </div>
          </div>
        </>
      ))}

    </div>
  )
}

export default HorizontalTimeLine