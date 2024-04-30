import React, { useRef, useEffect } from "react";

function getCustomPanoramaTileUrl(
  pano: string,
  zoom: number,
  tileX: number,
  tileY: number
): string {
  return (
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/" +
    "panoReception1024-" +
    zoom +
    "-" +
    tileX +
    "-" +
    tileY +
    ".jpg"
  );
}

function getCustomPanorama(pano: string): google.maps.StreetViewPanoramaData {
  if (pano === "reception") {
    return {
      location: {
        pano: "reception",
        description: "Google Sydney - Reception",
      },
      links: [],
      // The text for the copyright control.
      copyright: "Imagery (c) 2010 Google",
      // The definition of the tiles for this panorama.
      tiles: {
        tileSize: new google.maps.Size(1024, 512),
        worldSize: new google.maps.Size(2048, 1024),
        // The heading in degrees at the origin of the panorama
        // tile set.
        centerHeading: 105,
        getTileUrl: getCustomPanoramaTileUrl,
      },
    };
  }
  // @ts-ignore TODO fix typings
  return null;
}

const CustomPanorama = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("map") as HTMLElement,
        { pano: "reception", visible: true }
      );

      panorama.registerPanoProvider(getCustomPanorama);
    }
  }, []);

  return (
    <div
      id="map"
      ref={mapContainerRef}
      style={{ width: "600px", height: "400px" }}
    />
  );
};

export default CustomPanorama;
