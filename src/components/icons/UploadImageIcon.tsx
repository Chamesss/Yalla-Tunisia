export default function UploadImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M1 16h52v40H1z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M10 14V8h53v40h-8M1 46l14-14 14 16 10-6 14 12"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M45 29 A5 5 0 0 1 40 34 A5 5 0 0 1 35 29 A5 5 0 0 1 45 29 z"
      />
    </svg>
  );
}
