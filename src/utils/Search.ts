/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function search({searchText, setShipment, setLoading, setError, setShipmentState, setLastSearch, lastSearch, Bosta_API_Route}:any) {
    if (searchText.length == 0 || lastSearch == searchText) return
    setLastSearch(searchText)
    setError(null)
    setShipment(undefined)
    setLoading(true)
    const response = await fetch(`${Bosta_API_Route}${searchText}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-requested-by": "Bosta"
        }
    })
    if (!response.ok) {
        setShipment(undefined)
        if (response.status == 404)
            setError("NO_SHIPMENT_FOUND")
        else
            setError("SOMETHING_WENT_WRONG")
        setLoading(false)
        return;
    }
    const shipment = await response.json()
    setShipmentState(shipment)

    setLoading(false)
}