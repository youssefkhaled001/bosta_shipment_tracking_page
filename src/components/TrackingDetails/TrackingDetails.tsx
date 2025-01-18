import { StatusTexts, TrackingDetailsText } from "../../constants";
import { useMainContext } from "../../contexts/MainContext";
import IdleLoader from "../Loaders/IdleLoader";
import VerticalTimeLine from "./subComponents/VerticalTimeline"

function TrackingDetails() {
  const { language, shipment } = useMainContext();
  return (
    <div className="2xl:px-64 xl:px-48 lg:px-20 sm:px-10 px-5 mt-5 py-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h2 className="sm:text-xl text-lg text-text-light-gray mb-5">{TrackingDetailsText[language]}</h2>
      <VerticalTimeLine Steps={
        shipment?.Events.map((event) => ({
          date: event.date,
          detailedSteps: event.events.map(detail => ({ description: detail.state, time: detail.time, msg: detail.msg, location: '' }))
        })) ?? []
      }
      />
      {
        shipment?.Events.length === 0 && 
        <div className="flex flex-col justify-center items-center w-full ">
          <h2 className="text-xl text-text-light-gray">{StatusTexts.NoEvents[language]}</h2>
          <IdleLoader/>
        </div>
      }
    </div>
  )
}

export default TrackingDetails