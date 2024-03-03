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
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <ArrowNull />,
    prevArrow: <ArrowNull />,
  };
  return (
    <Slider {...settings}>
      {data.map((img, i) => (
        <div key={i} className=" h-[700px] overflow-hidden">
          <img
            src={img.image}
            alt={`${img.image}`}
            className="w-full h-full overflow-hidden object-cover"
          />
        </div>
      ))}
    </Slider>
  );
}
