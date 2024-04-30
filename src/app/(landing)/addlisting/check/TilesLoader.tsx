import { Button } from "@nextui-org/react";
import {
  Autocomplete,
  GoogleMap,
  StreetViewPanorama,
  StreetViewService,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

type Props = {
  lat: any;
  lng: any;
};

const center = {
  lat: 36.806389,
  lng: 10.181667,
};

export default function TilesLoader({ lat, lng }: Props) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<null | string[]>();

  const onLoadStreetView = (
    streetViewService: google.maps.StreetViewService | null
  ) => {
    console.log("mounted");
    streetViewService &&
      streetViewService.getPanorama(
        {
          location: {
            lat: lat,
            lng: lng,
          },
          radius: 5000,
        },
        (data, status) => {
          if (status === "OK") {
            setShow(true);

            let coords: string[] = [];

            //@ts-ignore
            if (data.LG) {
              //@ts-ignore
              const temp: any = data.LG;
              for (const key in temp) {
                coords.push(key);
              }
            } else {
              if (data?.links) {
                for (const key in data?.links) {
                  if (data?.links[key].pano !== null)
                    coords.push(data?.links[key].pano as string);
                }
              }
            }

            setCoords(coords);
          }
          if (status === "ZERO_RESULTS") {
            setCoords(null);
            setShow(false);
          }
        }
      );
  };

  if (lat === null || typeof lat === "undefined") {
    return void 0;
  }

  return (
    <div className="flex flex-row overflow-auto overflow-x-scroll gap-2 mt-10 scrollbar-container">
      <StreetViewService onLoad={onLoadStreetView} />
      {coords &&
        coords.map((p: string, i: number) => (
          <div key={i} className="flex flex-col">
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
              <div className="absolute z-50 right-2 top-2">
                <Button className="bg-primary-500 text-white" size="sm">
                  Select this Tile !
                </Button>
              </div>
            </GoogleMap>
          </div>
        ))}
      {show === false && <p>no tiles found</p>}
    </div>
  );
}
