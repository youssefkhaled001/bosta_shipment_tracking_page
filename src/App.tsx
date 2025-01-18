import Header from "./components/Header/Header";
import IdleLoader from "./components/Loaders/IdleLoader";
import Loader from "./components/Loaders/Loader";
import Overview from "./components/Overview/Overview";
import TrackingDetails from "./components/TrackingDetails/TrackingDetails";
import { StatusTexts } from "./constants";
import { Language, useMainContext } from "./contexts/MainContext";

function App() {
  const { shipment, language, loading, error } = useMainContext();
  return (
    <div className="font-rubik w-full h-full">
      <Header />
      {shipment ? <>
        <Overview />
        <TrackingDetails />
      </> :
        <div className="flex flex-col justify-center items-center h-[25vh]">
          <h1 className="sm:text-3xl text-base text-center">
            {loading ?
              <div className="flex flex-col justify-center items-center gap-y-2">
                <h1>{StatusTexts.Loading[language as Language]}</h1>
                <Loader />
              </div>
              : error == 'NO_SHIPMENT_FOUND' ? StatusTexts.NoShipmentFound[language as Language] : StatusTexts.WaitingInput[language as Language]
            }

          </h1>
          <IdleLoader />
        </div>
      }
    </div>
  )
}

export default App
