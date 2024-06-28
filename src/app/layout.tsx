import { Metadata } from "next";
import { NextLayout, NextProvider } from "./providers";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Restaurant Map",
  description: "Next.js를 이용한 맛집 지도 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
