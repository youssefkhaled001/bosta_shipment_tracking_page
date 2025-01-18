import { StatusTexts, TimeLineTexts } from "../../constants";
import { useMainContext } from "../../contexts/MainContext"
import HorizontalTimeLine from "./subComponents/HorizontalTimeLine"

function Overview() {
    const { shipment, language } = useMainContext();

    return (
        <div className="2xl:px-64 xl:px-48 lg:px-20 sm:px-10 px-5" dir={language == 'en' ? 'ltr' : 'rtl'}>
            <div className="w-full h-fit p-6 border-light-gray shadow-md border-[1px] rounded-md" >
                <h3 className="sm:text-xs text-[0.60rem] text-text-light-gray">ORDER #{shipment?.TrackingNumber}</h3>
                <h1 className="sm:text-3xl text-xl font-semibold">{(shipment?.StatusCode ?? 0) == 46 ? StatusTexts.Returned[language] : (shipment?.StatusCode ?? 0) == 45 ? StatusTexts.Delivered[language] : StatusTexts.Arriving[language]} <span className="text-teal">{shipment?.PromisedDate}</span></h1>
                <h3 className="sm:text-xs text-[0.60rem] text-text-light-gray">{(shipment?.Events.length ?? -1) > 0 ? shipment?.Events[0].events[0].msg ? shipment?.Events[0].events[0].msg : shipment?.Events[0].events[0].state : ''}</h3>
                <HorizontalTimeLine Steps={[{
                    title: TimeLineTexts.ShipmentCreated[language],
                    description: shipment?.ShipmentDate??'',
                    done: (shipment?.StatusCode ?? 0) >= 10
                },
                {
                    title: TimeLineTexts.PickedUp[language],
                    description: shipment?.PickedUpDate??'',
                    done: (shipment?.StatusCode ?? 0) >= 24
                },
                {
                    title: TimeLineTexts.InTransit[language],
                    description: shipment?.InTransitDate??'',
                    done: (shipment?.StatusCode ?? 0) >= 24 //Because There is no In Transit Status Code
                },
                {
                    title: TimeLineTexts.OutForDelivery[language],
                    description: shipment?.OutForDeliveryDate??'',
                    done: (shipment?.StatusCode ?? 0) >= 41
                },
                {
                    title: TimeLineTexts.Delivered[language],
                    description: shipment?.DeliveredDate??'',
                    done: (shipment?.StatusCode ?? 0) >= 45 && (shipment?.StatusCode ?? 0) < 47
                }]} />
            </div>
        </div>
    )
}

export default Overview