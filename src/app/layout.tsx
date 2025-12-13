import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thilina Sandaruwan | Creative Developer",
  description: "Portfolio of Thilina Sandaruwan - Web Designer and Developer",
  icons: {
    icon: "/LOGO.png",
    apple: "/LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/LOGO.png" type="image/png" />
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
              import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
              
              function initTubes() {
                const canvas = document.getElementById('tubes-cursor-canvas');
                if (!canvas) {
                  setTimeout(initTubes, 200);
                  return;
                }
                
                TubesCursor(canvas, {
                  tubes: {
                    count: 3,
                    length: 6,
                    colors: ["#00f0ff", "#8b5cf6", "#06b6d4"],
                    lights: {
                      intensity: 15,
                      colors: ["#00f0ff", "#8b5cf6", "#06b6d4", "#00d4e6"]
                    }
                  }
                });
              }
              
              if (document.readyState === 'complete') {
                initTubes();
              } else {
                window.addEventListener('load', initTubes);
              }
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
