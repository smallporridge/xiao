import type {Metadata,Viewport} from "next";
import "./globals.css";
const title="我的毛线搞怪手帐｜23件作品的快乐宇宙";
const description="一本从2024翻到2026的日系手作手帐：23件纺织作品、12页第一人称记录，以及朋友留在最后一页的祝福。";
export const metadata:Metadata={metadataBase:new URL("https://smallporridge.github.io/xiao/"),title,description,applicationName:title,robots:{index:false,follow:false},openGraph:{title,description,type:"website",url:"https://smallporridge.github.io/xiao/",siteName:title,images:[{url:"https://smallporridge.github.io/xiao/og-v2.png",width:1200,height:630,alt:"我的毛线搞怪手帐封面"}]},twitter:{card:"summary_large_image",title,description,images:["https://smallporridge.github.io/xiao/og-v2.png"]}};
export const viewport:Viewport={themeColor:"#f3b7c8",colorScheme:"light"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
