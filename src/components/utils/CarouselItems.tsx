import Slider from "react-slick";
import CardItem from "./CardItem";
import { Key } from "react";

export default function SimpleSlider({ data }: any) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1250,
    slidesToShow: 5,
    slidesToScroll: 1,
    waitForAnimate: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 7500,
  };
  return (
    <div className="relative p-4">
      <Slider {...settings}>
        {data.map((d: any, i: Key | null | undefined) => (
          <div key={i} className="h-fit">
            <CardItem data={d} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
