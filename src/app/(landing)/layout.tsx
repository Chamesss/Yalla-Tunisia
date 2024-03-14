import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="lg:mb-[8.75rem] md:mb-[9.375rem] mb-[6.25rem]">
        <Header />
      </div>
      {children}
      <Footer />
    </div>
  );
}
