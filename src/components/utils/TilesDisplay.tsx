import { GoogleMap, StreetViewPanorama } from "@react-google-maps/api";
import React from "react";

const center = {
  lat: 36.806389,
  lng: 10.181667,
};

export default function TilesDisplay({ p }: { p: string }) {
  return (
    <GoogleMap
      id="circle-example"
      mapContainerStyle={{
        width: "300px",
        height: "300px",
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
  );
}
