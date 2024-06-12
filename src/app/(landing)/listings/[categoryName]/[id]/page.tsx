import getSingleItem from "@/lib/getSingleItem";
import HandmadePage from "./../components/HandmadePage";
import GuidePage from "./../components/GuidePage";
import SportsAndEntertainmentPage from "./../components/SportsAndEntertainmentPage";

export default async function page({
  params,
}: {
  params: { id: string; categoryName: string };
}) {
  if (!process.env.NEXT_PUBLIC_API_URL) return null;
  const { categoryName, id } = params;
  const res = await getSingleItem(categoryName, id);
  return (
    <div>
      {categoryName === "Handmades" && (
        <HandmadePage res={res} categoryName={categoryName} />
      )}
      {categoryName === "Sports" && (
        <SportsAndEntertainmentPage res={res} categoryName={categoryName} />
      )}
      {categoryName === "Guides" && (
        <GuidePage res={res} categoryName={categoryName} />
      )}
    </div>
  );
}
