import Success from "@/components/icons/Success";
import { Button } from "@nextui-org/react";
import {
  Autocomplete,
  GoogleMap,
  StreetViewPanorama,
  StreetViewService,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  lat: any;
  lng: any;
  coords: string[] | null | undefined;
  setCoords: Dispatch<SetStateAction<string[] | null | undefined>>;
  selectedTiles: string[];
  setSelectedTiles: Dispatch<SetStateAction<string[]>>;
};

const center = {
  lat: 36.806389,
  lng: 10.181667,
};

export default function TilesLoader({
  lat,
  lng,
  coords,
  setCoords,
  selectedTiles,
  setSelectedTiles,
}: Props) {
  const [show, setShow] = useState<boolean | null>(null);

  const handleSelectTile = (p: string) => {
    const index = selectedTiles.findIndex((s) => s === p);
    if (index === -1) {
      setSelectedTiles((prev) => [...prev, p]);
    } else {
      setSelectedTiles((prev) => prev.filter((s) => s !== p));
    }
  };

  const onLoadStreetView = (
    streetViewService: google.maps.StreetViewService | null
  ) => {
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
    <>
      <div className="flex flex-row overflow-auto overflow-x-auto gap-2 mt-10 scrollbar-container">
        <StreetViewService onLoad={onLoadStreetView} />
        {coords &&
          coords.map((p: string, i: number) => (
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
                <div className="absolute z-10 top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Button
                    onClick={() => handleSelectTile(p)}
                    className={`bg-blue-500 text-white transition-all ${
                      selectedTiles.includes(p) && "bg-green-500"
                    }`}
                    size="sm"
                  >
                    {selectedTiles.includes(p)
                      ? "Selected"
                      : "Sélectionner cette tuile"}
                  </Button>
                </div>
              </GoogleMap>
              {selectedTiles.includes(p) && (
                <div className="absolute top-5 right-5 z-20">
                  <Success className="text-green-500" width={35} height={35} />
                </div>
              )}
            </div>
          ))}
      </div>
      {coords && coords.length === 0 && (
        <small className="italic opacity-75">Aucune tuile trouvée.</small>
      )}
    </>
  );
}
