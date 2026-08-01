"use client";
import {useEffect,useLayoutEffect,useRef,useState} from "react";

type Entry={id:number;title:string;date:string;kind:string;image:string;caption:string;sticker?:string};
type JournalPage={eyebrow:string;title:string;aside:string;layout:"hero"|"duo"|"cascade"|"postcard"|"triptych";items:Entry[];kind?:"works"|"recap"|"letter"};
type Spread={year:string;color:string;left:JournalPage;right:JournalPage};

const work=(id:number,title:string,date:string,kind:string,caption:string,sticker?:string):Entry=>({id,title,date,kind,image:`./works/${String(id).padStart(2,"0")}.webp`,caption,sticker});

const spreads:Spread[]=[
{year:"2024 · 从第一针开始",color:"#efb9c5",left:{eyebrow:"CHAPTER 01 · 起针",title:"你从能穿出去的作品开始",aside:"帽子和背心，是你的毛线新手村装备。",layout:"duo",items:[
work(30,"三国万里子帽子","2024 年","帽子","第一顶帽子，你选了酒红色。戴上的那一刻，你的毛线新手村也正式开张了。","START"),
work(29,"横田古着背心","2024 年","背心","条纹、古着感，还有一点不肯规规矩矩的颜色——刚开始，你就已经藏不住自己的主意。","偏要条纹")
]},right:{eyebrow:"CHAPTER 02 · 快乐加量",title:"五月以后，你开始让线条捣蛋",aside:"一件像彩糖，一条故意不走直线。",layout:"duo",items:[
work(28,"芭贝毛线背心","2024.05.11","背心","五月十一日，你把彩点毛线织成一件软乎乎的背心。原来一团线真的能变成当天的好心情。","05.11"),
work(27,"Zig Zag Scarf","2024 年","围巾","粉色可以温柔，锯齿也可以捣蛋。你没有二选一，因为两个都很像你。","ZIG ZAG")
]}},
{year:"2024 · 慢慢织出自己的样子",color:"#b9d4cf",left:{eyebrow:"CHAPTER 03 · 山脉连续剧",title:"同一个名字，也能有两种天气",aside:"一件像淡蓝晴天，一件装进薄荷和阳光。",layout:"duo",items:[
work(26,"白色山脉背心","2024 年","背心","淡蓝色轻得像一小片晴天。织到这里，你开始知道自己喜欢怎样的留白。","晴天款"),
work(24,"白色山脉","2024 年","背心","再走一次山脉，这回把薄荷、粉色和阳光一起带上。同一个名字，也能长出新表情。","再来一次")
]},right:{eyebrow:"CHAPTER 04 · 基本功有性格",title:"所谓基础款，也要经过你的配色",aside:"袜子去晒太阳，披肩像一封安静的信。",layout:"duo",items:[
work(22,"平平针基础款袜子","2024 年","袜子","平平针是基本功，可你的袜子偏要像刚完成冒险任务的装备。实用和热闹可以一起出现。","LEVEL UP"),
work(21,"Close to You","2024 年","披肩","这一件浅浅的、软软的。挂在枝头的时候，你也把毛线织成了一封安静的信。","soft")
]}},
{year:"2025 · 耐心开始有形状",color:"#efd694",left:{eyebrow:"CHAPTER 05 · 越来越会完成",title:"小甜点之后，是一整件大工程",aside:"从一条小围巾，到密密麻麻的华夫格。",layout:"duo",items:[
work(19,"三角小围巾","2025 年","围巾","咖啡色在阳光里有一点复古，再别上一枚金色小胸针。你越来越会给作品找位置了。","会搭！"),
work(18,"华夫套衫","2025 年","套衫","一格一格往前，回过神已经是一整件套衫。你的耐心不是等出来的，是每一行都没有跳过。","耐心 +100")
]},right:{eyebrow:"CHAPTER 06 · 过程也值得贴下来",title:"没有完工的日子，也在认真前进",aside:"棒针上的半成品，和花丛里的完成照。",layout:"duo",items:[
work(17,"伊莉斯小围巾","2025 年","围巾","伊莉斯还在棒针上慢慢长大。过程没有成品那么整齐，但这也是你认真赶路的样子。","进行中"),
work(15,"Lace Scarf","2025 年","围巾","完工以后，你给它找了一片花做背景。作品做好了还不算，你还想让它好好登场。","春日限定")
]}},
{year:"2025 · 配色会说话",color:"#d9c4e5",left:{eyebrow:"CHAPTER 07 · 披肩实验室",title:"反差越大胆，作品越有你的脾气",aside:"绿蓝、红边、焦糖橘和深咖，都坐到同一张桌上。",layout:"duo",items:[
work(14,"安仁披肩","2025 年","披肩","绿蓝配红边康乃馨，听起来有点冒险。可你把它们放在一起以后，只想说：果然很可以。","大胆配"),
work(12,"云蛟披肩","2025 年","披肩","焦糖橘接上深咖，柔软里一下有了气势。名字叫云蛟，当然要认真登场。","召唤成功")
]},right:{eyebrow:"CHAPTER 08 · 花样路线图",title:"你不只会织，也开始知道它为什么好看",aside:"一排踏脚石走过去，暗色里就开出了花。",layout:"duo",items:[
work(11,"踏脚石披肩","2025 年","披肩","你把轮廓和花样都画清楚。不是随便织，是一排排踩着踏脚石，把想法带到现实。","CHECK"),
work(10,"繁花披肩","2025 年","披肩","深灰负责稳住，玫红一朵一朵跳出来。你把暗色里的小火花，全都留了下来。","BLOOM")
]}},
{year:"2025 → 2026 · 可爱很有戏",color:"#efbcc8",left:{eyebrow:"CHAPTER 09 · 花纹小剧场",title:"作品旁边，也要安排一点剧情",aside:"小助理负责表情，荧光黄负责抢镜。",layout:"duo",items:[
work(9,"小繁花披肩","2025 年","披肩","红黑披肩、同色线团，再安排一位表情很有戏的小助理。你的作品照也要有剧情。","本日导演"),
work(8,"钻石帽子","2025 年","帽子","钻石纹再加荧光黄，低调是不可能低调的。偶尔就该亮到连自己都忍不住多看两眼。","ENFP")
]},right:{eyebrow:"CHAPTER 10 · 毛茸茸警报",title:"成熟和幼稚，你当然都要",aside:"粉色先赢一半，灰色开衫负责稳住。",layout:"duo",items:[
work(6,"不完全柏林围巾","2026 年","围巾","名字虽然叫“不完全”，这团粉色却已经很会抢镜。完成度可以等等，快乐先到就好。","先赢一半"),
work(5,"Sophie’s Cardigan","2026 年","开衫","开衫负责沉稳灰，小挂件负责偷偷可爱。你没打算选边站，这两种样子都是你。","都要")
]}},
{year:"2026 · 喜欢住进日常",color:"#b7d5c4",left:{eyebrow:"CHAPTER 11 · 日常小物",title:"小东西，也值得认真搞怪",aside:"杯垫和收纳袋，把普通一天变得可爱一点。",layout:"duo",items:[
work(4,"杯垫","2026 年","生活小物","杯垫上再织一只红色小包。有人说没必要，可让普通一天变可爱一点，本来就很有必要。","很有必要"),
work(3,"手帐收纳袋","2026 年","收纳袋","深蓝和橙色绕在一起，再装三颗不一样的按钮。它替纸笔安了家，也把你的小任性一起收好。","住进来吧")
]},right:{eyebrow:"CHAPTER 12 · 最新一页",title:"小繁花，先借小鸭戴一下",aside:"你喜欢的东西终于碰面，作品也立刻有了表情。",layout:"hero",items:[
work(2,"小繁花三角巾","2026 年","三角巾","你没有把它规规矩矩铺平，而是先借小鸭戴一下。作品一遇到角色，立刻就有了自己的表情。","かわいい")
]}},
{year:"未完待续 · 2024—2026",color:"#f1c0cb",left:{eyebrow:"TO BE CONTINUED · 13",title:"原来，你已经织了这么远",aside:"23件作品不是清单，是你一次次起针、拆掉、重来，也一直没弄丢可爱的证据。",layout:"duo",kind:"recap",items:[]},right:{eyebrow:"这一页，由朋友来写 · 14",title:"给未来还会继续织东西的你",aside:"",layout:"hero",kind:"letter",items:[]}}
];

const mobilePages=spreads.flatMap((spread,spreadIndex)=>([
{page:spread.left,side:"left" as const,spreadIndex,year:spread.year,color:spread.color},
{page:spread.right,side:"right" as const,spreadIndex,year:spread.year,color:spread.color}
]));

function WorkCard({item,index}:{item:Entry;index:number}){
return <article className={`work-card card-${index}`}>
<span className="tape" aria-hidden="true"/><div className="photo"><img src={item.image} alt={item.title} draggable={false}/></div>
<div className="work-meta"><span>{item.date}</span><span>{item.kind}</span></div><h3>{item.title}</h3><p>{item.caption}</p>
{item.sticker&&<b className="word-sticker">{item.sticker}</b>}</article>;
}

function JournalPageView({page,side,index,year,color}:{page:JournalPage;side:"left"|"right";index:number;year:string;color:string}){
if(page.kind==="recap")return <section className="journal-page recap-page side-left"><div className="page-no">{String(index*2+1).padStart(2,"0")}</div><div className="year-tab" style={{background:color}}>{year}</div><p className="eyebrow">{page.eyebrow}</p><h2>{page.title}</h2><p className="page-aside">{page.aside}</p><div className="stamp-cloud" aria-hidden="true">{[30,22,15,8,5,2].map((id,i)=><span key={id} style={{transform:`rotate(${[-7,5,-3,8,-5,4][i]}deg)`}}><img src={`./works/${String(id).padStart(2,"0")}.webp`} alt=""/></span>)}</div><div className="recap-copy"><b>你的毛线宇宙配方</b><p>一点大胆配色　＋　一点二次元脑洞<br/>＋　很多很多耐心　＋　永远不嫌多的可爱</p></div></section>;
if(page.kind==="letter")return <section className="journal-page letter-page side-right"><div className="page-no">{String(index*2+2).padStart(2,"0")}</div><div className="year-tab" style={{background:color}}>FOR YOU ♡</div><p className="eyebrow">{page.eyebrow}</p><h2>{page.title}</h2><div className="letter-paper"><span>To Xiao</span><p>愿你以后还会遇到很多喜欢的线，也一直有突然冒出来的好点子。</p><p>想拆就拆，想重来就重来；慢一点没关系，做得开心最重要。</p><p>也愿你一直保留这种本事——把普通的日子，认真变得可爱一点。</p><p>下一件作品完成时，记得回来给这本手帐加一页。</p><b>雨佳 ☺</b></div><div className="letter-doodle" aria-hidden="true">🐾　✦　♡　毛线万岁！</div></section>;
return <section className={`journal-page side-${side} page-layout-${page.layout}`}><div className="page-no">{String(index*2+(side==="right"?2:1)).padStart(2,"0")}</div><div className="year-tab" style={{background:color}}>{year}</div><p className="eyebrow">{page.eyebrow}</p><h2>{page.title}</h2><p className="page-aside">{page.aside}</p><div className="work-layout">{page.items.map((item,i)=><WorkCard key={item.id} item={item} index={i}/>)}</div><span className="page-doodle" aria-hidden="true">{side==="left"?"♡₊˚ えらい！":"✦ できた！ ˚₊"}</span></section>;
}

function SpreadView({spread,index,className,style}:{spread:Spread;index:number;className?:string;style?:React.CSSProperties}){
return <article className={`open-spread ${className??""}`} style={style}><JournalPageView page={spread.left} side="left" index={index} year={spread.year} color={spread.color}/><JournalPageView page={spread.right} side="right" index={index} year={spread.year} color={spread.color}/></article>;
}

function MobilePageView({pageIndex,className}:{pageIndex:number;className?:string}){
const item=mobilePages[pageIndex];
return <article className={`mobile-page-stack ${className??""}`}><JournalPageView page={item.page} side={item.side} index={item.spreadIndex} year={item.year} color={item.color}/></article>;
}
function OpeningBook({state,onOpen,onOpened,isMobile}:{state:"closed"|"opening";onOpen:()=>void;onOpened:()=>void;isMobile:boolean}){
return <section className={`book-object ${state} ${isMobile?"mobile-opening":""}`} aria-label="合拢的毛线手帐">
<div className="opening-pages">{isMobile?<MobilePageView pageIndex={0}/>:<SpreadView spread={spreads[0]} index={0}/>}</div>
<button className="front-cover" onClick={onOpen} onAnimationEnd={event=>{if(state==="opening"&&event.currentTarget===event.target)onOpened()}} disabled={state==="opening"} aria-label="翻开毛线手帐">
<div className="cover-face cover-front">
<img className="cover-art-image" src="./cover-cream-v2.webp" alt="我的毛线搞怪手帐，23件作品，14页"/>
<span className="cover-art-gloss" aria-hidden="true"/>
<b className="open-label">轻点封面翻开　↗</b>
</div>
<div className="cover-face cover-back" aria-hidden="true"/>
</button>
</section>;
}

export default function Home(){
const [bookState,setBookState]=useState<"closed"|"opening"|"open">("closed");
const [isMobile,setIsMobile]=useState(false);
type Turn={from:number;to:number;dir:"next"|"prev"};
const [current,setCurrent]=useState(0),[turn,setTurn]=useState<Turn|null>(null),[settleMode,setSettleMode]=useState<"complete"|"cancel"|null>(null);
const startPos=useRef<number|null>(null),bookRef=useRef<HTMLDivElement|null>(null),leafRef=useRef<HTMLDivElement|null>(null),rafRef=useRef<number|null>(null),pendingDrag=useRef(0),lastPos=useRef(0),lastTime=useRef(0),velocity=useRef(0),modeRef=useRef(false),turnRef=useRef<Turn|null>(null),currentRef=useRef(0);
const total=isMobile?mobilePages.length:spreads.length;
const fromIndex=turn?.from??current,target=turn?.to??current,dragDir=turn?.dir??null,settling=settleMode!==null;
const openBook=()=>{if(bookState==="closed")setBookState("opening")};
const clearTurn=()=>{pendingDrag.current=0;turnRef.current=null;setTurn(null);setSettleMode(null)};
const beginTurn=(dir:"next"|"prev",destination?:number)=>{if(settleMode||turnRef.current)return null;const from=currentRef.current,next=destination??(dir==="next"?from+1:from-1);if(next<0||next>=total)return null;const nextTurn={from,to:next,dir};pendingDrag.current=0;turnRef.current=nextTurn;setTurn(nextTurn);return nextTurn};
const applyLeaf=(rawProgress:number,duration=0)=>{const active=turnRef.current,leaf=leafRef.current;if(!active||!leaf)return;const progress=Math.max(0,Math.min(.9995,rawProgress)),curve=Math.sin(progress*Math.PI),direction=active.dir==="next"?-1:1;const angle=isMobile&&active.dir==="prev"?-(1-progress)*179:direction*progress*179;const bend=direction*curve*(isMobile?.26:.62),lift=-curve*(isMobile?.35:1.4),scale=1-curve*(isMobile?.008:.018);leaf.style.transitionDuration=duration+"ms";leaf.style.setProperty("--leaf-duration",duration+"ms");if(!isMobile){const outerRadius=4+curve*31;leaf.style.borderRadius=active.dir==="next"?`2px ${outerRadius}px ${outerRadius+8}px 2px`:`${outerRadius}px 2px 2px ${outerRadius+8}px`;leaf.style.boxShadow=`${direction*curve*25}px ${5+curve*11}px ${15+curve*31}px rgba(63,42,47,${.1+curve*.2})`}leaf.style.setProperty("--curl",curve.toFixed(4));leaf.style.setProperty("--turn-progress",progress.toFixed(4));leaf.style.setProperty("--shade-opacity",(.06+curve*(isMobile?.46:.7)).toFixed(3));leaf.style.setProperty("--curl-width",(isMobile?22:10+curve*15).toFixed(2)+"%");leaf.style.setProperty("--curl-opacity",(.18+curve*(isMobile?.42:.66)).toFixed(3));leaf.style.transform=`perspective(2100px) translateY(${lift}px) rotateY(${angle}deg) rotateZ(${bend}deg) scaleX(${scale})`};
const settleTurn=(mode:"complete"|"cancel")=>{if(!turnRef.current)return;const destination=mode==="complete"?1:0,remaining=Math.abs(destination-pendingDrag.current),speed=Math.abs(velocity.current);const duration=Math.round(Math.max(300,Math.min(820,330+remaining*430-speed*45)));setSettleMode(mode);requestAnimationFrame(()=>requestAnimationFrame(()=>applyLeaf(destination,duration)))};
const animateTurn=(dir:"next"|"prev")=>{if(!beginTurn(dir))return;requestAnimationFrame(()=>requestAnimationFrame(()=>settleTurn("complete")))};
const finishTransition=(event:React.TransitionEvent<HTMLDivElement>)=>{if(event.target!==event.currentTarget||event.propertyName!=="transform"||!settleMode)return;const active=turnRef.current;if(settleMode==="complete"&&active){currentRef.current=active.to;setCurrent(active.to)}clearTurn()};
useEffect(()=>{currentRef.current=current},[current]);
useLayoutEffect(()=>{if(turn)applyLeaf(pendingDrag.current)},[turn,isMobile]);
useEffect(()=>{const query=matchMedia("(max-width: 820px)");const sync=()=>{const next=query.matches;if(next===modeRef.current)return;setCurrent(index=>{const mapped=next?Math.min(index*2,mobilePages.length-1):Math.floor(index/2);currentRef.current=mapped;return mapped});modeRef.current=next;setIsMobile(next);clearTurn()};sync();query.addEventListener("change",sync);return()=>query.removeEventListener("change",sync)},[]);
useEffect(()=>{if(bookState!=="open")return;let timer=0,cursor=0,cancelled=false;const sources=Array.from(new Set(spreads.flatMap(spread=>[...spread.left.items,...spread.right.items].map(item=>item.image))));const loadBatch=()=>{if(cancelled)return;sources.slice(cursor,cursor+4).forEach(src=>{const image=new Image();image.decoding="async";image.src=src});cursor+=4;if(cursor<sources.length)timer=window.setTimeout(loadBatch,90)};timer=window.setTimeout(loadBatch,120);return()=>{cancelled=true;clearTimeout(timer)}},[bookState]);
useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if(bookState!=="open")return;if(event.key==="ArrowRight")animateTurn("next");if(event.key==="ArrowLeft")animateTurn("prev")};addEventListener("keydown",onKey);return()=>{removeEventListener("keydown",onKey);if(rafRef.current!==null)cancelAnimationFrame(rafRef.current)}});
useLayoutEffect(()=>{if(bookState==="closed"||turnRef.current)return;let frame=0;const elements=(page:Element)=>Array.from(page.querySelectorAll<HTMLElement>(".work-card p,.work-card h3,.letter-paper,.recap-copy"));const overflowing=(page:HTMLElement)=>page.scrollHeight>page.clientHeight+1||page.scrollWidth>page.clientWidth+1||elements(page).some(el=>el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1);const fit=()=>{document.querySelectorAll<HTMLElement>(".journal-page").forEach(page=>{page.classList.remove("fit-tight","fit-tighter");if(overflowing(page))page.classList.add("fit-tight");if(overflowing(page))page.classList.add("fit-tighter")})};fit();frame=requestAnimationFrame(fit);const observer=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(fit)});const host=bookRef.current??document.querySelector<HTMLElement>(".book-object");if(host)observer.observe(host);return()=>{cancelAnimationFrame(frame);observer.disconnect()}},[bookState,current,isMobile]);
const point=(event:React.PointerEvent)=>event.clientX;
const pointerDown=(event:React.PointerEvent)=>{if(settling)return;const value=point(event);startPos.current=value;lastPos.current=value;lastTime.current=performance.now();velocity.current=0;pendingDrag.current=0;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)};
const pointerMove=(event:React.PointerEvent)=>{if(startPos.current===null||!bookRef.current||settling)return;const now=performance.now(),value=point(event),delta=value-startPos.current;if(!turnRef.current&&Math.abs(delta)>=5)beginTurn(delta<0?"next":"prev");const active=turnRef.current;if(!active)return;const effective=active.dir==="next"?startPos.current-value:value-startPos.current;const instant=(value-lastPos.current)/Math.max(1,now-lastTime.current);velocity.current=velocity.current*.58+instant*.42;lastPos.current=value;lastTime.current=now;pendingDrag.current=Math.max(0,Math.min(effective/(bookRef.current.clientWidth*(isMobile?.68:.46)),.995));if(rafRef.current===null)rafRef.current=requestAnimationFrame(()=>{applyLeaf(pendingDrag.current);rafRef.current=null})};
const pointerUp=()=>{if(startPos.current===null)return;startPos.current=null;const active=turnRef.current;if(!active){pendingDrag.current=0;return}const fast=active.dir==="next"?velocity.current<-.3:velocity.current>.3;settleTurn(pendingDrag.current>.2||fast?"complete":"cancel")};
const jump=(index:number)=>{if(index===current||settling)return;const dir=index>current?"next":"prev";if(!beginTurn(dir,index))return;requestAnimationFrame(()=>requestAnimationFrame(()=>settleTurn("complete")))};
const frontMobileIndex=dragDir==="prev"?target:fromIndex,backMobileIndex=dragDir==="prev"?fromIndex:target;
const frontPage=isMobile?mobilePages[frontMobileIndex].page:dragDir==="next"?spreads[fromIndex].right:spreads[fromIndex].left;
const backPage=isMobile?mobilePages[backMobileIndex].page:dragDir==="next"?spreads[target].left:spreads[target].right;
const frontSide=isMobile?mobilePages[frontMobileIndex].side:dragDir==="next"?"right":"left";
const backSide=isMobile?mobilePages[backMobileIndex].side:dragDir==="next"?"left":"right";
const frontPageIndex=isMobile?mobilePages[frontMobileIndex].spreadIndex:fromIndex,backPageIndex=isMobile?mobilePages[backMobileIndex].spreadIndex:target;
const frontYear=isMobile?mobilePages[frontMobileIndex].year:spreads[fromIndex].year,backYear=isMobile?mobilePages[backMobileIndex].year:spreads[target].year;
const frontColor=isMobile?mobilePages[frontMobileIndex].color:spreads[fromIndex].color,backColor=isMobile?mobilePages[backMobileIndex].color:spreads[target].color;
const navItems=isMobile?mobilePages:spreads;
return <main className={"desk book-"+bookState}>
<div className="desk-stickers" aria-hidden="true"><i>✦</i><i>♡</i><i>毛线部</i><i>わくわく</i><i>🐥</i></div>
{bookState!=="open"?<OpeningBook state={bookState} onOpen={openBook} onOpened={()=>setBookState("open")} isMobile={isMobile}/>:<section className="reader"><div className={"book-shell "+(isMobile?"mobile-book-shell ":"")+(settling?"is-settling ":"")+(dragDir?"turn-"+dragDir:"")} ref={bookRef} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
{dragDir&&target!==fromIndex&&(isMobile?<MobilePageView pageIndex={target} className="target-page"/>:<SpreadView spread={spreads[target]} index={target} className="target-spread"/>)}{isMobile?<MobilePageView pageIndex={fromIndex} className="active-page"/>:<SpreadView spread={spreads[fromIndex]} index={fromIndex} className="active-spread"/>}
{dragDir&&target!==fromIndex&&<div ref={leafRef} className={"turning-leaf leaf-"+dragDir} onTransitionEnd={finishTransition} aria-hidden="true"><div className="leaf-face leaf-front"><JournalPageView page={frontPage} side={frontSide} index={frontPageIndex} year={frontYear} color={frontColor}/></div><div className="leaf-face leaf-back"><JournalPageView page={backPage} side={backSide} index={backPageIndex} year={backYear} color={backColor}/></div><span className="paper-curl"/></div>}
<div className="book-spine"/><span className="bookmark-ribbon" aria-hidden="true"/><button className="cover-tab" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>{setBookState("closed");currentRef.current=0;setCurrent(0);clearTurn()}}>回到封面</button><div className="spread-count">{isMobile?"单页":"跨页"} {String(current+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</div>
<button className="page-edge edge-left" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>animateTurn("prev")} disabled={current===0} aria-label="上一页"><i>←</i></button><button className="page-edge edge-right" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>animateTurn("next")} disabled={current===total-1} aria-label="下一页"><i>→</i></button>
<nav className="thread-nav" aria-label="手帐页码">{navItems.map((item,index)=><button key={index} className={index===current?"active":""} onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>jump(index)} aria-label={"第"+(index+1)+"页"} style={{"--thread":item.color} as React.CSSProperties}/>)}</nav><span className="swipe-note">{isMobile?"左右滑动翻页 · 点页角也可以":"拖动纸页或点击页角翻页"}</span>
</div></section>}
</main>;
}
