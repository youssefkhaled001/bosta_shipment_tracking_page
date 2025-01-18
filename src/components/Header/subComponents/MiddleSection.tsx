/* eslint-disable @typescript-eslint/no-explicit-any */
import Pin from '../../../assets/icons/Pin.png'
import { HeaderTexts } from '../../../constants';
import { Language } from '../../../contexts/MainContext';


function MiddleSection({language}: any) {
    return (
        <>
            <div className="flex flex-col justify-center items-center font-cairo select-none">
                <img src={Pin} className="w-fit sm:h-28 h-20" />
                <h1 className="sm:text-4xl text-2xl font-bold">{HeaderTexts.HeaderText[language as Language]}</h1>
            </div>
            <div className="md:h-2 h-0"></div>
        </>
    )
}

export default MiddleSection