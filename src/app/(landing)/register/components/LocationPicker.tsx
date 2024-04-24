// import { Input } from "@nextui-org/react";
// import { useRef, useEffect, Ref, RefObject } from "react";
// export default function LocationPicker() {
//   const autoCompleteRef = useRef();
//   const inputRef = useRef<HTMLInputElement>();
//   const options = {
//     componentRestrictions: { country: "ng" },
//     fields: ["address_components", "geometry", "icon", "name"],
//     types: ["establishment"],
//   };
//   useEffect(() => {
//     if (inputRef.current) {
//       autoCompleteRef.current = new window.google.maps.places.Autocomplete(
//         inputRef.current,
//         options
//       );
//     }
//   }, []);
//   return (
//     <div>
//       <label>enter address :</label>
//       <Input ref={inputRef as Ref<HTMLInputElement>} />
//     </div>
//   );
// }
