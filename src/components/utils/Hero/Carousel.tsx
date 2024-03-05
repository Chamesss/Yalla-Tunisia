import Slider from "react-slick";
import HeroButton from "./HeroButton";

export function ArrowNull() {
  return null;
}

interface Props {
  data: {
    image: string;
    button: string;
    link: string;
  }[];
}

export default function SimpleSlider({ data }: Props) {
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
    <div className="relative p-4">
      <Slider {...settings}>
        {data.map((img, i) => (
          <div key={i} className="h-fit overflow-hidden">
            <img
              src={img.image}
              alt={`${img.image}`}
              className="w-full max-h-[600px] object-cover rounded-sm"
            />
            <HeroButton name={img.button} link={img.link} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
