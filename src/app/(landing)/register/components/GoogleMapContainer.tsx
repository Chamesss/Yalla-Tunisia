import { Spinner } from "@nextui-org/react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useEffect, useState, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  lng: number;
  lat: number;
};

const containerStyle = {
  width: "250px",
  height: "200px",
};

export default function GoogleMapContainer({ lng, lat }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const [map, setMap] = useState<any>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const center: google.maps.LatLngLiteral = {
    lat: lat,
    lng: lng,
  };

  return isLoaded ? (
    <ErrorBoundary
      fallback={
        <div className="w-[250px] h-[200px] bg-gray-100 flex justify-center items-center">
          <p className="text-center text-black">Something went wrong.</p>
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={30}
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
          setMap(map);
        }}
        onUnmount={() => setMap(null)}
      >
        <Marker position={{ lng, lat }} />
      </GoogleMap>
    </ErrorBoundary>
  ) : (
    <div className="w-[250px] h-[200px] bg-gray-100 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
