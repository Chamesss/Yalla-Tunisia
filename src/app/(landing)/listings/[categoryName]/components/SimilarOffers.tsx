import CardSkeleton from "@/components/utils/CardSkeleton";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
};

export default function SimilarOffers({ section }: { section: string }) {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     (async () => {
  //       const docFolder = section.toLowerCase();
  //       try {
  //         const res = await fetch(`/api/${docFolder}/getsimilar`, {
  //           headers: {
  //             docName: section,
  //           },
  //           cache: "no-cache",
  //         });
  //         const similarOffers = (await res.json()) as Product[];
  //         setProducts(similarOffers);
  //         setLoading(false);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     })();
  //   }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="w-full">
          <Slider {...settings}>
            {[...Array(5)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </Slider>
        </div>
      ) : (
        <div>offers</div>
      )}
    </React.Fragment>
  );
}
