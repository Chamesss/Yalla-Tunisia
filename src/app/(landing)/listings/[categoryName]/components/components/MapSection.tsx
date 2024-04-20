import { GoogleMapsEmbed } from "@next/third-parties/google";

type Props = {
  lng: number;
  lat: number;
};

export default function MapSection({ lat, lng }: Props) {
  return (
    <div>
      <p className="text-center text-xl font-semibold mb-4">Map Section</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102239.5940821475!2d10.06087639466764!3d36.79485453010143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis!5e0!3m2!1sen!2stn!4v1710599118383!5m2!1sen!2stn"
        width="600"
        height="450"
        style={{ border: "0" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      ></iframe>
    </div>
  );
}
