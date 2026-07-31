import type { Metadata, Viewport } from "next";
import "./globals.css";
const title="一针一线，织成你的小宇宙｜一本送给她的手作书";
const description="18 件完成作品，被编排成一本可以翻阅的二次元手账，记录她一路织来的小宇宙。";
export const metadata:Metadata={metadataBase:new URL("https://smallporridge.github.io/xiao/"),title,description,applicationName:title,robots:{index:false,follow:false},openGraph:{title,description,type:"website",url:"https://smallporridge.github.io/xiao/",siteName:title,images:[{url:"https://smallporridge.github.io/xiao/og.png",width:1728,height:896,alt:"一针一线，织成你的小宇宙手作书"}]},twitter:{card:"summary_large_image",title,description,images:["https://smallporridge.github.io/xiao/og.png"]}};
export const viewport:Viewport={themeColor:"#d2b89a",colorScheme:"light"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}