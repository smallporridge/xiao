import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "一针一线，织成你的小宇宙";
const description = "18 件完成作品，被重新编排成一段只属于她的纺织创作故事。";
export const metadata:Metadata = {
  metadataBase:new URL("https://smallporridge.github.io/xiao/"),
  title,description,applicationName:title,
  robots:{index:false,follow:false},
  openGraph:{title,description,type:"website",url:"https://smallporridge.github.io/xiao/",siteName:title,images:[{url:"https://smallporridge.github.io/xiao/og.png",width:1728,height:896,alt:"一针一线，织成你的小宇宙"}]},
  twitter:{card:"summary_large_image",title,description,images:["https://smallporridge.github.io/xiao/og.png"]},
};
export const viewport:Viewport={themeColor:"#292621",colorScheme:"light"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}