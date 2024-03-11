import { LocationOrderView } from "@/types";
import { toast } from "react-toastify";

// using simple fetch to get the place details
export const fetchPlaceDetails = async (lat: number, lng: number) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const coords = data.results[0].geometry.location;
    const formatedAddress = data.results[0].formatted_address;

    return { coords, formatedAddress } as LocationOrderView;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching place details");
    return null;
  }
};
