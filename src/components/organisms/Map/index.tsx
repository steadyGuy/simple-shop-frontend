/* eslint-disable @typescript-eslint/no-explicit-any */
import SimpleButton from "@/components/molecules/SimpleButton";
import { fetchPlaceDetails } from "@/queries/maps.query";
import { IAddress, IShop, LocationOrderView } from "@/types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type MapProps = {
  shopsLocations: IShop[];
  clientLocation: LocationOrderView | null;
  setClientLocation: Dispatch<SetStateAction<LocationOrderView | null>>;
};

const Map = ({
  shopsLocations,
  setClientLocation,
  clientLocation,
}: MapProps) => {
  const firstShopLocation = shopsLocations[0].address as IAddress;
  const { isLoaded } = useJsApiLoader({
    id: import.meta.env.VITE_GOOGLE_MAPS_ID,
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isBuildingRoutes, setIsBuildingRoutes] = useState(false);
  const [routesHasBuilt, setRoutesHasBuilt] = useState(false);
  const [calculatedTimeStrs, setCalculatedTimeStrs] = useState<string[]>([]);

  // Function to fetch PlaceResult details using Google Places API

  const handleMapClick = useCallback(
    async (event: any) => {
      const data = await fetchPlaceDetails(
        event.latLng.lat(),
        event.latLng.lng()
      );

      setClientLocation(data);

      if (map && data) {
        map.setCenter(data?.coords);
      }
    },
    [map, setClientLocation]
  );

  const onMapLoad = (googleMap: google.maps.Map) => {
    setMap(googleMap);
    googleMap.addListener("click", handleMapClick);
  };

  const handleBuildRoutes = () => {
    if (isLoaded && map && clientLocation) {
      setIsBuildingRoutes(true);
      // Add click event listener to the map
      const directionsService = new google.maps.DirectionsService(); // DirectionsService object

      const calculatedTimeOfRoutes: string[] = [];
      shopsLocations.forEach((shop, i) => {
        const request = {
          origin: new google.maps.LatLng(clientLocation.coords), // Origin coordinates (client location)
          destination: new google.maps.LatLng(
            Number(shop.address?.longitude),
            Number(shop.address?.latitude)
          ), // Destination coordinates (shop location)
          travelMode: google.maps.TravelMode.DRIVING, // Adjust travel mode as needed (driving, bicycling, transit, etc.)
        };

        directionsService.route(request, (response, status) => {
          if (status === "OK" && response) {
            const directionsRenderer = new google.maps.DirectionsRenderer({
              map,
            });
            directionsRenderer.setDirections(response); // Store directions object
            if (response.routes[0]?.legs?.[0]?.duration) {
              calculatedTimeOfRoutes.push(
                `${shop.title}: ${response.routes[0].legs[0].duration.text}`
              );
            }
            if (i === shopsLocations.length - 1) {
              setIsBuildingRoutes(false);
              setRoutesHasBuilt(true);
              setCalculatedTimeStrs(calculatedTimeOfRoutes);
            }
          } else {
            alert(`Directions request failed: ${status}`);
          }
        });
      });
    }
  };

  return (
    <div className="map mb-8">
      <div className="map__inner">
        {isLoaded ? (
          <GoogleMap
            id="map"
            onLoad={onMapLoad}
            center={
              clientLocation?.coords
                ? clientLocation.coords
                : {
                    lat: Number(firstShopLocation.latitude),
                    lng: Number(firstShopLocation.longitude),
                  }
            }
            zoom={12}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
          >
            {shopsLocations.map(({ address, title }, i) => (
              <Marker
                position={{
                  // coords differ from faker.js
                  lat: Number(address?.latitude),
                  lng: Number(address?.longitude),
                }}
                key={i}
                label={title.slice(0, 1)}
                title={title}
                // icon="https://trinityrental.com/images/marker-contacts.svg"
              />
            ))}
            {clientLocation && (
              <Marker
                position={clientLocation.coords}
                title={clientLocation.formatedAddress}
                label="Your location"
              />
            )}
          </GoogleMap>
        ) : null}
      </div>
      {clientLocation && !routesHasBuilt && (
        <>
          <SimpleButton
            disabled={isBuildingRoutes}
            className="mt-4"
            title="Build routes to shops"
            onClick={handleBuildRoutes}
          />
        </>
      )}
      <span className="mt-4 block">
        <b>WARNING:</b> The coordinates for shops was generated randomly, so in
        some cases the route may not be built correctly or not built at all.
      </span>
      {routesHasBuilt && calculatedTimeStrs.length > 0 && (
        <ul className="mt-6">
          {calculatedTimeStrs.map((time, i) => (
            <li key={i}>
              <b>{time}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Map;
