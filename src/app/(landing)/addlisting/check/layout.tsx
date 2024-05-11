import { Suspense } from "react";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<p>loading</p>}>{children}</Suspense>;
}
