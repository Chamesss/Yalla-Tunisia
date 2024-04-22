import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useEffect, useState, useCallback } from "react";

type Props = {
  lng: number;
  lat: number;
};

const containerStyle = {
  width: "250px",
  height: "200px",
};

export default function GoogleMapContainer({ lng, lat }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const [map, setMap] = useState(null);

  const onLoad = (map: any) => {
    const bounds = new window.google.maps.LatLngBounds({ lng, lat });
    map.fitBounds(bounds);

    setMap(map);
  };

  const onUnmount = (map: any) => {
    setMap(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lng, lat }}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Marker component with position and custom styling */}
      <Marker position={{ lng, lat }}>
        <span className="w-[20px] h-[20px] rounded-full bg-red-500"></span>
      </Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}
