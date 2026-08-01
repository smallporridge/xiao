import type {Metadata,Viewport} from "next";
import "./globals.css";
const title="To Xiao｜一份为你定制的毛线手作纪念册";
const description="一份为 Xiao 定制的电子手帐：23件纺织作品、14页第二人称记录，收藏你从2024到2026认真织过的可爱。";
export const metadata:Metadata={metadataBase:new URL("https://www.zhouyujia.cn/xiao/"),title,description,applicationName:title,robots:{index:false,follow:false},openGraph:{title,description,type:"website",url:"https://www.zhouyujia.cn/xiao/",siteName:title,images:[{url:"https://www.zhouyujia.cn/xiao/og-v3.png",width:1731,height:909,alt:"送给 Xiao 的定制毛线手作纪念册"}]},twitter:{card:"summary_large_image",title,description,images:["https://www.zhouyujia.cn/xiao/og-v3.png"]}};
export const viewport:Viewport={themeColor:"#f7e7c8",colorScheme:"light"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
