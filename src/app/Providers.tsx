"use client";
import ThemeProvider from "@/providers/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";
// import { ReduxProvider } from "@/providers/ReduxProvider";
import FirebaseAuth from "@/middlewares/AuthStatus";
import AuthStateProvider from "@/providers/AuthStateProvider";
// import { FirebaseAuthProvider } from "@/providers/AuthStateProvider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextUIProvider>
        <FirebaseAuth>
          <AuthStateProvider>{children}</AuthStateProvider>
        </FirebaseAuth>
      </NextUIProvider>
    </ThemeProvider>
  );
}
