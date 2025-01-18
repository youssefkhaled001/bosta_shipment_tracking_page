/**
 * This module provides the main application context for managing global state
 * including language preferences, shipment information, loading states, and errors.
 */

import { useContext, createContext, useState, ReactNode } from "react";

/**
 * Supported language codes for the application
 */
export type Language = "en" | "ar";

/**
 * Transit event information structure
 */
interface TransitEvent {
    time: string;
    state: string;
    msg: string;
    code: string;
}

/**
 * Group of events for a specific date
 */
interface EventGroup {
    date: string;
    events: TransitEvent[];
}

/**
 * Complete shipment information structure
 */
export type ShipmentInfo = {
    /** Unique tracking number for the shipment */
    TrackingNumber: string;
    /** Date when the shipment was created */
    CreateDate: string;
    /** Scheduled delivery date */
    ScheduledDate: string;
    /** Promised delivery date */
    PromisedDate: string;
    /** Current status of the shipment */
    Status: "Created" | 
            "Picked Up" | 
            "In Transit" | 
            "Out For Delivery" | 
            "Delivered" | 
            "Returned" | 
            "Rescheduled";
    /** Numeric code representing the current status */
    StatusCode: number;
    /** Chronological list of transit events grouped by date */
    Events: EventGroup[];
    /** Timestamp when shipment was created */
    ShipmentDate: string;
    /** Timestamp when shipment was picked up */
    PickedUpDate: string;
    /** Timestamp when shipment entered transit */
    InTransitDate: string;
    /** Timestamp when shipment went out for delivery */
    OutForDeliveryDate: string;
    /** Timestamp when shipment was delivered */
    DeliveredDate: string;
};

/**
 * Main context state and updater functions
 */
interface MainContextType {
    /** Current application language */
    language: Language;
    /** Function to update the application language */
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
    /** Current shipment information */
    shipment: ShipmentInfo | undefined;
    /** Function to update shipment information */
    setShipment: React.Dispatch<React.SetStateAction<ShipmentInfo | undefined>>;
    /** Loading state indicator */
    loading: boolean;
    /** Function to update loading state */
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    /** Current error message, if any */
    error: string | null;
    /** Function to update error state */
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * Create the context with undefined as initial value
 */
const MainContext = createContext<MainContextType | undefined>(undefined);

/**
 * Provider component that wraps the application and makes the context available
 */
export const MainContextProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state with default values
    const [language, setLanguage] = useState<Language>("en");
    const [shipment, setShipment] = useState<ShipmentInfo>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const contextValue: MainContextType = {
        language,
        setLanguage,
        shipment,
        setShipment,
        loading,
        setLoading,
        error,
        setError
    };

    return (
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    );
};

/**
 * Custom hook to use the main context
 * @throws {Error} If used outside of MainContextProvider
 * @returns {MainContextType} The context value
 */
export const useMainContext = (): MainContextType => {
    const context = useContext(MainContext);
    
    if (!context) {
        throw new Error(
            "useMainContext must be used within a MainContextProvider"
        );
    }
    
    return context;
};