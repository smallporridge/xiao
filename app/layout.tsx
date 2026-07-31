import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "米开朗骑骡 · 手作档案";
const description = "一份收藏 30 件编织作品与温柔心意的个人礼物。";

export const metadata: Metadata = {
  metadataBase: new URL("https://smallporridge.github.io/xiao/"),
  title,
  description,
  applicationName: title,
  authors: [{ name: "一个把她的作品放在心上的朋友" }],
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://smallporridge.github.io/xiao/",
    siteName: title,
    images: [{ url: "https://smallporridge.github.io/xiao/og.png", width: 1728, height: 896, alt: "把时间，织成温柔。米开朗骑骡手作档案" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://smallporridge.github.io/xiao/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#681d3b",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
