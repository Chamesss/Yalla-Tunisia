import CardItem from "./utils/CardItem";

interface result {
  id: string;
  userId: number;
  title: string;
  description: string;
  color: string[];
  price: string;
  size: string[];
  picture: string;
}
[];

export default async function () {
  const res = await fetch("http://localhost:3000/api/handmades/");
  const data: result[] = await res.json();
  if (data)
    return (
      <div className="w-full text-start">
        <h1 className="text-xl">Browse Handmades</h1>
        <div className="flex justify-between mt-4">
          <p>Explore newest articles</p>
          <button className="px-4 py-2 bg-black/50 text-white transition-all rounded-lg hover:scale-105">
            Show more
          </button>
        </div>
        <div className="flex gap-4">
          {data.map((d) => {
            return <CardItem data={d} />;
          })}
        </div>
      </div>
    );
  throw new Error();
}
