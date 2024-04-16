export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1800px] items-stretch w-full p-4">{children}</div>
    </div>
  );
}
