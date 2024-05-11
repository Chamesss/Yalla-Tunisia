import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!process.env.NEXT_PUBLIC_API_URL) return null;

  return (
    <div className="flex min-h-screen flex-col dark:bg-[#212933]">
      <div className="lg:mb-[8.75rem] md:mb-[9.375rem] mb-[6.25rem]">
        <Header />
      </div>
      <div className="flex-1 justify-between flex flex-col">
        {children}
        <div className="flex">
          <Footer />
        </div>
      </div>
    </div>
  );
}
