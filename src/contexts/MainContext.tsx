import { useContext, createContext, useState, ReactNode } from "react";

export type Language = "en" | "ar";
export type ShipmentInfo =
  {
    TrackingNumber: string;
    CreateDate: string;
    ScheduledDate: string
    PromisedDate: string;
    Status: "Created" | "Picked Up" | "In Transit" | "Out For Delivery" | "Delivered" | "Returned" | "Rescheduled";
    StatusCode: number;
    Events: { date: string, events: { time: string, state: string, msg: string, code: string }[] }[];
    ShipmentDate: string;
    PickedUpDate: string;
    InTransitDate: string;
    OutForDeliveryDate: string;
    DeliveredDate: string;
  }

interface MainContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  shipment: ShipmentInfo | undefined;
  setShipment: React.Dispatch<React.SetStateAction<ShipmentInfo | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [shipment, setShipment] = useState<ShipmentInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return <MainContext.Provider value={{ language, setLanguage, shipment, setShipment, loading, setLoading, error, setError }}>
    {children}
  </MainContext.Provider>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};
