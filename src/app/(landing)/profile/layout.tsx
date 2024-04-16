export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1800px] items-stretch w-full py-4 px-16">
        {children}
      </div>
    </div>
  );
}
