import { useEffect, useState } from 'react';
import Arrow from '../../../assets/icons/arrow-down-sign-to-navigate.png';
import ArabicLogo from '../../../assets/images/Logo_AR.svg';
import EnglishLogo from '../../../assets/images/Logo_EN.png';
import ExtractShipmentInformation from '../../../utils/ExtractShipmentInformation';
import { Bosta_API_Route } from '../../../constants';
import search from '../../../utils/Search';
import { ShipmentInfo } from '../../../contexts/MainContext';

/**
 * Props interface for the TopBar component
 */
interface TopBarProps {
    /** Current language setting (en/ar) */
    language: 'en' | 'ar';
    /** Function to update language preference */
    setLanguage: (lang: 'en' | 'ar') => void;
    /** Function to update shipment information */
    setShipment: (shipment: ShipmentInfo | undefined) => void;
    /** Function to update loading state */
    setLoading: (loading: boolean) => void;
    /** Function to update error state */
    setError: (error: string | null) => void;
}

/**
 * TopBar component that provides language switching and mobile search functionality
 */
function TopBar({ language, setLanguage, setShipment, setLoading, setError }: TopBarProps) {
    // State for language dropdown visibility
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    // State for mobile search bar visibility
    const [showSearchBar, setShowSearchBar] = useState(false);
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
     * Handles the search functionality for both click and Enter key events
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

    return (
        <div className="flex flex-row justify-between w-full select-none gap-x-4">
            {/* Left section with language selector and search */}
            <div className='flex flex-row items-center gap-x-4 flex-1'>
                {/* Language selector dropdown */}
                <div 
                    style={{ fontFamily: language === 'en' ? 'Cairo' : 'Rubik' }} 
                    className="flex flex-row justify-center items-center gap-x-1 relative cursor-pointer" 
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                    <img src={Arrow} className="w-2 h-fit" alt="Language selector" />
                    {language === 'ar' ? 'English' : 'عربي'}
                    
                    {/* Language dropdown menu */}
                    <div 
                        className="h-fit w-fit bottom-0 translate-y-full absolute left-1/2 -translate-x-1/2 overflow-hidden transition-all ease-in-out"
                        style={{ maxHeight: isLanguageOpen ? '100px' : '0px' }}
                    >
                        <div 
                            className="bg-white hover:bg-light-gray rounded-t-md text-center py-2 px-4" 
                            onClick={() => setLanguage("en")}
                        >
                            English
                        </div>
                        <div 
                            className="bg-white hover:bg-light-gray rounded-b-md text-center py-2 px-4" 
                            onClick={() => setLanguage("ar")}
                        >
                            عربي
                        </div>
                    </div>
                </div>

                {/* Mobile search bar */}
                <div 
                    className="w-full h-full relative rounded-md flex flex-row items-center justify-start max-w-6 transition-all duration-500 ease-in-out sm:hidden"
                    style={{
                        maxWidth: showSearchBar ? '200px' : '25px',
                        background: showSearchBar ? 'var(--red)' : 'transparent',
                    }}
                >
                    {/* Search icon */}
                    <div 
                        className="w-fit h-6 mx-2" 
                        onClick={() => {
                            if (!showSearchBar) {
                                setShowSearchBar(true);
                            }
                            handleSearch();
                        }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            x="0px" 
                            y="0px" 
                            width="1rem" 
                            height="100%" 
                            viewBox="0 0 30 30" 
                            fill={showSearchBar ? 'white' : 'black'}
                        >
                            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                        </svg>
                    </div>

                    {/* Search input field */}
                    <input 
                        type="text" 
                        className="w-full h-full text-text-light-gray outline-none p-1 text-xs" 
                        placeholder="Search"
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)}
                        onBlur={() => setShowSearchBar(false)}
                        style={{ background: showSearchBar ? 'white' : 'transparent' }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }} 
                    />
                </div>
            </div>

            {/* Logo section */}
            <div 
                className="flex flex-row cursor-pointer items-center" 
                onClick={() => { window.location.reload() }}
            >
                {language === 'en' ? 
                    <img src={EnglishLogo} className="w-fit sm:h-9 h-6" alt="English Logo" /> : 
                    <img src={ArabicLogo} className="w-fit h-6" alt="Arabic Logo" />
                }
            </div>
        </div>
    );
}

export default TopBar;