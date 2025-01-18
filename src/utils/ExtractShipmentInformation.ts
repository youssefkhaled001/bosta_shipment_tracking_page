/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This module handles the extraction and processing of shipment information from raw shipment data.
 * It converts timestamps into localized dates and organizes transit events chronologically.
 */

import { ShipmentInfo } from "../contexts/MainContext";

/**
 * Processes raw shipment data and extracts relevant information in a structured format
 * @param props Component props containing shipment data, language preference, and state setter
 */
export default function ExtractShipmentInformation({ shipment, language, setShipment }: any) {
    // Date formatting options for general dates
    const GeneralDateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        weekday: 'long'
    };

    // Format locale string based on language preference
    const locale = language === 'en' ? 'en-US' : 'ar';

     // Extract and format basic shipment information
    const TrackingNumber = shipment.TrackingNumber;
    const CreateDate = new Date(shipment.CreateDate)
        .toLocaleDateString(locale, GeneralDateOptions);
    const ScheduledDate = new Date(shipment.ScheduledDate)
        .toLocaleDateString(locale, GeneralDateOptions);
    const PromisedDate = new Date(shipment.PromisedDate)
        .toLocaleDateString(locale, GeneralDateOptions);
    const StatusCode = shipment.CurrentStatus.code;

    // Map status codes to readable status messages
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

    // Process transit events and group them by date
    const Events = shipment.TransitEvents?.reduce((acc: ShipmentInfo["Events"], event: any) => {
        // Configure date and time formatting options
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

    // Reverse Each Date events order for getting latest events first
    Events.map((event: any) => event.events?.reverse());
    // Reverse Dates order for getting latest dates first
    Events.reverse()

    // Extract important milestone dates from events
    let ShipmentDate = "";
    let PickedUpDate = "";
    let InTransitDate = "";
    let OutForDeliveryDate = "";
    let DeliveredDate = "";

    // Iterate through events to find milestone timestamps
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

    // Construct final shipment information object
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

    // Update shipment state with processed information
    setShipment(shipmentInfo)
}
