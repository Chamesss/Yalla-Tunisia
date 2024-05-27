import CardSkeleton from "@/components/utils/CardSkeleton";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardItem from "@/components/utils/CardItem";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

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
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

export default function SimilarOffers({ section }: { section: string }) {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const docFolder = section.toLowerCase();
      try {
        const res = await fetch(`/api/${docFolder}/getsimilar`, {
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
          {products && products.map((p, i) => <CardItem data={p} />)}
        </div>
      )}
    </React.Fragment>
  );
}
