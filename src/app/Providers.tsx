"use client";
import ThemeProvider from "@/providers/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ReduxProvider } from "@/providers/ReduxProvider";
import FirebaseAuth from "@/middlewares/AuthStatus";
import { MapProvider } from "@/providers/MapProvider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextUIProvider>
          <FirebaseAuth>
            <MapProvider>{children}</MapProvider>
          </FirebaseAuth>
        </NextUIProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
