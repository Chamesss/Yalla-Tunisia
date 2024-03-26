import MainCreateListing from "./components/MainCreateListing";

export default function page() {
  return (
    <div className="px-10 py-4">
      <MainCreateListing />
    </div>
  );
}

// useEffect(() => {
//   setIsInfoSelected((prev) => {
//     return isSectionSelected ? !prev : false;
//   });
//   console.log("info deactivated");
// }, [isSectionSelected, isInfoSelected]);
