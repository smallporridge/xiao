"use client";
import {useEffect,useLayoutEffect,useRef,useState} from "react";

type Entry={id:number;title:string;date:string;kind:string;image:string;caption:string;sticker?:string};
type JournalPage={eyebrow:string;title:string;aside:string;layout:"hero"|"duo"|"cascade"|"postcard"|"triptych";items:Entry[];kind?:"works"|"recap"|"letter"};
type Spread={year:string;color:string;left:JournalPage;right:JournalPage};

const work=(id:number,title:string,date:string,kind:string,caption:string,sticker?:string):Entry=>({id,title,date,kind,image:`./works/${String(id).padStart(2,"0")}.webp`,caption,sticker});

const spreads:Spread[]=[
{year:"2024 · 从第一针开始",color:"#d69aa9",left:{eyebrow:"CHAPTER 01 · 起针",title:"我先织点真的能穿出去的",aside:"帽子和背心，是我的毛线新手村装备。",layout:"duo",items:[
work(30,"三国万里子帽子","2024 年","帽子","第一顶帽子先选酒红色。戴上的那一刻，我的毛线新手村也算正式开张。","START"),
work(29,"横田古着背心","2024 年","背心","条纹、古着感，还有一点不肯规规矩矩的颜色——刚开始，我就已经藏不住自己的主意。","偏要条纹")
]},right:{eyebrow:"CHAPTER 02 · 快乐加量",title:"五月以后，我开始让线条捣蛋",aside:"一件像彩糖，一条故意不走直线。",layout:"duo",items:[
work(28,"芭贝毛线背心","2024.05.11","背心","五月十一日，我把彩点毛线织成一件软乎乎的背心。原来一团线真的能变成当天的好心情。","05.11"),
work(27,"Zig Zag Scarf","2024 年","围巾","粉色可以温柔，锯齿也可以捣蛋。我没有二选一，因为两个都很像我。","ZIG ZAG")
]}},
{year:"2024 · 慢慢织出自己的样子",color:"#9bb8cf",left:{eyebrow:"CHAPTER 03 · 山脉连续剧",title:"同一个名字，也能有两种天气",aside:"一件像淡蓝晴天，一件装进薄荷和阳光。",layout:"duo",items:[
work(26,"白色山脉背心","2024 年","背心","淡蓝色轻得像一小片晴天。织到这里，我开始知道自己喜欢怎样的留白。","晴天款"),
work(24,"白色山脉","2024 年","背心","再走一次山脉，这回把薄荷、粉色和阳光一起带上。同一个名字，也能长出新表情。","再来一次")
]},right:{eyebrow:"CHAPTER 04 · 基本功有性格",title:"所谓基础款，也要经过我的配色",aside:"袜子去晒太阳，披肩像一封安静的信。",layout:"duo",items:[
work(22,"平平针基础款袜子","2024 年","袜子","平平针是基本功，可我的袜子偏要像刚完成冒险任务的装备。实用和热闹可以一起出现。","LEVEL UP"),
work(21,"Close to You","2024 年","披肩","这一件浅浅的、软软的。挂在枝头的时候，我发现自己也能把毛线织得像一封安静的信。","soft")
]}},
{year:"2025 · 耐心开始有形状",color:"#a8b89e",left:{eyebrow:"CHAPTER 05 · 越来越会完成",title:"小甜点之后，是一整件大工程",aside:"从一条小围巾，到密密麻麻的华夫格。",layout:"duo",items:[
work(19,"三角小围巾","2025 年","围巾","咖啡色在阳光里有一点复古，再别上一枚金色小胸针。嗯，我越来越会给作品找位置了。","会搭！"),
work(18,"华夫套衫","2025 年","套衫","一格一格往前，回过神已经是一整件套衫。原来耐心不是等出来的，是每一行都没有跳过。","耐心 +100")
]},right:{eyebrow:"CHAPTER 06 · 过程也值得贴下来",title:"没有完工的日子，也在认真前进",aside:"棒针上的半成品，和花丛里的完成照。",layout:"duo",items:[
work(17,"伊莉斯小围巾","2025 年","围巾","伊莉斯还在棒针上慢慢长大。过程没有成品那么整齐，但这也是我认真赶路的样子。","进行中"),
work(15,"Lace Scarf","2025 年","围巾","完工以后，我给它找了一片花做背景。作品做好了还不算，我还想让它好好登场。","春日限定")
]}},
{year:"2025 · 配色和花纹会说话",color:"#b9aacf",left:{eyebrow:"CHAPTER 07 · 披肩实验室",title:"脑洞先跑，针脚负责追上",aside:"反差、轮廓、花样，我开始把“为什么好看”也织进去。",layout:"triptych",items:[
work(14,"安仁披肩","2025 年","披肩","绿蓝配红边康乃馨，听起来有点冒险。可我把它们放在一起以后，只想说：果然很可以。","大胆配"),
work(12,"云蛟披肩","2025 年","披肩","焦糖橘接上深咖，柔软里一下有了气势。名字叫云蛟，当然要认真登场。","召唤成功"),
work(11,"踏脚石披肩","2025 年","披肩","我把轮廓和花样都画清楚。不是随便织，是一排排踩着踏脚石，把想法带到现实。","CHECK")
]},right:{eyebrow:"CHAPTER 08 · 花纹小剧场",title:"可爱可以安静，也可以很有戏",aside:"深色里开花，荧光黄负责把镜头抢走。",layout:"triptych",items:[
work(10,"繁花披肩","2025 年","披肩","深灰负责稳住，玫红一朵一朵跳出来。我把暗色里的小火花，全都留了下来。","BLOOM"),
work(9,"小繁花披肩","2025 年","披肩","红黑披肩、同色线团，再安排一位表情很有戏的小助理。我的作品照也要有剧情。","本日导演"),
work(8,"钻石帽子","2025 年","帽子","钻石纹再加荧光黄，低调是不可能低调的。偶尔就该亮到连自己都忍不住多看两眼。","ENFP")
]}},
{year:"2026 · 喜欢住进日常",color:"#91b8aa",left:{eyebrow:"CHAPTER 09 · 毛茸茸研究所",title:"成熟和幼稚，我当然都要",aside:"围巾、开衫、杯垫：认真生活，也认真搞怪。",layout:"triptych",items:[
work(6,"不完全柏林围巾","2026 年","围巾","名字虽然叫“不完全”，这团粉色却已经很会抢镜。完成度可以等等，快乐先到就好。","先赢一半"),
work(5,"Sophie’s Cardigan","2026 年","开衫","开衫负责沉稳灰，小挂件负责偷偷可爱。我没打算选边站，这两种样子都是我。","都要"),
work(4,"杯垫","2026 年","生活小物","杯垫上再织一只红色小包。有人说没必要，可让普通一天变可爱一点，本来就很有必要。","很有必要")
]},right:{eyebrow:"CHAPTER 10 · 我的日常联动",title:"毛线终于和手帐、角色碰面了",aside:"我喜欢的东西没有各玩各的，它们住进了同一页。",layout:"duo",items:[
work(3,"手帐收纳袋","2026 年","收纳袋","深蓝和橙色绕在一起，再装三颗不一样的按钮。它替纸笔安了家，也把我的小任性一起收好。","住进来吧"),
work(2,"小繁花三角巾","2026 年","三角巾","我没有把它规规矩矩铺平，而是先借小鸭戴一下。作品一遇到角色，立刻就有了自己的表情。","かわいい")
]}},
{year:"未完待续 · 2024—2026",color:"#d7a2b3",left:{eyebrow:"TO BE CONTINUED · 11",title:"原来，我已经织了这么远",aside:"23件作品不是清单，是我一次次起针、拆掉、重来，也一直没弄丢可爱的证据。",layout:"duo",kind:"recap",items:[]},right:{eyebrow:"这一页，由朋友来写 · 12",title:"给未来还会继续织东西的你",aside:"",layout:"hero",kind:"letter",items:[]}}
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
if(page.kind==="recap")return <section className="journal-page recap-page side-left"><div className="page-no">{String(index*2+1).padStart(2,"0")}</div><div className="year-tab" style={{background:color}}>{year}</div><p className="eyebrow">{page.eyebrow}</p><h2>{page.title}</h2><p className="page-aside">{page.aside}</p><div className="stamp-cloud" aria-hidden="true">{[30,22,15,8,5,2].map((id,i)=><span key={id} style={{transform:`rotate(${[-7,5,-3,8,-5,4][i]}deg)`}}><img src={`./works/${String(id).padStart(2,"0")}.webp`} alt=""/></span>)}</div><div className="recap-copy"><b>我的毛线宇宙配方</b><p>一点大胆配色　＋　一点二次元脑洞<br/>＋　很多很多耐心　＋　永远不嫌多的可爱</p></div></section>;
if(page.kind==="letter")return <section className="journal-page letter-page side-right"><div className="page-no">{String(index*2+2).padStart(2,"0")}</div><div className="year-tab" style={{background:color}}>FOR YOU ♡</div><p className="eyebrow">{page.eyebrow}</p><h2>{page.title}</h2><div className="letter-paper"><span>给你：</span><p>愿你以后还会遇到很多喜欢的线，也一直有突然冒出来的好点子。</p><p>想拆就拆，想重来就重来；慢一点没关系，做得开心最重要。</p><p>也愿你一直保留这种本事——把普通的日子，认真变得可爱一点。</p><p>下一件作品完成时，记得回来给这本手帐加一页。</p><b>雨佳 ☺</b></div><div className="letter-doodle" aria-hidden="true">🐾　✦　♡　毛线万岁！</div></section>;
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
<div className="cover-face cover-front"><span className="cover-seam"/><div className="mini-photos" aria-hidden="true"><i><img src="./works/30.webp" alt=""/></i><i><img src="./works/08.webp" alt=""/></i><i><img src="./works/02.webp" alt=""/></i></div><div className="small-label">わたしの HANDMADE JOURNAL</div><h1>我的毛线<br/><em>搞怪手帐</em></h1><p>23件作品 · 12页<br/>把快乐一针一线收进来</p><b className="open-label">轻点封面翻开　↗</b><span className="cover-badge">ENFP<br/>快乐小狗</span></div>
<div className="cover-face cover-back" aria-hidden="true"/>
</button>
</section>;
}

export default function Home(){
const [bookState,setBookState]=useState<"closed"|"opening"|"open">("closed");
const [isMobile,setIsMobile]=useState(false);
const [current,setCurrent]=useState(0),[drag,setDrag]=useState(0),[dragDir,setDragDir]=useState<"next"|"prev"|null>(null),[settling,setSettling]=useState(false);
const [turnFrom,setTurnFrom]=useState<number|null>(null),[turnTo,setTurnTo]=useState<number|null>(null);
const startPos=useRef<number|null>(null),bookRef=useRef<HTMLDivElement|null>(null),rafRef=useRef<number|null>(null),pendingDrag=useRef(0),lastPos=useRef(0),lastTime=useRef(0),velocity=useRef(0),modeRef=useRef(false);
const total=isMobile?mobilePages.length:spreads.length;
const fromIndex=turnFrom??current,target=turnTo??current;
const openBook=()=>{if(bookState!=="closed")return;setBookState("opening");window.setTimeout(()=>setBookState("open"),980)};
const prepareTurn=(dir:"next"|"prev",destination?:number)=>{const next=destination??(dir==="next"?current+1:current-1);if(settling||next<0||next>=total)return false;setTurnFrom(current);setTurnTo(next);setDragDir(dir);return true};
const clearTurn=()=>{setDrag(0);setDragDir(null);setTurnFrom(null);setTurnTo(null);setSettling(false)};
const finishTurn=(dir:"next"|"prev")=>{const next=turnTo??(dir==="next"?current+1:current-1);if(next<0||next>=total){clearTurn();return}if(turnTo===null){setTurnFrom(current);setTurnTo(next);setDragDir(dir)}setSettling(true);requestAnimationFrame(()=>setDrag(1));window.setTimeout(()=>{setCurrent(next);requestAnimationFrame(()=>requestAnimationFrame(clearTurn))},520)};
const animateTurn=(dir:"next"|"prev")=>{if(!prepareTurn(dir))return;setDrag(0);requestAnimationFrame(()=>requestAnimationFrame(()=>finishTurn(dir)))};
useEffect(()=>{const query=matchMedia("(max-width: 820px)");const sync=()=>{const next=query.matches;if(next===modeRef.current)return;setCurrent(index=>next?Math.min(index*2,mobilePages.length-1):Math.floor(index/2));modeRef.current=next;setIsMobile(next);setDrag(0);setDragDir(null);setTurnFrom(null);setTurnTo(null)};sync();query.addEventListener("change",sync);return()=>query.removeEventListener("change",sync)},[]);
useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if(bookState!=="open")return;if(event.key==="ArrowRight")animateTurn("next");if(event.key==="ArrowLeft")animateTurn("prev")};addEventListener("keydown",onKey);return()=>{removeEventListener("keydown",onKey);if(rafRef.current!==null)cancelAnimationFrame(rafRef.current)}});
useLayoutEffect(()=>{if(bookState==="closed")return;let frame=0;const elements=(page:Element)=>Array.from(page.querySelectorAll<HTMLElement>(".work-card p,.work-card h3,.letter-paper,.recap-copy"));const overflowing=(page:HTMLElement)=>page.scrollHeight>page.clientHeight+1||page.scrollWidth>page.clientWidth+1||elements(page).some(el=>el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1);const fit=()=>{document.querySelectorAll<HTMLElement>(".journal-page").forEach(page=>{page.classList.remove("fit-tight","fit-tighter");if(overflowing(page))page.classList.add("fit-tight");if(overflowing(page))page.classList.add("fit-tighter")})};fit();frame=requestAnimationFrame(fit);const observer=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(fit)});const host=bookRef.current??document.querySelector<HTMLElement>(".book-object");if(host)observer.observe(host);addEventListener("resize",fit);return()=>{cancelAnimationFrame(frame);observer.disconnect();removeEventListener("resize",fit)}},[bookState,current,dragDir,turnFrom,turnTo,isMobile]);
const point=(event:React.PointerEvent)=>event.clientX;
const pointerDown=(event:React.PointerEvent)=>{if(settling)return;const value=point(event);startPos.current=value;lastPos.current=value;lastTime.current=performance.now();velocity.current=0;pendingDrag.current=0;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)};
const pointerMove=(event:React.PointerEvent)=>{if(startPos.current===null||!bookRef.current||settling)return;const now=performance.now(),value=point(event),delta=value-startPos.current;if(Math.abs(delta)<4)return;const dir=delta<0?"next":"prev",next=dir==="next"?current+1:current-1;if(next<0||next>=total)return;velocity.current=(value-lastPos.current)/Math.max(1,now-lastTime.current);lastPos.current=value;lastTime.current=now;const distance=bookRef.current.clientWidth;pendingDrag.current=Math.min(Math.abs(delta)/(distance*(isMobile?.3:.43)),.995);if(dragDir!==dir||turnTo!==next){setTurnFrom(current);setTurnTo(next);setDragDir(dir)}if(rafRef.current===null)rafRef.current=requestAnimationFrame(()=>{setDrag(pendingDrag.current);rafRef.current=null})};
const pointerUp=()=>{if(startPos.current===null)return;startPos.current=null;const fast=Math.abs(velocity.current)>.38;if(dragDir&&(pendingDrag.current>.11||fast))finishTurn(dragDir);else{setSettling(true);setDrag(0);window.setTimeout(clearTurn,300)}};
const jump=(index:number)=>{if(index===current||settling)return;const dir=index>current?"next":"prev";if(!prepareTurn(dir,index))return;setSettling(true);setDrag(0);requestAnimationFrame(()=>requestAnimationFrame(()=>setDrag(1)));window.setTimeout(()=>{setCurrent(index);requestAnimationFrame(()=>requestAnimationFrame(clearTurn))},520)};
const curve=Math.sin(drag*Math.PI),shadowSide=dragDir==="next"?-1:1;
const angle=isMobile?(dragDir==="next"?-drag*179:-(1-drag)*179):(dragDir==="next"?-1:1)*drag*179;
const leafStyle:React.CSSProperties={transform:"perspective(1900px) rotateY("+angle+"deg) rotateZ("+(shadowSide*curve*(isMobile?.22:.55))+"deg)",boxShadow:(shadowSide*curve*(isMobile?18:24))+"px "+(6+curve*10)+"px "+(18+curve*28)+"px rgba(51,34,42,"+(.14+curve*.22)+")",borderRadius:isMobile?"3px "+(6+curve*26)+"px "+(9+curve*34)+"px 3px":dragDir==="next"?"2px "+(4+curve*24)+"px "+(7+curve*35)+"px 2px":(4+curve*24)+"px 2px 2px "+(7+curve*35)+"px"};
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
{bookState!=="open"?<OpeningBook state={bookState} onOpen={openBook} isMobile={isMobile}/>:<section className="reader"><div className={"book-shell "+(isMobile?"mobile-book-shell ":"")+(settling?"is-settling ":"")+(dragDir?"turn-"+dragDir:"")} ref={bookRef} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
{dragDir&&target!==fromIndex&&(isMobile?<MobilePageView pageIndex={target} className="target-page"/>:<SpreadView spread={spreads[target]} index={target} className="target-spread"/>)}{isMobile?<MobilePageView pageIndex={fromIndex} className="active-page"/>:<SpreadView spread={spreads[fromIndex]} index={fromIndex} className="active-spread"/>}
{dragDir&&target!==fromIndex&&<div className={"turning-leaf leaf-"+dragDir} style={leafStyle} aria-hidden="true"><div className="leaf-face leaf-front"><JournalPageView page={frontPage} side={frontSide} index={frontPageIndex} year={frontYear} color={frontColor}/></div><div className="leaf-face leaf-back"><JournalPageView page={backPage} side={backSide} index={backPageIndex} year={backYear} color={backColor}/></div><span className="paper-curl"/></div>}
<div className="book-spine"/><button className="cover-tab" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>{setBookState("closed");setCurrent(0);clearTurn()}}>回到封面</button><div className="spread-count">{isMobile?"单页":"跨页"} {String(current+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</div>
<button className="page-edge edge-left" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>animateTurn("prev")} disabled={current===0} aria-label="上一页"><i>←</i></button><button className="page-edge edge-right" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>animateTurn("next")} disabled={current===total-1} aria-label="下一页"><i>→</i></button>
<nav className="thread-nav" aria-label="手帐页码">{navItems.map((item,index)=><button key={index} className={index===current?"active":""} onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={()=>jump(index)} aria-label={"第"+(index+1)+"页"} style={{"--thread":item.color} as React.CSSProperties}/>)}</nav><span className="swipe-note">{isMobile?"左右滑动翻页 · 点页角也可以":"拖动纸页或点击页角翻页"}</span>
</div></section>}
</main>;
}
