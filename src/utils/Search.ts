/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Searches for shipment information using the provided tracking number
 * @param params Search parameters including search text and state setters
 */
export default async function search({
    searchText,
    setShipment,
    setLoading,
    setError,
    setShipmentState,
    setLastSearch,
    lastSearch,
    Bosta_API_Route }: any) {

    // Return early if search text is empty or unchanged To Avoid Unnecessary API Calls   
    if (searchText.length == 0 || lastSearch == searchText) return

    // Update search state and reset previous results
    setLastSearch(searchText)
    setError(null)
    setShipment(undefined)
    setLoading(true)


    try {
        // Fetch shipment data from API
        const response = await fetch(`${Bosta_API_Route}${searchText}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-requested-by": "Bosta"
            }
        });

        // Handle error responses
        if (!response.ok) {
            setShipment(undefined);
            setError(response.status === 404 ? "NO_SHIPMENT_FOUND" : "SOMETHING_WENT_WRONG");
            setLoading(false);
            return;
        }

        // Parse and update shipment data
        const shipment = await response.json();
        setShipmentState(shipment);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // Handle any fetch or parsing errors
        setShipment(undefined);
        setError("SOMETHING_WENT_WRONG");
    } finally {
        // Ensure loading state is always reset
        setLoading(false);
    }
}