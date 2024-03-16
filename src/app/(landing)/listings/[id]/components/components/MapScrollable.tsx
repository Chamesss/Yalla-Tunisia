"use client";

export default function MapScrollable() {
  const handleClick = () => {
    const section = document.getElementById("targetSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <p
      onClick={handleClick}
      className="w-full text-sm font-medium text-center mt-4 flex flex-row items-center justify-center gap-2 cursor-pointer hover:underline"
    >
      Check on map
      <svg
        className={"h-fit w-fit transform center transition-all"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        width={20}
      >
        <path
          className="translate-y-[3px]"
          fillRule="evenodd"
          d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
          clipRule="evenodd"
        />
      </svg>
    </p>
  );
}
