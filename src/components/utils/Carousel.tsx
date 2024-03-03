import Image from "next/image";
import Slider from "react-slick";

export function ArrowNull() {
  return null;
}

export default function SimpleSlider({ data }: { data: { image: string }[] }) {
  let settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 7500,
    nextArrow: <ArrowNull />,
    prevArrow: <ArrowNull />,
  };
  return (
    <Slider {...settings}>
      {data.map((img, i) => (
        <div key={i} className="h-fit overflow-hidden">
          <img
            src={img.image}
            alt={`${img.image}`}
            className="w-full max-h-[600px] object-cover"
          />
        </div>
      ))}
    </Slider>
  );
}
