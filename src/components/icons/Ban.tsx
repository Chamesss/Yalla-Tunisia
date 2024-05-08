export default function Ban(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={48}
        d="M456 256 A200 200 0 0 1 256 456 A200 200 0 0 1 56 256 A200 200 0 0 1 456 256 z"
      />
      <path
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={48}
        d="M114.58 114.58l282.84 282.84"
      />
    </svg>
  );
}
