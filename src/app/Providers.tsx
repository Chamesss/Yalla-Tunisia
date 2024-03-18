"use client";
import ThemeProvider from "@/providers/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ReduxProvider } from "@/providers/ReduxProvider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
