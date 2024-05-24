import CardSkeleton from "@/components/utils/CardSkeleton";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 0,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 0,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
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
        <div className="bg-green-400 block">
          <Slider {...settings}>
            {[...Array(5)].map((_, i) => (
              <div className="" key={i}>
                <CardSkeleton />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div>offers</div>
      )}
    </React.Fragment>
  );
}
