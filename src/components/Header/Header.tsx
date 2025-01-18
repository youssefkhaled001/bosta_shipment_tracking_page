import { useMainContext } from "../../contexts/MainContext";

import TopBar from "./subComponents/TopBar";
import MiddleSection from "./subComponents/MiddleSection";
import SearchBar from "./subComponents/SearchBar";
function Header() {
    const { language, setLanguage, setShipment, setLoading, setError} = useMainContext();


    return (
        <div className="relative flex flex-col gap-y-10 justify-center items-center w-full 2xl:px-64 xl:px-48 lg:px-20 sm:px-10 px-5 sm:py-4 pt-3 pb-1 bg-teal-light md:mb-16 sm:mb-14 mb-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <TopBar language={language} setLanguage={setLanguage} setShipment={setShipment} setLoading={setLoading} setError={setError} />
            <MiddleSection language={language} />
            <SearchBar language={language} setShipment={setShipment} setLoading={setLoading} setError={setError} />

        </div>
    )
}

export default Header