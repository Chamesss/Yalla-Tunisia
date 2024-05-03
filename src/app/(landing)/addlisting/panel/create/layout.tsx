export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-1 p-8">{children}</div>;
}
