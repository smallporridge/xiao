"use client";
import {useEffect,useRef,useState} from "react";
type Chapter="start"|"bloom"|"wear"|"life";
type Work={id:number;title:string;kind:string;date:string;image:string;note:string;road:string};
type Spread={chapter:Chapter;label:string;story:string;left:Work;right:Work};
const spreads:Spread[]=[
{chapter:"start",label:"2024 · 最初的两件",story:"2024，她先从一顶帽子和一件背心出发。那时针脚还在找方向，但她已经很清楚：喜欢的颜色要大胆用，做出来的东西也要有自己的性格。",left:{id:30,title:"三国万里子帽子",kind:"帽子",date:"2024",image:"./works/30.webp",note:"第一页是一顶深红色的帽子。颜色不躲，柔软的绒感也不躲——她从一开始，就没有把喜欢做得含含糊糊。",road:"原帖认真写下了作品的完整名字。她会记得一个设计从哪里来，也愿意用自己的双手把它重新理解一遍。"},right:{id:29,title:"横田古着背心",kind:"背心",date:"2024",image:"./works/29.webp",note:"深蓝压住跳起来的黄、白和薄荷绿，明快，却一点也不乱。她其实很会给快乐找秩序。",road:"照片里还留着没藏好的线头。比起只展示完美，她更愿意诚实地记录一件作品真正长出来的样子。"}},
{chapter:"start",label:"2024 · 可爱开始有了主见",story:"很快，她不再满足于“做出来”。围巾要有会拐弯的边缘，背心要有像晴天一样的颜色；实用和可爱，她从来没想过只能选一个。",left:{id:27,title:"Zig Zag Scarf",kind:"围巾",date:"2024",image:"./works/27.webp",note:"温柔的粉色偏偏不肯走直线，弯弯的边缘让乖巧里多了一点调皮。这很像她：可爱从来不是安静坐好。",road:"原帖写着“misha and puff zig zag scarf”。她喜欢明确的设计，也总能从里面挑出最适合自己的那一点俏皮。"},right:{id:24,title:"白色山脉",kind:"背心",date:"2024",image:"./works/24.webp",note:"名字叫“白色山脉”，颜色却像把春天揉进毛线：薄荷绿里浮着粉和蓝，轻得像会发光。",road:"作品从小配饰走向完整衣服。她开始同时照顾尺寸、结构和穿着，也没有因此放弃自己喜欢的颜色。"}},
{chapter:"bloom",label:"2024 → 2025 · 基础也有她的样子",story:"走过第一年的尝试，基本功开始变成日常。袜子、套衫，这些最考验耐心的东西，也被她织得不沉闷——普通的题目，到了她手里总会多一点快乐。",left:{id:22,title:"平平针基础款袜子",kind:"袜子",date:"2024",image:"./works/22.webp",note:"原帖说它是“平平针基础款”，照片里却是两只彩色袜子挂在树间，像刚完成一次小小冒险。",road:"她愿意认真做基础，也不会让基础变得无聊。把必须练的针法，顺手变成自己愿意穿的颜色。"},right:{id:18,title:"华夫套衫",kind:"套衫",date:"2025",image:"./works/18.webp",note:"灰色华夫纹密密铺开，看起来安静又柔软；只有真正织过的人，才知道这份“安静”里放了多少耐心。",road:"从背心来到完整套衫，难度不只多了一双袖子。她已经能把很长的工程，一针一针稳稳接住。"}},
{chapter:"bloom",label:"2025 · 她也珍惜正在发生的过程",story:"这一年，她不只保存完工照，也留下线团、棒针和尚未完成的形状。她知道创作最真实的样子，本来就包括等待、修改和一点点长大。",left:{id:17,title:"伊莉斯小围巾",kind:"围巾",date:"2025",image:"./works/17.webp",note:"鲜亮的红线还连着线团，花纹只走到半途。她愿意记录“正在变成”的时刻，因为过程本身也值得被记住。",road:"这不是一张急着交作业的照片。她对手作的喜欢，早已不只发生在完成的那一刻。"},right:{id:15,title:"Lace Scarf",kind:"围巾",date:"2025",image:"./works/15.webp",note:"浅紫围巾被她放进一片粉色花丛里。不是随手拍完就走，而是认真替作品找到了最合适的春天。",road:"原帖特意写下“完工”。从针上的线到花间的成品，她珍惜最后一针，也珍惜作品被好好看见。"}},
{chapter:"bloom",label:"2025 · 每件作品都有自己的场景",story:"慢慢地，拍照也成了作品的一部分。花、手帐纸和留在针上的线，不只是背景，而是她为每件手作安排的小舞台。",left:{id:14,title:"安仁披肩",kind:"披肩",date:"2025",image:"./works/14.webp",note:"清凉的绿蓝毛线和热烈的康乃馨放在一起，反差很大，却意外地合拍——像她脑子里总有不按常理出现的好点子。",road:"即使作品还留在针上，她也会把桌面认真布置好。她不是只想证明“做完了”，她是真的在享受它发生。"},right:{id:12,title:"云蛟披肩",kind:"披肩",date:"2025",image:"./works/12.webp",note:"焦糖橘、深咖和起伏的扇形边缘，让一条披肩真的有了“云蛟”的气场：柔软，却不弱。",road:"走到这里，作品已经不只有用途。她会替它取一个能让人记住的名字，也会把名字织进配色和轮廓里。"}},
{chapter:"wear",label:"2025 · 不只会做，也开始会表达",story:"针脚越来越熟，她开始把想法讲清楚：哪里是踏脚石，花纹怎样生长，深色里为什么要露出一点玫红。作品有了结构，也有了她自己的解释。",left:{id:11,title:"踏脚石披肩",kind:"披肩",date:"2025",image:"./works/11.webp",note:"她给披肩画出轮廓，还认真标出“踏脚石花样”。可爱只是第一眼，第二眼会发现，她其实很在意一件事为什么成立。",road:"从照着织到能够拆开来讲，说明她已经真正读懂了针脚。认真不是她挂在嘴边的话，而是留在图上的小标注。"},right:{id:10,title:"繁花披肩",kind:"披肩",date:"2025",image:"./works/10.webp",note:"深灰里一朵朵冒出玫红，像安静画面里藏着的小火花。她喜欢可爱，也懂得用深色把它衬得刚刚好。",road:"“繁花”不是偶然出现一次的图案，而是她愿意反复尝试、慢慢发展的一种语言。"}},
{chapter:"wear",label:"2025 · 她越来越敢把自己放进去",story:"等技术不再需要被反复证明，她反而更自由了：毛线可以荧光黄，披肩旁可以坐着一只表情很有戏的小角色。她的兴趣终于在同一页相遇。",left:{id:9,title:"小繁花披肩",kind:"披肩",date:"2025",image:"./works/09.webp",note:"红黑披肩、同色线团，再让一只表情很有戏的小角色坐在中间——她的作品照，总会悄悄变成一个小剧场。",road:"二次元对她不是后来贴上的装饰，而是一直陪着创作的伙伴。作品很认真，画面却永远留着一点玩心。"},right:{id:8,title:"钻石帽子",kind:"帽子",date:"2025",image:"./works/08.webp",note:"荧光黄亮得几乎藏不住，立体钻石纹又把光接得满满的。很像她的快乐小狗能量：明亮、直接、让人也跟着开心。",road:"她已经不怕高调的颜色，也有足够的技术撑住它。所谓个人风格，大概就是“这一顶很像她”。"}},
{chapter:"life",label:"2026 · 喜欢开始住进每天",story:"来到2026，手作不只负责好看，也开始照顾生活。它藏进衣领、接住杯子，还会给喜欢的小角色留一个最显眼的位置。",left:{id:5,title:"Sophie’s Cardigan",kind:"开衫",date:"2026",image:"./works/05.webp",note:"灰色开衫很稳，领口却探出一只小角色。她总有办法让实穿的衣服不无聊，也让喜欢的东西光明正大地陪着自己。",road:"这是完整衣服，也是她日常的一部分。她做的已经不只是“作品”，而是会被穿上、被使用、被反复想起的生活。"},right:{id:4,title:"杯垫",kind:"生活小物",date:"2026",image:"./works/04.webp",note:"连杯垫也要织上一只红色小包。明明只是放杯子的地方，她还是愿意多想一步，让桌面多一个小彩蛋。",road:"她的用心常常不在宏大的地方，而在这些“其实不做也可以”的细节里。正因为可以省略，认真才更可爱。"}},
{chapter:"life",label:"2026 · 所有喜欢终于住在一起",story:"最新的两页，手帐、编织和二次元已经不再分开。回头看才发现，她不是做了许多零散的小东西，而是一点点搭起了一个非常像她的世界。",left:{id:3,title:"手帐收纳袋",kind:"收纳袋",date:"2026",image:"./works/03.webp",note:"深蓝和橙色绕在一起，再配三颗不一样的按钮。连收纳袋都不肯太规矩，快乐得很有她自己的节奏。",road:"原帖写的是“手帐收纳袋”。两个最喜欢的世界在这里碰面：针线替纸笔做了一个家，也替她收好了每天的小灵感。"},right:{id:2,title:"小繁花三角巾",kind:"三角巾",date:"2026",image:"./works/02.webp",note:"最新一页，她没有把三角巾规规矩矩铺平，而是认真给小鸭戴好。作品有了用途，也立刻有了角色和表情。",road:"从深红帽子走到这一条小繁花，她一直在进步，却没有把最初的可爱弄丢。真正难得的，是会得更多以后仍然很像自己。"}}
];
const chapterColors:Record<Chapter,string>={start:"#f2a9bd",bloom:"#9fc4ed",wear:"#f1cf63",life:"#9eb894"};
const chapterNames:Record<Chapter,string>={start:"2024 · 初见轮廓",bloom:"2025 · 练习生长",wear:"2025 · 有了语言",life:"2026 · 住进日常"};

function WorkPage({work,side,index,chapter,final}:{work:Work;side:"left"|"right";index:number;chapter:Chapter;final?:boolean}){
const decorations=["✦","♡","✿","🐾"];
return <section className={"journal-page side-"+side+" layout-"+((index+(side==="right"?1:0))%4)}>
<span className="page-grain"/><span className="binding-shadow"/>
<div className="chapter-chip" style={{background:chapterColors[chapter]}}>{work.date}</div>
<span className="folio">{String(index*2+(side==="right"?2:1)).padStart(2,"0")}</span>
<div className="photo-piece"><span className="washi"/><img src={work.image} alt={work.title}/><small>{work.date} · {work.kind} · NO.{String(work.id).padStart(2,"0")}</small></div>
<div className="title-piece"><p>{work.title}</p><span>{decorations[(index+(side==="right"?2:0))%decorations.length]}</span></div>
<blockquote>{work.note}</blockquote>
<div className="road-note"><small>我从这件作品里，读到的你</small><p>{work.road}</p></div>
<span className="scribble" aria-hidden="true">{side==="left"?"⋆｡ ﾟ☁︎｡ ⋆｡":"♡₊˚ ✧ ﾟ."}</span>
{final&&<span className="continue-sticker">未完<br/>待续</span>}
</section>}

function SpreadView({spread,index,className,style}:{spread:Spread;index:number;className?:string;style?:React.CSSProperties}){
return <article className={"open-spread "+(className??"")} style={style}>
<div className="spread-story" style={{background:chapterColors[spread.chapter]}}><small>{spread.label}</small><p>{spread.story}</p></div>
<WorkPage work={spread.left} side="left" index={index} chapter={spread.chapter}/>
<WorkPage work={spread.right} side="right" index={index} chapter={spread.chapter} final={index===spreads.length-1}/>
</article>}

export default function Home(){
const [opened,setOpened]=useState(false),[current,setCurrent]=useState(0),[drag,setDrag]=useState(0);
const [dragDir,setDragDir]=useState<"next"|"prev"|null>(null),[settling,setSettling]=useState(false);
const startX=useRef<number|null>(null),bookRef=useRef<HTMLDivElement|null>(null);
const rafRef=useRef<number|null>(null),pendingDrag=useRef(0),lastX=useRef(0),lastTime=useRef(0),velocity=useRef(0);
const target=dragDir==="next"?Math.min(current+1,spreads.length-1):dragDir==="prev"?Math.max(current-1,0):current;

const finishTurn=(dir:"next"|"prev")=>{const next=dir==="next"?current+1:current-1;if(next<0||next>=spreads.length){setDrag(0);setDragDir(null);return}setSettling(true);window.requestAnimationFrame(()=>setDrag(1));window.setTimeout(()=>{setCurrent(next);setSettling(false);setDrag(0);setDragDir(null)},460)};
const animateTurn=(dir:"next"|"prev")=>{if(settling||(dir==="next"&&current===spreads.length-1)||(dir==="prev"&&current===0))return;setDragDir(dir);setDrag(0);window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>finishTurn(dir)))};
useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if(!opened)return;if(event.key==="ArrowRight")animateTurn("next");if(event.key==="ArrowLeft")animateTurn("prev")};window.addEventListener("keydown",onKey);return()=>{window.removeEventListener("keydown",onKey);if(rafRef.current!==null)window.cancelAnimationFrame(rafRef.current)}});
const pointerDown=(event:React.PointerEvent)=>{if(settling)return;startX.current=event.clientX;lastX.current=event.clientX;lastTime.current=performance.now();velocity.current=0;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)};
const pointerMove=(event:React.PointerEvent)=>{if(startX.current===null||!bookRef.current||settling)return;const now=performance.now(),dx=event.clientX-startX.current;if(Math.abs(dx)<4)return;const dir=dx<0?"next":"prev";if((dir==="next"&&current===spreads.length-1)||(dir==="prev"&&current===0))return;velocity.current=(event.clientX-lastX.current)/Math.max(1,now-lastTime.current);lastX.current=event.clientX;lastTime.current=now;pendingDrag.current=Math.min(Math.abs(dx)/(bookRef.current.clientWidth*.46),.985);setDragDir(dir);if(rafRef.current===null)rafRef.current=window.requestAnimationFrame(()=>{setDrag(pendingDrag.current);rafRef.current=null})};
const pointerUp=()=>{if(startX.current===null)return;startX.current=null;const fast=Math.abs(velocity.current)>.42;if(dragDir&&(pendingDrag.current>.12||fast))finishTurn(dragDir);else{setSettling(true);setDrag(0);window.setTimeout(()=>{setSettling(false);setDragDir(null)},300)}};
const jump=(index:number)=>{if(index===current||settling)return;const dir=index>current?"next":"prev";setDragDir(dir);setDrag(0);setSettling(true);window.requestAnimationFrame(()=>window.requestAnimationFrame(()=>setDrag(1)));window.setTimeout(()=>{setCurrent(index);setDrag(0);setDragDir(null);setSettling(false)},460)};
const currentStyle:React.CSSProperties={opacity:1-drag*.46,transform:"translate3d("+(dragDir==="next"?-drag*2.2:drag*2.2)+"%,0,0) scale("+(1-drag*.007)+")"};
const leafStyle:React.CSSProperties={transform:"rotateY("+(dragDir==="next"?-drag*178:drag*178)+"deg)",opacity:dragDir?1:0};

return <main className={"scrapbook "+(opened?"book-open":"book-closed")}>
{!opened?<section className="new-cover"><div className="cover-book">
<span className="cover-band"/><span className="cover-tape"/>
<div className="cover-photo"><img src="./works/10.webp" alt="繁花披肩"/><i/></div>
<div className="cover-copy"><small>HANDMADE STORY BOOK · 2026</small><h1>一针一线<br/><em>织成你的小宇宙</em></h1><p>一本记录她来时路的手作书</p></div>
<div className="cover-doodles" aria-hidden="true"><b>✦</b><b>ENFP</b><b>🐾</b><b>♡</b><b>毛线玩家</b></div>
<button onClick={()=>setOpened(true)}>打开手账 <span>→</span></button>
</div></section>:<section className="book-reader">
<header className="book-bar"><button onClick={()=>setOpened(false)}>← 封面</button><div className="book-title"><span>一针一线，织成你的小宇宙</span><small>{chapterNames[spreads[current].chapter]}</small></div><div className="spread-count">{String(current+1).padStart(2,"0")} / {String(spreads.length).padStart(2,"0")}</div></header>
<div className="book-area">
<div className="floating-stickers" aria-hidden="true"><span>☆</span><span>✿</span><span>♡</span></div>
<div className={"book-shell "+(settling?"is-settling":"")} ref={bookRef} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
<div className="book-drop"/>
{dragDir&&target!==current&&<SpreadView spread={spreads[target]} index={target} className="target-spread"/>}
<SpreadView spread={spreads[current]} index={current} className="active-spread" style={currentStyle}/>
<div className={"turning-leaf leaf-"+(dragDir??"next")} style={leafStyle}><span/><i/></div><div className="book-spine"/>
<button className="page-edge edge-left" onPointerDown={event=>event.stopPropagation()} onPointerUp={event=>event.stopPropagation()} onClick={event=>{event.stopPropagation();animateTurn("prev")}} disabled={current===0} aria-label="上一跨页"><i>←</i></button>
<button className="page-edge edge-right" onPointerDown={event=>event.stopPropagation()} onPointerUp={event=>event.stopPropagation()} onClick={event=>{event.stopPropagation();animateTurn("next")}} disabled={current===spreads.length-1} aria-label="下一跨页"><i>→</i></button>
</div>
<p className="gesture-hint">点击页角 / 按住纸张拖动 / 手机左右划</p>
<nav className="spread-nav" aria-label="跨页导航">{spreads.map((spread,index)=><button key={index} className={index===current?"active":""} style={{"--dot":chapterColors[spread.chapter]} as React.CSSProperties} onClick={()=>jump(index)} aria-label={"跳到第"+(index+1)+"跨页"}><span/></button>)}</nav>
<div className="chapter-legend">{(["start","bloom","wear","life"] as Chapter[]).map(chapter=><span key={chapter}><i style={{background:chapterColors[chapter]}}/>{chapterNames[chapter]}</span>)}</div>
</div></section>}
</main>}