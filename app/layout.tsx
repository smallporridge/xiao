import type {Metadata,Viewport} from "next";
import "./globals.css";
const title="一针一线，织成你的小宇宙｜她的九个手账跨页";
const description="18件完成作品，左右各一件，被整理成9个可以点击、拖动和手划翻阅的手账跨页。";
export const metadata:Metadata={metadataBase:new URL("https://smallporridge.github.io/xiao/"),title,description,applicationName:title,robots:{index:false,follow:false},openGraph:{title,description,type:"website",url:"https://smallporridge.github.io/xiao/",siteName:title,images:[{url:"https://smallporridge.github.io/xiao/og.png",width:1728,height:896,alt:"一针一线，织成你的小宇宙手账书"}]},twitter:{card:"summary_large_image",title,description,images:["https://smallporridge.github.io/xiao/og.png"]}};
export const viewport:Viewport={themeColor:"#cdb494",colorScheme:"light"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}