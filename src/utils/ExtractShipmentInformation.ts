/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShipmentInfo } from "../contexts/MainContext";
export default function ExtractShipmentInformation({ shipment, language, setShipment }: any) {
    const GeneralDateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', weekday: 'long' };
    const TrackingNumber = shipment.TrackingNumber
    const CreateDate = new Date(shipment.CreateDate).toLocaleDateString(language == 'en' ? 'en-US' : 'ar', GeneralDateOptions)
    const ScheduledDate = new Date(shipment.ScheduledDate).toLocaleDateString(language == 'en' ? 'en-US' : 'ar', GeneralDateOptions)
    const PromisedDate = new Date(shipment.PromisedDate).toLocaleDateString(language == 'en' ? 'en-US' : 'ar', GeneralDateOptions)
    const StatusCode = shipment.CurrentStatus.code
    let Status: "Created" | "Picked Up" | "In Transit" | "Out For Delivery" | "Delivered" | "Returned" | "Rescheduled";
    switch (StatusCode) {
        case 45:
            Status = "Delivered"
            break;
        case 46:
            Status = "Returned"
            break;
        case 41:
            Status = "Out For Delivery"
            break;
        case 20:
            Status = "In Transit"
            break;
        case 24:
            Status = "Picked Up"
            break;
        case 47:
            Status = "Rescheduled"
            break;
        default:
            Status = "Created"
            break
    }
    const Events = shipment.TransitEvents?.reduce((acc: ShipmentInfo["Events"], event: any) => {
        // Extract date and time
        const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'long' };
        const eventDate = new Date(event.timestamp).toLocaleDateString(language == 'en' ? 'en-US' : 'ar', dateOptions);
        const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const eventTime = new Date(event.timestamp).toLocaleTimeString(language == 'en' ? 'en-US' : 'ar', timeOptions);

        // Find or create the date group
        let dateGroup = acc.find((group) => group.date === eventDate);
        if (!dateGroup) {
            dateGroup = { date: eventDate, events: [] };
            acc.push(dateGroup);
        }

        // Push the event details into the date group
        dateGroup.events.push({
            state: event.state,
            time: eventTime,
            code: event.code,
            msg: event.msg || ""
        });

        return acc;
    }, []) ?? []
    Events.map((event: any) => event.events?.reverse());
    Events.reverse()
    let ShipmentDate = "";
    let PickedUpDate = "";
    let InTransitDate = "";
    let OutForDeliveryDate = "";
    let DeliveredDate = "";

    Events.forEach((DateEvents: { date: string; events: any[] }) => {
        DateEvents.events.forEach((event) => {
            if (event.code === 24) {
                PickedUpDate = `${DateEvents.date} ${event.time}`;
            } else if (event.code === 20) {
                InTransitDate = `${DateEvents.date} ${event.time}`;
            } else if (event.code === 41) {
                OutForDeliveryDate = `${DateEvents.date} ${event.time}`;
            } else if (event.code === 45) {
                DeliveredDate = `${DateEvents.date} ${event.time}`;
            } else if (event.code === 10) {
                ShipmentDate = `${DateEvents.date} ${event.time}`;
            }
        });
    });

    const shipmentInfo: ShipmentInfo = {
        TrackingNumber,
        CreateDate,
        ScheduledDate,
        PromisedDate,
        StatusCode,
        Status,
        Events,
        ShipmentDate,
        PickedUpDate,
        InTransitDate,
        OutForDeliveryDate,
        DeliveredDate,
    };
    setShipment(shipmentInfo)
}