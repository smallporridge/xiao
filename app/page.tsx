"use client";
import {useEffect,useRef,useState} from "react";
type Chapter="start"|"bloom"|"wear"|"life";
type Work={id:number;title:string;kind:string;image:string;note:string;road:string};
type Spread={chapter:Chapter;label:string;left:Work;right:Work};
const spreads:Spread[]=[
{chapter:"start",label:"CHAPTER 01 · 从小小一件开始",left:{id:2,title:"小繁花三角巾",kind:"围巾",image:"./works/02.webp",note:"小小一条，却很会替普通衣服加上一点轻快。",road:"从可以轻松戴上身的小件开始，手作第一次变成了随时能带走的配饰。"},right:{id:17,title:"伊莉斯小围巾",kind:"围巾",image:"./works/17.webp",note:"像一句短句，篇幅不长，却能让一身衣服完整。",road:"尺寸变得更轻，针脚也更克制；开始知道哪里应该丰富，哪里应该留白。"}},
{chapter:"start",label:"CHAPTER 01 · 小件也值得认真",left:{id:8,title:"钻石帽子",kind:"帽子",image:"./works/08.webp",note:"纹理像一排被收好的小光点，戴上以后轮廓也变得有趣。",road:"从平面的围巾走向立体的帽型，作品开始拥有清楚的角色轮廓。"},right:{id:22,title:"基础款袜子",kind:"袜子",image:"./works/22.webp",note:"所谓基础款，是把手作真正穿进每天。",road:"不是每件作品都要复杂。把基础针法做好，也是在为后面的远路打底。"}},
{chapter:"bloom",label:"CHAPTER 02 · 繁花慢慢展开",left:{id:9,title:"小繁花披肩",kind:"披肩",image:"./works/09.webp",note:"花纹第一次大面积展开，像一张柔软的地图。",road:"从小围巾来到整片披肩，重复的针脚终于拥有足够空间长成风景。"},right:{id:10,title:"繁花披肩",kind:"披肩",image:"./works/10.webp",note:"当针脚重复得足够多，花纹就真的有了自己的季节。",road:"不再只是完成一个形状，而是开始控制节奏、留白和整件作品的气氛。"}},
{chapter:"bloom",label:"CHAPTER 02 · 针脚走成很远的路",left:{id:11,title:"踏脚石披肩",kind:"披肩",image:"./works/11.webp",note:"一针接一针，看似缓慢，却会把很长的路走完。",road:"复杂作品教会人的，也许正是把很大的目标拆成眼前这一针。"},right:{id:12,title:"云蛟披肩",kind:"披肩",image:"./works/12.webp",note:"名字、形状和纹理放在一起，已经像一件有设定的作品。",road:"这时的作品不只好看，还开始拥有名字、性格和自己的世界观。"}},
{chapter:"bloom",label:"CHAPTER 02 · 学会轻，也学会安静",left:{id:14,title:"安仁披肩",kind:"披肩",image:"./works/14.webp",note:"颜色很安静，细节却值得停下来多看一会儿。",road:"不是每一次进步都要更热闹；有时是更懂得让颜色和针法彼此成全。"},right:{id:15,title:"Lace Scarf",kind:"围巾",image:"./works/15.webp",note:"轻、透、细密，是毛线也可以拥有的另一种表情。",road:"在厚实之外试着变轻，让针脚和光一起参与作品。"}},
{chapter:"wear",label:"CHAPTER 03 · 作品开始穿进日常",left:{id:5,title:"Sophie’s Cardigan",kind:"开衫",image:"./works/05.webp",note:"从织一件东西，到织出一整套可以穿走的心情。",road:"作品开始覆盖身体，也意味着尺寸、结构和耐心都要一起升级。"},right:{id:18,title:"华夫套衫",kind:"套衫",image:"./works/18.webp",note:"密密的纹理让衣服看起来柔软，也让耐心变得可见。",road:"一件完整套衫，是许多小决定共同成立之后留下的答案。"}},
{chapter:"wear",label:"CHAPTER 03 · 找到自己的衣服",left:{id:24,title:"白色山脉",kind:"背心",image:"./works/24.webp",note:"清楚的结构和安静的颜色，像一件可以反复穿很多年的作品。",road:"开始找到真正适合日常的平衡：有设计，但不会只适合照片。"},right:{id:29,title:"横田古着背心",kind:"背心",image:"./works/29.webp",note:"喜欢的旧时光没有被复制，而是被重新织了一遍。",road:"织法之外，作品的气质也越来越明确——知道自己喜欢什么，并把它做出来。"}},
{chapter:"life",label:"CHAPTER 04 · 让喜欢住进生活",left:{id:3,title:"手帐收纳袋",kind:"收纳",image:"./works/03.webp",note:"她把手帐的热闹，认真装进了一个自己织的小口袋。",road:"两个喜欢的世界在这里碰面：写写画画的手帐，和一针一线的手作。"},right:{id:4,title:"杯垫",kind:"家居",image:"./works/04.webp",note:"不是宏大的作品，却会在每一次放下杯子时被用到。",road:"创作不再只追求完成感，也开始自然地住进一天里最普通的时刻。"}},
{chapter:"life",label:"CHAPTER 04 · 给日常一点角色设定",left:{id:27,title:"Zig Zag Scarf",kind:"围巾",image:"./works/27.webp",note:"锯齿边让一条围巾有了节奏，也多了一点二次元片尾感。",road:"熟悉的围巾又有了新玩法。会重复喜欢的形状，也会给它新的性格。"},right:{id:30,title:"三国万里子帽子",kind:"帽子",image:"./works/30.webp",note:"一件小作品，也可以拥有很完整的角色设定。",road:"走到这里，小件、大件、穿搭和日常已经连成了一个很清楚的小宇宙。"}}
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
<WorkPage work={spread.left} side="left" index={index} chapter={spread.chapter}/>
<WorkPage work={spread.right} side="right" index={index} chapter={spread.chapter} final={index===spreads.length-1}/>
</article>}

export default function Home(){
const [opened,setOpened]=useState(false),[current,setCurrent]=useState(0),[drag,setDrag]=useState(0);
const [dragDir,setDragDir]=useState<"next"|"prev"|null>(null),[settling,setSettling]=useState(false);
const startX=useRef<number|null>(null),bookRef=useRef<HTMLDivElement|null>(null);
const target=dragDir==="next"?Math.min(current+1,spreads.length-1):dragDir==="prev"?Math.max(current-1,0):current;

const finishTurn=(dir:"next"|"prev")=>{const next=dir==="next"?current+1:current-1;if(next<0||next>=spreads.length){setDrag(0);setDragDir(null);return}setSettling(true);setDrag(1);window.setTimeout(()=>{setCurrent(next);setSettling(false);setDrag(0);setDragDir(null)},360)};
const animateTurn=(dir:"next"|"prev")=>{if(settling||(dir==="next"&&current===spreads.length-1)||(dir==="prev"&&current===0))return;setDragDir(dir);window.requestAnimationFrame(()=>finishTurn(dir))};
useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if(!opened)return;if(event.key==="ArrowRight")animateTurn("next");if(event.key==="ArrowLeft")animateTurn("prev")};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)});
const pointerDown=(event:React.PointerEvent)=>{if(settling)return;startX.current=event.clientX;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)};
const pointerMove=(event:React.PointerEvent)=>{if(startX.current===null||!bookRef.current||settling)return;const dx=event.clientX-startX.current;if(Math.abs(dx)<4)return;const dir=dx<0?"next":"prev";if((dir==="next"&&current===spreads.length-1)||(dir==="prev"&&current===0))return;setDragDir(dir);setDrag(Math.min(Math.abs(dx)/(bookRef.current.clientWidth*.42),.96))};
const pointerUp=()=>{if(startX.current===null)return;startX.current=null;if(dragDir&&drag>.16)finishTurn(dragDir);else{setSettling(true);setDrag(0);window.setTimeout(()=>{setSettling(false);setDragDir(null)},240)}};
const jump=(index:number)=>{if(index===current||settling)return;const dir=index>current?"next":"prev";setDragDir(dir);setSettling(true);setDrag(1);window.setTimeout(()=>{setCurrent(index);setDrag(0);setDragDir(null);setSettling(false)},360)};
const currentStyle:React.CSSProperties={opacity:1-drag*.78,transform:"translateX("+(dragDir==="next"?-drag*3:drag*3)+"%) scale("+(1-drag*.012)+")"};
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