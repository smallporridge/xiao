import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "米开朗骑骡 · 手作冒险日志";
const description = "ENFP 快乐小狗型手作玩家的二次元手账风作品图鉴，收录 30 件编织作品。";

export const metadata: Metadata = {
  metadataBase: new URL("https://smallporridge.github.io/xiao/"),
  title,
  description,
  applicationName: title,
  authors: [{ name: "一位负责整理图鉴的男性好友" }],
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://smallporridge.github.io/xiao/",
    siteName: title,
    images: [{ url: "https://smallporridge.github.io/xiao/og.png", width: 1728, height: 896, alt: "手作冒险日志：米开朗骑骡作品图鉴" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://smallporridge.github.io/xiao/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#6678ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
