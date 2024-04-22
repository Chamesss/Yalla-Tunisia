import { MapProvider } from "@/providers/MapProvider";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MapProvider>{children}</MapProvider>;
}
