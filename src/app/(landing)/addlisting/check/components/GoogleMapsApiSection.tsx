import { Dispatch, useEffect, useState, SetStateAction } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { placesLibrary } from "@/constants/placesLibrairie";
import { Spinner } from "@nextui-org/react";
import ImagesDisplay from "./ImagesDisplay";
import Location from "@/components/icons/Location";
import TilesLoader from "./TilesLoader";

type Props = {
  lat: any;
  lng: any;
  setLat: Dispatch<any>;
  setLng: Dispatch<any>;
  coords: string[] | null | undefined;
  setCoords: Dispatch<SetStateAction<string[] | null | undefined>>;
  selectedTiles: string[];
  setSelectedTiles: Dispatch<SetStateAction<string[]>>;
  selectedImages: string[];
  setSelectedImages: Dispatch<SetStateAction<string[]>>;
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const restrictions = { country: "tn" };

export default function GoogleMapsApiSection({
  lat,
  lng,
  setLat,
  setLng,
  coords,
  setCoords,
  selectedTiles,
  setSelectedTiles,
  selectedImages,
  setSelectedImages,
}: Props) {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const [images, setImages] = useState<
    google.maps.places.PlacePhoto[] | null | undefined
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTiles, setLoadingTiles] = useState<boolean>(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey as string,
    libraries: placesLibrary,
  });

  useEffect(() => {
    lat !== null && setLoadingTiles(false);
  }, [lat]);

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  function locationSelected() {
    setLoadingTiles(true);
    if (searchResult) {
      const place = searchResult.getPlace();
      setLat(place.geometry?.location?.lat());
      setLng(place.geometry?.location?.lng());
      setImages(place.photos);
    }
  }

  if (!isLoaded) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row w-full items-center justify-center gap-2 p-2 bg-gray-100 rounded-xl">
        <Location className="opacity-50" />
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={locationSelected}
          restrictions={restrictions}
          className="w-full"
        >
          <input
            onChange={() => {
              setLoadingTiles(true);
              setLat(null);
              setLng(null);
              setCoords(null);
              setImages(null);
              setSelectedImages([]);
              setSelectedTiles([]);
            }}
            type="text"
            className="relative w-full focus:outline-none text-sm bg-gray-100"
            placeholder="Veuillez entrer le nom de votre magasin"
          />
        </Autocomplete>
      </div>
      {images && (
        <div className="overflow-hidden flex flex-row overflow-x-scroll gap-2 scrollbar-container mt-6">
          <ImagesDisplay
            images={images}
            loading={loading}
            setLoading={setLoading}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        </div>
      )}
      {images && (
        <small className="italic opacity-75">
          *Voici les images présentées de votre magasin.
        </small>
      )}

      {loadingTiles === false ? (
        <TilesLoader
          lat={lat}
          lng={lng}
          coords={coords}
          setCoords={setCoords}
          selectedTiles={selectedTiles}
          setSelectedTiles={setSelectedTiles}
        />
      ) : null}
    </div>
  );
}
