import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "织物 / 在场 · 米开朗骑骡纺织作品展";
const description = "23 件完成纺织作品的电子展览。点开作品，看它如何被穿上、被使用、走进生活。";
export const metadata: Metadata = {
  metadataBase: new URL("https://smallporridge.github.io/xiao/"),
  title, description, applicationName: title,
  openGraph: { title, description, type: "website", url: "https://smallporridge.github.io/xiao/", siteName: title, images: [{ url: "https://smallporridge.github.io/xiao/og.png", width: 1728, height: 896, alt: "织物在场电子展览" }] },
  twitter: { card: "summary_large_image", title, description, images: ["https://smallporridge.github.io/xiao/og.png"] },
};
export const viewport: Viewport = { themeColor: "#151515", colorScheme: "light dark" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}