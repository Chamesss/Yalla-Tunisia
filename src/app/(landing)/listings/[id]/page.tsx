import { getItem } from "@/lib/getSingleItem";

export default async function page({ params }: { params: { id: string } }) {
  const data = await getItem(params.id);
  return <div>Listing page with id === {data[0].title}</div>;
}
