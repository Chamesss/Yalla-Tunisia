"use client";
import React from "react";
import {
  GoogleMap,
  StreetViewPanorama,
  StreetViewService,
} from "@react-google-maps/api";
import { placesLibrary } from "@/constants/placesLibrairie";

import { useJsApiLoader } from "@react-google-maps/api";
import { Spinner } from "@nextui-org/react";

const center = {
  lat: 36.806389,
  lng: 10.181667,
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function GoogleTilesContainer({
  business,
}: {
  business: Approvals;
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey as string,
    libraries: placesLibrary,
  });

  const show = business.tiles.length > 0 ? true : false;

  if (!isLoaded) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const onLoadStreetView = (
    streetViewService: google.maps.StreetViewService | null
  ) => {
    streetViewService &&
      streetViewService.getPanorama({
        location: {
          lat: business.lat,
          lng: business.lng,
        },
        radius: 5000,
      });
  };

  return (
    <React.Fragment>
      <StreetViewService onLoad={onLoadStreetView} />
      {business.tiles.map((p: string, i: number) => (
        <div key={i} className="flex flex-col relative">
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              width: show ? "300px" : "0px",
              height: show ? "300px" : "0px",
              position: "relative",
            }}
            zoom={14}
            center={center}
          >
            <StreetViewPanorama
              options={{
                linksControl: true,
                addressControl: true,
                clickToGo: false,
                disableDefaultUI: false,
                imageDateControl: false,
                controlSize: 0,
                fullscreenControl: false,
                disableDoubleClickZoom: false,
                pano: p,
                enableCloseButton: false,
                motionTracking: false,
                motionTrackingControl: true,
                panControl: false,
                showRoadLabels: false,
                zoomControl: false,
                visible: true,
              }}
            />
          </GoogleMap>
        </div>
      ))}
    </React.Fragment>
  );
}
