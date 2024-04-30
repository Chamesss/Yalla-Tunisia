"use client";
import ThemeProvider from "@/providers/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";
// import { ReduxProvider } from "@/providers/ReduxProvider";
import FirebaseAuth from "@/middlewares/AuthStatus";
import dynamic from "next/dynamic";
const ReduxProviders = dynamic(() => import("@/providers/ReduxProvider"), {
  ssr: false,
});

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProviders>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextUIProvider>
          <FirebaseAuth>{children}</FirebaseAuth>
        </NextUIProvider>
      </ThemeProvider>
    </ReduxProviders>
  );
}
