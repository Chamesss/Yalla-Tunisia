"use client";
import ThemeProvider from "@/providers/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
}
