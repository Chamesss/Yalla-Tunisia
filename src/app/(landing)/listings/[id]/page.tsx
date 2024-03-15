import { getItem } from "@/lib/getSingleItem";
import HandmadePage from "./components/HandmadePage";
import GuidePage from "./components/GuidePage";
import SportsAndEntertainmentPage from "./components/SportsAndEntertainmentPage";

export default async function page({ params }: { params: { id: string } }) {
  const res = await getItem(params.id);
  const data: ItemType = res[0];
  const flag = data.category[0].id;
  return (
    <div>
      {flag === 1 && <HandmadePage data={data} />}
      {flag === 2 && <SportsAndEntertainmentPage />}
      {flag === 3 && <GuidePage />}
    </div>
  );
}
