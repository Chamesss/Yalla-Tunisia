import CardSkeleton from "@/components/utils/CardSkeleton";
import React, { useEffect, useState } from "react";
import CardItem from "@/components/utils/CardItem";

export default function SimilarOffers({ section }: { section: string }) {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/products/getsimilar`, {
          headers: {
            docName: section,
          },
          cache: "no-cache",
        });
        const similarOffers = (await res.json()) as Product[];
        setProducts(similarOffers);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-auto h-fit gap-2 py-4 overflow-visible">
          {[...Array(10)].map((_, i) => (
            <div className="py-4 mx-1" key={i}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-auto h-fit gap-2 py-4 overflow-visible">
          {products &&
            products.map((p, i) => (
              <React.Fragment key={i}>
                <CardItem data={p} />
              </React.Fragment>
            ))}
        </div>
      )}
    </React.Fragment>
  );
}
