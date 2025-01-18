import { useEffect, useState } from 'react';
import { Bosta_API_Route, HeaderTexts } from '../../../constants';
import SearchIcon from '../../../assets/icons/Search.png';
import { Language, ShipmentInfo } from '../../../contexts/MainContext';
import search from '../../../utils/Search';
import ExtractShipmentInformation from '../../../utils/ExtractShipmentInformation';

/**
 * Props interface for the SearchBar component
 */
interface SearchBarProps {
    /** Current language setting (en/ar) */
    language: Language;
    /** Function to update shipment information in parent state */
    setShipment: (shipment: ShipmentInfo | undefined) => void;
    /** Function to update loading state */
    setLoading: (loading: boolean) => void;
    /** Function to update error state */
    setError: (error: string | null) => void;
}

/**
 * SearchBar component that provides shipment tracking search functionality
 * Includes a search input and button with responsive styling based on language direction
 */
function SearchBar({ language, setShipment, setLoading, setError }: SearchBarProps) {
    // Track the current search input value
    const [searchText, setSearchText] = useState('');
    // Store the last executed search to prevent duplicate requests
    const [lastSearch, setLastSearch] = useState('');
    // Store the raw shipment data from API
    const [shipmentState, setShipmentState] = useState('');

    /**
     * Effect to process raw shipment data when it changes
     * Converts raw API data into formatted shipment information
     */
    useEffect(() => {
        try {
            ExtractShipmentInformation({ 
                shipment: shipmentState, 
                language, 
                setShipment 
            });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setShipment(undefined);
            setError("SOMETHING_WENT_WRONG");
        }
    }, [shipmentState, language, setShipment, setError]);

    /**
     * Executes search when user clicks search button or presses enter
     */
    const handleSearch = () => {
        search({ 
            searchText, 
            setShipment, 
            setLoading, 
            setError, 
            setShipmentState, 
            setLastSearch, 
            lastSearch, 
            Bosta_API_Route 
        });
    };

    // Border radius styles based on language direction
    const borderStyle = language === 'en' 
        ? {
            button: {
                borderTopLeftRadius: '0.5rem',
                borderBottomLeftRadius: '0.5rem',
            },
            input: {
                borderTopRightRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
            }
        }
        : {
            button: {
                borderTopRightRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
            },
            input: {
                borderTopLeftRadius: '0.5rem',
                borderBottomLeftRadius: '0.5rem',
            }
        };

    return (
        <div className="flex-row h-16 justify-center items-center w-full -mt-[10%] absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 sm:flex hidden">
            <button 
                className="w-fit h-full px-4 bg-red text-white flex justify-center items-center shadow-md"
                style={borderStyle.button}
                onClick={handleSearch}
            >
                <img src={SearchIcon} className="w-fit h-6" alt="Search" />
            </button>
            <input 
                className="w-[22rem] h-full border border-light-gray px-3 shadow-md focus:outline-none"
                placeholder={HeaderTexts.SearchPlaceholder[language]} 
                type="text" 
                dir={language === "ar" ? "ltr" : "rtl"}
                style={borderStyle.input}
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                }} 
            />
        </div>
    );
}

export default SearchBar;