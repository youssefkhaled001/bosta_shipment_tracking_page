/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Bosta_API_Route, HeaderTexts } from '../../../constants';
import SearchIcon from '../../../assets/icons/Search.png'
import { Language } from '../../../contexts/MainContext';
import search from '../../../utils/Search';
import ExtractShipmentInformation from '../../../utils/ExtractShipmentInformation';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SearchBar({ language, setShipment, setLoading, setError }: any) {
    const [searchText, setSearchText] = useState('');
    const [lastSearch, setLastSearch] = useState('');
    const [shipmentState, setShipmentState] = useState('')

    useEffect(() => {
        try {
            ExtractShipmentInformation({ shipment: shipmentState, language, setShipment })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setShipment(undefined)
            setError("SOMETHING_WENT_WRONG")
        }
    }, [shipmentState, language, setShipment, setError])

    return (
        <div className="flex-row h-16 justify-center items-center w-full -mt-[10%] absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 sm:flex hidden">
            <button className="w-fit h-full px-4 bg-red text-white flex justify-center items-center shadow-md"
                style={language === 'en' ? {
                    borderTopLeftRadius: '0.5rem',
                    borderBottomLeftRadius: '0.5rem',
                } : {
                    borderTopRightRadius: '0.5rem',
                    borderBottomRightRadius: '0.5rem',
                }}
                onClick={() => {
                    search({ searchText, setShipment, setLoading, setError, setShipmentState, setLastSearch, lastSearch, Bosta_API_Route })
                }}>
                <img src={SearchIcon} className="w-fit h-6" />
            </button>
            <input className="w-[22rem] h-full border border-light-gray px-3 shadow-md focus:outline-none"
                placeholder={HeaderTexts.SearchPlaceholder[language as Language]} type="text" dir={language === "ar" ? "ltr" : "rtl"}
                style={language === 'ar' ? {
                    borderTopLeftRadius: '0.5rem',
                    borderBottomLeftRadius: '0.5rem',
                } : {
                    borderTopRightRadius: '0.5rem',
                    borderBottomRightRadius: '0.5rem',
                }}
                value={searchText} onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter')
                        search({ searchText, setShipment, setLoading, setError, setShipmentState, setLastSearch, lastSearch, Bosta_API_Route })
                }} />
        </div>
    )
}

export default SearchBar