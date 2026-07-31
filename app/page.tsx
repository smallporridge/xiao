"use client";
import {useEffect,useRef,useState} from "react";

type Entry={id:number;title:string;date:string;kind:string;image:string;caption:string;sticker?:string};
type JournalPage={eyebrow:string;title:string;aside:string;layout:"hero"|"duo"|"cascade"|"postcard";items:Entry[];kind?:"works"|"recap"|"letter"};
type Spread={year:string;color:string;left:JournalPage;right:JournalPage};

const work=(id:number,title:string,date:string,kind:string,caption:string,sticker?:string):Entry=>({id,title,date,kind,image:`./works/${String(id).padStart(2,"0")}.webp`,caption,sticker});

const spreads:Spread[]=[
{year:"2024 · 起针！",color:"#f7a9bd",left:{eyebrow:"はじめまして · 01",title:"最开始，我先织点能穿的",aside:"新手村也要有主角气场。",layout:"duo",items:[work(30,"三国万里子帽子","2024","帽子","先从一顶酒红帽子开始！软乎乎的，戴上就是今日主角。","START!"),work(29,"横田古着背心","2024","背心","条纹多一点，快乐也多一点。线头先别催，我还在收尾啦！","别催～")]},right:{eyebrow:"MAY 2024 · 02",title:"再来一件！这次撒点彩糖",aside:"五月的快乐，被我织成一件毛茸茸的背心。",layout:"hero",items:[work(28,"芭贝毛线背心","2024.05.11","背心","彩点毛线像把糖撒进云里。配色不需要很讲道理，我开心就很合理。","NEW!")] }},
{year:"2024 · 越织越有主见",color:"#9fc8ee",left:{eyebrow:"弯弯曲曲 · 03",title:"围巾为什么一定要走直线？",aside:"我偏要让它拐来拐去。",layout:"postcard",items:[work(27,"Zig Zag Scarf","2024","围巾","粉色负责温柔，锯齿负责捣蛋。乖巧和搞怪，我两个都要。","ZIG! ZAG!")]},right:{eyebrow:"山脉连续剧 · 04",title:"同一个名字，两种天气",aside:"一件像薄荷晴天，一件像淡蓝色的云。",layout:"cascade",items:[work(26,"白色山脉背心","2024","背心","淡蓝色轻得像一小片天空。棒针先放旁边，我要欣赏一下进度。","天空色"),work(24,"白色山脉","2024","背心","再走一遍山脉，这次把薄荷绿、粉色和阳光一起织进去。","TA-DA!")] }},
{year:"2024 → 2025 · 基础也不普通",color:"#f4cf65",left:{eyebrow:"基本功修行 · 05",title:"写着基础款，配色可不基础",aside:"我的袜子甚至要去树上晒太阳。",layout:"duo",items:[work(22,"平平针基础款袜子","2024","袜子","一双要实用，一双也要像刚完成冒险的装备。基础针法也能很热闹。","LEVEL UP"),work(21,"Close to You","2024","披肩","浅浅的、软软的，挂在枝头也像一封信。今天走温柔路线。","soft...")]},right:{eyebrow:"阳光收藏 · 06",title:"给冬天做一块咖啡色小甜点",aside:"一条围巾，加一枚金色小胸针，完成。",layout:"hero",items:[work(19,"三角小围巾","2025","围巾","咖啡色被阳光一晒，突然有点复古。我把小胸针别好：嗯，很会搭。","好看！")] }},
{year:"2025 · 大工程进行中",color:"#a9c49d",left:{eyebrow:"耐心值 +100 · 07",title:"华夫格：密密麻麻，但会上瘾",aside:"灰色不是无聊，是把细节都藏近一点。",layout:"hero",items:[work(18,"华夫套衫","2025","套衫","一格一格往前织，回过神已经变成一整件。袖子再长，也拦不住我收尾。","完成啦")]},right:{eyebrow:"过程也要贴进来 · 08",title:"我不只收藏完工照",aside:"线团、棒针和半成品，都是故事的一部分。",layout:"cascade",items:[work(17,"伊莉斯小围巾","2025","围巾","伊莉斯还在棒针上长大。别急，我和线团都在认真赶路。","ing..."),work(15,"Lace Scarf","2025","围巾","完工以后给它找了一片花当背景。今天请叫我春日摄影师。","春日限定")] }},
{year:"2025 · 作品也要有小舞台",color:"#c5b5e7",left:{eyebrow:"配色实验室 · 09",title:"反差这么大，居然很合拍",aside:"我的脑洞经常先跑，针脚在后面追。",layout:"duo",items:[work(14,"安仁披肩","2025","披肩","绿蓝毛线配红边康乃馨，谁规定它们不能坐一桌？我觉得很可以。","大胆配！"),work(12,"云蛟披肩","2025","披肩","焦糖橘接上深咖，柔软里立刻有了气势。云蛟，登场！","召唤成功")]},right:{eyebrow:"认真画重点 · 10",title:"不是随便织，我有路线图的！",aside:"会做以后，还想把它为什么好看讲清楚。",layout:"postcard",items:[work(11,"踏脚石披肩","2025","披肩","我把轮廓和花样都标出来。走过这一排踏脚石，披肩就会慢慢展开。","CHECK!")] }},
{year:"2025 · 花纹开始会说话",color:"#f0a7b3",left:{eyebrow:"酷一点的花 · 11",title:"深灰负责稳住，玫红负责跳出来",aside:"繁花也可以开得很酷。",layout:"hero",items:[work(10,"繁花披肩","2025","披肩","一朵、两朵、好多朵。暗色里冒出来的小火花，被我全部留住。","BLOOM!")]},right:{eyebrow:"小剧场开演 · 12",title:"作品旁边必须坐一位小助理",aside:"表情管理失败没关系，可爱就能上岗。",layout:"duo",items:[work(9,"小繁花披肩","2025","披肩","红黑披肩、同色线团，再安排一位表情很有戏的小助理。开拍！","本日导演"),work(8,"钻石帽子","2025","帽子","钻石纹加荧光黄，低调是不可能低调的。今天我要亮到自己！","ENFP!")] }},
{year:"2026 · 喜欢都住进来了",color:"#f6c66e",left:{eyebrow:"毛茸茸警报 · 13",title:"先承认：还没完全。再宣布：粉色赢了",aside:"完成度可以等等，快乐要先贴上来。",layout:"cascade",items:[work(6,"不完全柏林围巾","2026","围巾","这团粉色毛茸茸得太犯规。就算名字叫“不完全”，也已经很会抢镜。","先赢一半"),work(5,"Sophie’s Cardigan","2026","开衫","开衫负责沉稳灰，小挂件负责可爱。成熟和幼稚，我当然都要。","都要！")]},right:{eyebrow:"无用可爱研究所 · 14",title:"小东西，也值得认真搞怪",aside:"普通的一天需要一点没必要但很开心的细节。",layout:"postcard",items:[work(4,"杯垫","2026","生活小物","杯垫上再织一只红色小包，属于“在小东西上认真做无用可爱”。","很有必要")] }},
{year:"2026 · 我的喜欢终于碰面",color:"#93c8bd",left:{eyebrow:"手帐 × 毛线 · 15",title:"手帐也要有毛线做的家",aside:"纸笔、按钮和毛线，今天正式成为室友。",layout:"hero",items:[work(3,"手帐收纳袋","2026","收纳袋","深蓝和橙色绕在一起，再装上三颗不一样的按钮。对呀，我故意的。","住进来吧")]},right:{eyebrow:"最新一页 · 16",title:"小繁花，先借小鸭戴一下",aside:"合不合适不重要，可爱就对了。",layout:"hero",items:[work(2,"小繁花三角巾","2026","三角巾","我没有把它规规矩矩铺平，因为作品一戴到角色身上，马上就有表情了。","かわいい!")] }},
{year:"未完待续 · 17",color:"#f4aec4",left:{eyebrow:"TO BE CONTINUED",title:"原来，我已经织了这么远",aside:"23件作品，不是清单，是我一点点变厉害、也一直没弄丢可爱的证据。",layout:"duo",kind:"recap",items:[]},right:{eyebrow:"这一页，由朋友来写",title:"给未来还会继续织东西的你",aside:"",layout:"hero",kind:"letter",items:[]}}
];

const mobilePages=spreads.flatMap((spread,spreadIndex)=>([
{page:spread.left,side:"left" as const,spreadIndex,year:spread.year,color:spread.color},
{page:spread.right,side:"right" as const,spreadIndex,year:spread.year,color:spread.color}
]));

function WorkCard({item,index}:{item:Entry;index:number}){
return <article className={`work-card card-${index}`}>
<span className="tape" aria-hidden="true"/><div className="photo"><img src={item.image} alt={item.title}/></div>
<div className="work-meta"><span>{item.date}</span><span>{item.kind}</span></div><h3>{item.title}</h3><p>{item.caption}</p>
{item.sticker&&<b className="word-sticker">{item.sticker}</b>}</article>;
}

function JournalPageView({page,side,index,year,color}:{page:JournalPage;side:"left"|"right";index:number;year:string;color:string}){
if(page.kind==="recap")return <section className="journal-page recap-page side-left"><div className="page-no">{String(index*2+1).padStart(2,"0")}</div><div className="year-tab" style={{background:color}}>{year}</div><p className="eyebrow">{page.eyebrow}</p><h2>{page.title}</h2><p className="page-aside">{page.aside}</p><div className="stamp-cloud" aria-hidden="true">{[30,22,15,8,5,2].map((id,i)=><span key={id} style={{transform:`rotate(${[-7,5,-3,8,-5,4][i]}deg)`}}><img src={`./works/${String(id).padStart(2,"0")}.webp`} alt=""/></span>)}</div><div className="recap-copy"><b>我的毛线宇宙配方</b><p>一点大胆配色　＋　一点二次元脑洞<br/>＋　很多很多耐心　＋　永远不嫌多的可爱</p></div></section>;
if(page.kind==="letter")return <section className="journal-page letter-page side-right"><div className="page-no">{String(index*2+2).padStart(2,"0")}</div><div className="year-tab" style={{background:color}}>FOR YOU ♡</div><p className="eyebrow">{page.eyebrow}</p><h2>{page.title}</h2><div className="letter-paper"><span>给你：</span><p>愿你以后还会遇到很多喜欢的线，也一直有突然冒出来的好点子。</p><p>想拆就拆，想重来就重来；慢一点没关系，做得开心最重要。</p><p>也愿你一直保留这种本事——把普通的日子，认真变得可爱一点。</p><p>下一件作品完成时，记得回来给这本手帐加一页。</p><b>—— 一个一直认真围观你作品的朋友</b></div><div className="letter-doodle" aria-hidden="true">🐾　✦　♡　毛线万岁！</div></section>;
return <section className={`journal-page side-${side} page-layout-${page.layout}`}><div className="page-no">{String(index*2+(side==="right"?2:1)).padStart(2,"0")}</div><div className="year-tab" style={{background:color}}>{year}</div><p className="eyebrow">{page.eyebrow}</p><h2>{page.title}</h2><p className="page-aside">{page.aside}</p><div className="work-layout">{page.items.map((item,i)=><WorkCard key={item.id} item={item} index={i}/>)}</div><span className="page-doodle" aria-hidden="true">{side==="left"?"♡₊˚ えらい！":"✦ できた！ ˚₊"}</span></section>;
}

function SpreadView({spread,index,className,style}:{spread:Spread;index:number;className?:string;style?:React.CSSProperties}){
return <article className={`open-spread ${className??""}`} style={style}><JournalPageView page={spread.left} side="left" index={index} year={spread.year} color={spread.color}/><JournalPageView page={spread.right} side="right" index={index} year={spread.year} color={spread.color}/></article>;
}

function MobilePageView({pageIndex,className}:{pageIndex:number;className?:string}){
const item=mobilePages[pageIndex];
return <article className={`mobile-page-stack ${className??""}`}><JournalPageView page={item.page} side={item.side} index={item.spreadIndex} year={item.year} color={item.color}/></article>;
}
function OpeningBook({state,onOpen,isMobile}:{state:"closed"|"opening";onOpen:()=>void;isMobile:boolean}){
return <section className={`book-object ${state} ${isMobile?"mobile-opening":""}`} aria-label="合拢的毛线手帐">
<div className="opening-pages">{isMobile?<MobilePageView pageIndex={0}/>:<SpreadView spread={spreads[0]} index={0}/>}</div>
<button className="front-cover" onClick={onOpen} disabled={state==="opening"} aria-label="翻开毛线手帐">
<div className="cover-face cover-front"><span className="cover-seam"/><div className="mini-photos" aria-hidden="true"><i><img src="./works/30.webp" alt=""/></i><i><img src="./works/08.webp" alt=""/></i><i><img src="./works/02.webp" alt=""/></i></div><div className="small-label">わたしの HANDMADE JOURNAL</div><h1>我的毛线<br/><em>搞怪手帐</em></h1><p>23件作品<br/>把快乐一针一线收进来</p><b className="open-label">从页脚轻轻翻开　↗</b><span className="cover-badge">ENFP<br/>快乐小狗</span></div>
<div className="cover-face cover-back"><div className="inside-pocket"><b>HELLO!</b><p>这本手帐里，住着毛线、脑洞，还有很多次“再织一行就睡”。</p><span>请慢慢翻　♡</span></div></div>
</button>
</section>;
}

export default function Home(){
const [bookState,setBookState]=useState<"closed"|"opening"|"open">("closed");
const [isMobile,setIsMobile]=useState(false);
const [current,setCurrent]=useState(0),[drag,setDrag]=useState(0),[dragDir,setDragDir]=useState<"next"|"prev"|null>(null),[settling,setSettling]=useState(false);
const startPos=useRef<number|null>(null),bookRef=useRef<HTMLDivElement|null>(null),rafRef=useRef<number|null>(null),pendingDrag=useRef(0),lastPos=useRef(0),lastTime=useRef(0),velocity=useRef(0),modeRef=useRef(false);
const total=isMobile?mobilePages.length:spreads.length;
const target=dragDir==="next"?Math.min(current+1,total-1):dragDir==="prev"?Math.max(current-1,0):current;
const openBook=()=>{if(bookState!=="closed")return;setBookState("opening");window.setTimeout(()=>setBookState("open"),1120)};
const finishTurn=(dir:"next"|"prev")=>{const next=dir==="next"?current+1:current-1;if(next<0||next>=total){setDrag(0);setDragDir(null);return}setSettling(true);requestAnimationFrame(()=>setDrag(1));window.setTimeout(()=>{setCurrent(next);setSettling(false);setDrag(0);setDragDir(null)},560)};
const animateTurn=(dir:"next"|"prev")=>{if(settling||(dir==="next"&&current===total-1)||(dir==="prev"&&current===0))return;setDragDir(dir);setDrag(0);requestAnimationFrame(()=>requestAnimationFrame(()=>finishTurn(dir)))};
useEffect(()=>{const query=matchMedia("(max-width: 760px)");const sync=()=>{const next=query.matches;if(next===modeRef.current)return;setCurrent(index=>next?Math.min(index*2,mobilePages.length-1):Math.floor(index/2));modeRef.current=next;setIsMobile(next);setDrag(0);setDragDir(null)};sync();query.addEventListener("change",sync);return()=>query.removeEventListener("change",sync)},[]);
useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if(bookState!=="open")return;if(isMobile){if(event.key==="ArrowUp")animateTurn("next");if(event.key==="ArrowDown")animateTurn("prev")}else{if(event.key==="ArrowRight")animateTurn("next");if(event.key==="ArrowLeft")animateTurn("prev")}};addEventListener("keydown",onKey);return()=>{removeEventListener("keydown",onKey);if(rafRef.current!==null)cancelAnimationFrame(rafRef.current)}});
useEffect(()=>{if(bookState!=="open")return;let frame=0;const elements=(page:Element)=>Array.from(page.querySelectorAll<HTMLElement>(".work-card p,.work-card h3,.letter-paper,.recap-copy"));const overflowing=(page:HTMLElement)=>page.scrollHeight>page.clientHeight+1||page.scrollWidth>page.clientWidth+1||elements(page).some(el=>el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1);const fit=()=>{document.querySelectorAll<HTMLElement>(".journal-page").forEach(page=>{page.classList.remove("fit-tight","fit-tighter");if(overflowing(page))page.classList.add("fit-tight");if(overflowing(page))page.classList.add("fit-tighter")})};frame=requestAnimationFrame(()=>requestAnimationFrame(fit));const observer=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(fit)});if(bookRef.current)observer.observe(bookRef.current);addEventListener("resize",fit);return()=>{cancelAnimationFrame(frame);observer.disconnect();removeEventListener("resize",fit)}},[bookState,current,dragDir,isMobile]);
const point=(event:React.PointerEvent)=>isMobile?event.clientY:event.clientX;
const pointerDown=(event:React.PointerEvent)=>{if(settling)return;const value=point(event);startPos.current=value;lastPos.current=value;lastTime.current=performance.now();velocity.current=0;pendingDrag.current=0;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)};
const pointerMove=(event:React.PointerEvent)=>{if(startPos.current===null||!bookRef.current||settling)return;const now=performance.now(),value=point(event),delta=value-startPos.current;if(Math.abs(delta)<4)return;const dir=delta<0?"next":"prev";if((dir==="next"&&current===total-1)||(dir==="prev"&&current===0))return;velocity.current=(value-lastPos.current)/Math.max(1,now-lastTime.current);lastPos.current=value;lastTime.current=now;const distance=isMobile?bookRef.current.clientHeight:bookRef.current.clientWidth;pendingDrag.current=Math.min(Math.abs(delta)/(distance*(isMobile?.32:.43)),.995);setDragDir(dir);if(rafRef.current===null)rafRef.current=requestAnimationFrame(()=>{setDrag(pendingDrag.current);rafRef.current=null})};
const pointerUp=()=>{if(startPos.current===null)return;startPos.current=null;const fast=Math.abs(velocity.current)>.38;if(dragDir&&(pendingDrag.current>.11||fast))finishTurn(dragDir);else{setSettling(true);setDrag(0);window.setTimeout(()=>{setSettling(false);setDragDir(null)},300)}};
const jump=(index:number)=>{if(index===current||settling)return;const dir=index>current?"next":"prev";setDragDir(dir);setSettling(true);setDrag(0);requestAnimationFrame(()=>requestAnimationFrame(()=>setDrag(1)));window.setTimeout(()=>{setCurrent(index);setDrag(0);setDragDir(null);setSettling(false)},560)};
const curve=Math.sin(drag*Math.PI),shadowSide=dragDir==="next"?-1:1;
const angle=isMobile?(dragDir==="next"?-drag*179:(1-drag)*179):(dragDir==="next"?-1:1)*drag*179;
const leafStyle:React.CSSProperties=isMobile?{transform:`perspective(1900px) rotateX(${angle}deg) rotateZ(${shadowSide*curve*.28}deg)`,boxShadow:`0 ${shadowSide*curve*22}px ${18+curve*30}px rgba(51,34,42,${.17+curve*.24})`,borderRadius:dragDir==="next"?`3px 3px ${8+curve*34}px ${8+curve*34}px`:`${8+curve*34}px ${8+curve*34}px 3px 3px`}:{transform:`perspective(1900px) rotateY(${angle}deg) rotateZ(${shadowSide*curve*.55}deg)`,boxShadow:`${shadowSide*curve*24}px ${8+curve*12}px ${18+curve*28}px rgba(51,34,42,${.16+curve*.25})`,borderRadius:dragDir==="next"?`2px ${4+curve*24}px ${7+curve*35}px 2px`:`${4+curve*24}px 2px 2px ${7+curve*35}px`};
const frontMobileIndex=dragDir==="prev"?target:current,backMobileIndex=dragDir==="prev"?current:target;
const frontPage=isMobile?mobilePages[frontMobileIndex].page:dragDir==="next"?spreads[current].right:spreads[current].left;
const backPage=isMobile?mobilePages[backMobileIndex].page:dragDir==="next"?spreads[target].left:spreads[target].right;
const frontSide=isMobile?mobilePages[frontMobileIndex].side:dragDir==="next"?"right":"left";
const backSide=isMobile?mobilePages[backMobileIndex].side:dragDir==="next"?"left":"right";
const frontIndex=isMobile?mobilePages[frontMobileIndex].spreadIndex:current,backIndex=isMobile?mobilePages[backMobileIndex].spreadIndex:target;
const frontYear=isMobile?mobilePages[frontMobileIndex].year:spreads[current].year,backYear=isMobile?mobilePages[backMobileIndex].year:spreads[target].year;
const frontColor=isMobile?mobilePages[frontMobileIndex].color:spreads[current].color,backColor=isMobile?mobilePages[backMobileIndex].color:spreads[target].color;
const navItems=isMobile?mobilePages:spreads;
return <main className={`desk book-${bookState}`}>
<div className="desk-stickers" aria-hidden="true"><i>✦</i><i>♡</i><i>毛线部</i><i>わくわく</i><i>🐥</i></div>
{bookState!=="open"?<OpeningBook state={bookState} onOpen={openBook} isMobile={isMobile}/>:<section className="reader"><div className={`book-shell ${isMobile?"mobile-book-shell":""} ${settling?"is-settling":""} ${dragDir?`turn-${dragDir}`:""}`} ref={bookRef} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
{dragDir&&target!==current&&(isMobile?<MobilePageView pageIndex={target} className="target-page"/>:<SpreadView spread={spreads[target]} index={target} className="target-spread"/>)}{isMobile?<MobilePageView pageIndex={current} className="active-page"/>:<SpreadView spread={spreads[current]} index={current} className="active-spread"/>}
{dragDir&&target!==current&&<div className={`turning-leaf leaf-${dragDir}`} style={leafStyle} aria-hidden="true"><div className="leaf-face leaf-front"><JournalPageView page={frontPage} side={frontSide} index={frontIndex} year={frontYear} color={frontColor}/></div><div className="leaf-face leaf-back"><JournalPageView page={backPage} side={backSide} index={backIndex} year={backYear} color={backColor}/></div><span className="paper-curl"/></div>}
<div className="book-spine"/><button className="cover-tab" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>{setBookState("closed");setCurrent(0)}}>合上 ↗</button><div className="spread-count">{String(current+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</div>
<button className="page-edge edge-left" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>animateTurn("prev")} disabled={current===0} aria-label="上一页"><i>{isMobile?"↓":"←"}</i></button><button className="page-edge edge-right" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>animateTurn("next")} disabled={current===total-1} aria-label="下一页"><i>{isMobile?"↑":"→"}</i></button>
<nav className="thread-nav" aria-label="手帐页码">{navItems.map((item,index)=><button key={index} className={index===current?"active":""} onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>jump(index)} aria-label={`第${index+1}页`} style={{"--thread":item.color} as React.CSSProperties}/>)}</nav><span className="swipe-note">{isMobile?"向上翻下一页 · 向下翻上一页":"抓住页脚拖动 · 左右翻页"}</span>
</div></section>}
</main>;
}