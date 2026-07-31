"use client";
import {useEffect,useRef,useState} from "react";
type Chapter="start"|"bloom"|"wear"|"life";
type Work={id:number;title:string;kind:string;image:string;note:string;road:string};
type Spread={chapter:Chapter;label:string;story:string;left:Work;right:Work};
const spreads:Spread[]=[
{chapter:"start",label:"CHAPTER 01 · 从小小一件开始",story:"最开始，喜欢只是被织成一件很小的东西。没有宏大的宣言，只有愿意把第一针落下去的认真。",left:{id:2,title:"小繁花三角巾",kind:"围巾",image:"./works/02.webp",note:"它像一个很轻的开场：没有急着证明什么，只是认真把喜欢织成了形状。",road:"从可以轻松戴上身的小件开始，手作第一次变成了随时能带走的配饰。"},right:{id:17,title:"伊莉斯小围巾",kind:"围巾",image:"./works/17.webp",note:"第二条更轻，也更笃定。小小一圈，已经有了属于自己的节奏。",road:"尺寸变得更轻，针脚也更克制；开始知道哪里应该丰富，哪里应该留白。"}},
{chapter:"start",label:"CHAPTER 01 · 小件也值得认真",story:"等双手熟悉了针脚，作品从平面慢慢站起来；而那些看似普通的基础，也被一针一针做好。",left:{id:8,title:"钻石帽子",kind:"帽子",image:"./works/08.webp",note:"针脚第一次立起来，帽子的轮廓也像一个角色慢慢出现。",road:"从平面的围巾走向立体的帽型，作品开始拥有清楚的角色轮廓。"},right:{id:22,title:"基础款袜子",kind:"袜子",image:"./works/22.webp",note:"愿意把基础款也认真做完的人，后来总能走得很远。",road:"不是每件作品都要复杂。把基础针法做好，也是在为后面的远路打底。"}},
{chapter:"bloom",label:"CHAPTER 02 · 繁花慢慢展开",story:"后来，一朵小花不满足于只停在围巾上。它沿着针脚生长，终于铺满了整个肩头。",left:{id:9,title:"小繁花披肩",kind:"披肩",image:"./works/09.webp",note:"从小围巾到整片披肩，花纹终于有了足够的空间慢慢盛开。",road:"从小围巾来到整片披肩，重复的针脚终于拥有足够空间长成风景。"},right:{id:10,title:"繁花披肩",kind:"披肩",image:"./works/10.webp",note:"同一种喜欢再做一次，不是重复，是你开始拥有自己的语言。",road:"不再只是完成一个形状，而是开始控制节奏、留白和整件作品的气氛。"}},
{chapter:"bloom",label:"CHAPTER 02 · 针脚走成很远的路",story:"作品越来越大，时间也越来越长。那些没有被照片记录的坚持，都安静地留在重复的针脚里。",left:{id:11,title:"踏脚石披肩",kind:"披肩",image:"./works/11.webp",note:"这么长的路被藏进针脚里；作品没有说话，耐心却很明显。",road:"复杂作品教会人的，也许正是把很大的目标拆成眼前这一针。"},right:{id:12,title:"云蛟披肩",kind:"披肩",image:"./works/12.webp",note:"它有名字、有气场，像想象力终于长出了一个完整的设定。",road:"这时的作品不只好看，还开始拥有名字、性格和自己的世界观。"}},
{chapter:"bloom",label:"CHAPTER 02 · 学会轻，也学会安静",story:"再往前走，她开始懂得克制：颜色可以安静，毛线可以轻，留白也可以成为作品的一部分。",left:{id:14,title:"安仁披肩",kind:"披肩",image:"./works/14.webp",note:"不需要很热闹，安静的颜色也足够让人停下来。",road:"不是每一次进步都要更热闹；有时是更懂得让颜色和针法彼此成全。"},right:{id:15,title:"Lace Scarf",kind:"围巾",image:"./works/15.webp",note:"你让毛线变得轻而透明；这已经不只是会做，而是在选择怎样表达。",road:"在厚实之外试着变轻，让针脚和光一起参与作品。"}},
{chapter:"wear",label:"CHAPTER 03 · 作品开始穿进日常",story:"针脚从肩头走到身上。她不只是在完成作品，也开始做真正能够陪自己出门、生活的衣服。",left:{id:5,title:"Sophie’s Cardigan",kind:"开衫",image:"./works/05.webp",note:"从围巾到开衫，作品开始真正拥抱身体，而更难的路也被你接住了。",road:"作品开始覆盖身体，也意味着尺寸、结构和耐心都要一起升级。"},right:{id:18,title:"华夫套衫",kind:"套衫",image:"./works/18.webp",note:"密密的纹理看起来柔软，里面却藏着许多没有被照片看见的坚持。",road:"一件完整套衫，是许多小决定共同成立之后留下的答案。"}},
{chapter:"wear",label:"CHAPTER 03 · 找到自己的衣服",story:"做到这里，她已经越来越知道自己喜欢什么：清楚的结构，安静的颜色，还有经得起反复穿着的气质。",left:{id:24,title:"白色山脉",kind:"背心",image:"./works/24.webp",note:"好看之外，它还能陪你穿很久。这是设计真正走进生活的时刻。",road:"开始找到真正适合日常的平衡：有设计，但不会只适合照片。"},right:{id:29,title:"横田古着背心",kind:"背心",image:"./works/29.webp",note:"喜欢的旧时光被重新织过，于是它不再只是复古，而有了你的味道。",road:"织法之外，作品的气质也越来越明确——知道自己喜欢什么，并把它做出来。"}},
{chapter:"life",label:"CHAPTER 04 · 让喜欢住进生活",story:"手作没有停在完成照片里。它开始收好一支笔、接住一杯热饮，住进每天最普通也最真实的时刻。",left:{id:3,title:"手帐收纳袋",kind:"收纳",image:"./works/03.webp",note:"手帐和编织在一个小袋里相遇，原来喜欢的事情也会彼此照顾。",road:"两个喜欢的世界在这里碰面：写写画画的手帐，和一针一线的手作。"},right:{id:4,title:"杯垫",kind:"家居",image:"./works/04.webp",note:"很小的作品也被认真对待，因为你愿意让普通的一天多一点可爱。",road:"创作不再只追求完成感，也开始自然地住进一天里最普通的时刻。"}},
{chapter:"life",label:"CHAPTER 04 · 给日常一点角色设定",story:"回头看，小件、大件、穿搭和生活已经连成一个完整的小宇宙。它不是终点，下一页仍然等她继续写。",left:{id:27,title:"Zig Zag Scarf",kind:"围巾",image:"./works/27.webp",note:"熟悉的围巾换上新的节奏，像片尾曲响起时忽然跳出来的彩蛋。",road:"熟悉的围巾又有了新玩法。会重复喜欢的形状，也会给它新的性格。"},right:{id:30,title:"三国万里子帽子",kind:"帽子",image:"./works/30.webp",note:"这顶帽子像一个句号，也像新的开场：你已经有了完整的小宇宙。",road:"走到这里，小件、大件、穿搭和日常已经连成了一个很清楚的小宇宙。"}}
];
const chapterColors:Record<Chapter,string>={start:"#f2a9bd",bloom:"#9fc4ed",wear:"#f1cf63",life:"#9eb894"};
const chapterNames:Record<Chapter,string>={start:"最初的小件",bloom:"花纹的风景",wear:"穿进日常",life:"喜欢的生活"};

function WorkPage({work,side,index,chapter,final}:{work:Work;side:"left"|"right";index:number;chapter:Chapter;final?:boolean}){
const decorations=["✦","♡","✿","🐾"];
return <section className={"journal-page side-"+side+" layout-"+((index+(side==="right"?1:0))%4)}>
<span className="page-grain"/><span className="binding-shadow"/>
<div className="chapter-chip" style={{background:chapterColors[chapter]}}>{work.kind}</div>
<span className="folio">{String(index*2+(side==="right"?2:1)).padStart(2,"0")}</span>
<div className="photo-piece"><span className="washi"/><img src={work.image} alt={work.title}/><small>ORIGINAL WORK · {work.id}</small></div>
<div className="title-piece"><p>{work.title}</p><span>{decorations[(index+(side==="right"?2:0))%decorations.length]}</span></div>
<blockquote>{work.note}</blockquote>
<div className="road-note"><small>这一步，留在了来时的路上</small><p>{work.road}</p></div>
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