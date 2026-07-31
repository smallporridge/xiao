"use client";

import { useEffect, useRef, useState } from "react";

type Scene="scarf"|"shawl"|"vest"|"hat"|"pouch"|"coaster"|"socks";
type ChapterKey="begin"|"pattern"|"wear"|"life";
type Work={id:number;title:string;kind:string;chapter:ChapterKey;image:string;scene:Scene;note:string;road:string;use:string};

const works:Work[]=[
{id:2,title:"小繁花三角巾",kind:"围巾",chapter:"begin",image:"./works/02.webp",scene:"scarf",note:"小小一条，却很会替普通衣服加上一点轻快。",road:"从可以轻松戴上身的小件开始，手作第一次变成了随时能带走的配饰。",use:"绕在风衣或针织外套的领口，让三角尖自然落在胸前。"},
{id:17,title:"伊莉斯小围巾",kind:"围巾",chapter:"begin",image:"./works/17.webp",scene:"scarf",note:"像一句短句，篇幅不长，却能让一身衣服完整。",road:"尺寸变得更轻，针脚也更克制；开始知道哪里应该丰富，哪里应该留白。",use:"像项链一样系在圆领针织衫或衬衫领口，留下短短的尾端。"},
{id:8,title:"钻石帽子",kind:"帽子",chapter:"begin",image:"./works/08.webp",scene:"hat",note:"纹理像一排被收好的小光点，戴上以后轮廓也变得有趣。",road:"从平面的围巾走向立体的帽型，作品开始拥有清楚的角色轮廓。",use:"搭配冬日外套，把帽檐略向后推，让纹理完整露出来。"},
{id:22,title:"基础款袜子",kind:"袜子",chapter:"begin",image:"./works/22.webp",scene:"socks",note:"所谓基础款，是把手作真正穿进每天。",road:"不是每件作品都要复杂。把基础针法做好，也是在为后面的远路打底。",use:"穿在家里或短靴中，让袜口露出一点手作纹理。"},
{id:9,title:"小繁花披肩",kind:"披肩",chapter:"pattern",image:"./works/09.webp",scene:"shawl",note:"花纹第一次大面积展开，像一张柔软的地图。",road:"从小围巾来到整片披肩，重复的针脚终于拥有足够空间长成风景。",use:"披在衬衫或连衣裙上，也可以折窄后当作大围巾。"},
{id:10,title:"繁花披肩",kind:"披肩",chapter:"pattern",image:"./works/10.webp",scene:"shawl",note:"当针脚重复得足够多，花纹就真的有了自己的季节。",road:"不再只是完成一个形状，而是开始控制节奏、留白和整件作品的气氛。",use:"在素色长裙或大衣上完整展开，让花纹成为主角。"},
{id:11,title:"踏脚石披肩",kind:"披肩",chapter:"pattern",image:"./works/11.webp",scene:"shawl",note:"一针接一针，看似缓慢，却会把很长的路走完。",road:"复杂作品教会人的，也许正是把很大的目标拆成眼前这一针。",use:"斜搭一侧肩膀，陪着阅读、通勤或一段长途旅行。"},
{id:12,title:"云蛟披肩",kind:"披肩",chapter:"pattern",image:"./works/12.webp",scene:"shawl",note:"名字、形状和纹理放在一起，已经像一件有设定的作品。",road:"这时的作品不只好看，还开始拥有名字、性格和自己的世界观。",use:"用极简黑白内搭托住它的结构，让边缘完整展开。"},
{id:14,title:"安仁披肩",kind:"披肩",chapter:"pattern",image:"./works/14.webp",scene:"shawl",note:"颜色很安静，细节却值得停下来多看一会儿。",road:"不是每一次进步都要更热闹；有时是更懂得让颜色和针法彼此成全。",use:"贴近颈部绕一圈，搭配棉麻衬衫和自然色外套。"},
{id:15,title:"Lace Scarf",kind:"围巾",chapter:"pattern",image:"./works/15.webp",scene:"scarf",note:"轻、透、细密，是毛线也可以拥有的另一种表情。",road:"在厚实之外试着变轻，让针脚和光一起参与作品。",use:"搭配轻薄风衣，不要过度缠绕，让蕾丝针法在光下展开。"},
{id:5,title:"Sophie’s Cardigan",kind:"开衫",chapter:"wear",image:"./works/05.webp",scene:"vest",note:"从织一件东西，到织出一整套可以穿走的心情。",road:"作品开始覆盖身体，也意味着尺寸、结构和耐心都要一起升级。",use:"内搭纯色衬衫或薄高领，把针法纹理留给近看。"},
{id:18,title:"华夫套衫",kind:"套衫",chapter:"wear",image:"./works/18.webp",scene:"vest",note:"密密的纹理让衣服看起来柔软，也让耐心变得可见。",road:"一件完整套衫，是许多小决定共同成立之后留下的答案。",use:"搭配牛仔裤或半裙，其余单品保持简洁，让华夫纹理成为重点。"},
{id:24,title:"白色山脉",kind:"背心",chapter:"wear",image:"./works/24.webp",scene:"vest",note:"清楚的结构和安静的颜色，像一件可以反复穿很多年的作品。",road:"开始找到真正适合日常的平衡：有设计，但不会只适合照片。",use:"叠穿白衬衫、条纹衫或长裙，用同色系放大清爽感。"},
{id:29,title:"横田古着背心",kind:"背心",chapter:"wear",image:"./works/29.webp",scene:"vest",note:"喜欢的旧时光没有被复制，而是被重新织了一遍。",road:"织法之外，作品的气质也越来越明确——知道自己喜欢什么，并把它做出来。",use:"搭配复古衬衫、灯芯绒和皮鞋，延续低饱和的旧电影感。"},
{id:3,title:"手帐收纳袋",kind:"收纳",chapter:"life",image:"./works/03.webp",scene:"pouch",note:"她把手帐的热闹，认真装进了一个自己织的小口袋。",road:"两个喜欢的世界在这里碰面：写写画画的手帐，和一针一线的手作。",use:"装常用笔、胶带和便签，变成一套可以带去咖啡店的工具。"},
{id:4,title:"杯垫",kind:"家居",chapter:"life",image:"./works/04.webp",scene:"coaster",note:"不是宏大的作品，却会在每一次放下杯子时被用到。",road:"创作不再只追求完成感，也开始自然地住进一天里最普通的时刻。",use:"放在书桌或床头，给热饮和阅读时间一个柔软落点。"},
{id:27,title:"Zig Zag Scarf",kind:"围巾",chapter:"life",image:"./works/27.webp",scene:"scarf",note:"锯齿边让一条围巾有了节奏，也多了一点二次元片尾感。",road:"熟悉的围巾又有了新玩法。会重复喜欢的形状，也会给它新的性格。",use:"搭配纯色卫衣或短外套，把锯齿边完整留在正面。"},
{id:30,title:"三国万里子帽子",kind:"帽子",chapter:"life",image:"./works/30.webp",scene:"hat",note:"一件小作品，也可以拥有很完整的角色设定。",road:"走到这里，小件、大件、穿搭和日常已经连成了一个很清楚的小宇宙。",use:"搭配羊毛大衣和围巾，让帽型成为冬日造型的最后一笔。"},
];

const chapters:{key:ChapterKey;title:string;subtitle:string;start:number;color:string}[]=[
{key:"begin",title:"从小小一件开始",subtitle:"CHAPTER 01 · THE FIRST STITCHES",start:0,color:"#f2b8c6"},
{key:"pattern",title:"花纹长成风景",subtitle:"CHAPTER 02 · PATTERNS BLOOM",start:4,color:"#a9c9ee"},
{key:"wear",title:"把作品穿进日常",subtitle:"CHAPTER 03 · MADE TO WEAR",start:10,color:"#f3d77e"},
{key:"life",title:"让喜欢住进生活",subtitle:"CHAPTER 04 · A HANDMADE LIFE",start:14,color:"#a9c6a0"},
];

const scenes:Record<Scene,string>={scarf:"./scenes/scarf.webp",shawl:"./scenes/shawl.webp",vest:"./scenes/vest.webp",hat:"./scenes/hat.webp",pouch:"./scenes/pouch.webp",coaster:"./scenes/coaster.webp",socks:"./scenes/socks.webp"};

export default function Home(){
const [opened,setOpened]=useState(false);
const [page,setPage]=useState(0);
const [direction,setDirection]=useState<"next"|"prev">("next");
const [view,setView]=useState<"work"|"scene">("work");
const [contents,setContents]=useState(false);
const [stars,setStars]=useState<number[]>([]);
const touchStart=useRef<number|null>(null);
const isFinal=page===works.length;
const work=isFinal?null:works[page];
const chapter=work?chapters.find(item=>item.key===work.chapter)!:null;

useEffect(()=>{const saved=localStorage.getItem("xiao-book-stars");if(saved)setStars(JSON.parse(saved))},[]);
useEffect(()=>{
const onKey=(event:KeyboardEvent)=>{if(!opened)return;if(event.key==="ArrowRight")turn(1);if(event.key==="ArrowLeft")turn(-1);if(event.key==="Escape")setContents(false)};
window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey);
});
const go=(target:number)=>{
const next=Math.max(0,Math.min(works.length,target));if(next===page)return;
setDirection(next>page?"next":"prev");setPage(next);setView("work");setContents(false);
};
const turn=(delta:number)=>go(page+delta);
const toggleStar=()=>{if(!work)return;const next=stars.includes(work.id)?stars.filter(id=>id!==work.id):[...stars,work.id];setStars(next);localStorage.setItem("xiao-book-stars",JSON.stringify(next))};
const onTouchEnd=(event:React.TouchEvent)=>{if(touchStart.current===null)return;const distance=event.changedTouches[0].clientX-touchStart.current;if(Math.abs(distance)>55)turn(distance<0?1:-1);touchStart.current=null};

return <main className={"book-app "+(opened?"is-open":"is-closed")}>
{!opened?<section className="cover" aria-label="手账封面">
<div className="cover-paper">
<div className="cover-thread" aria-hidden="true"><i/><i/><i/></div>
<span className="tape tape-one"/><span className="tape tape-two"/>
<div className="cover-stickers" aria-hidden="true"><b>✦</b><b>ENFP</b><b>🐾</b><b>毛线宇宙</b></div>
<p>PRIVATE HANDMADE JOURNAL · 01</p>
<h1><span>一针一线</span><em>织成你的小宇宙</em></h1>
<blockquote>你随手发出的每一件作品，<br/>都有人认真看过、记住，并觉得珍贵。</blockquote>
<button onClick={()=>setOpened(true)}>翻开第一页 <span>→</span></button>
<small>18 WORKS · FOUR CHAPTERS · MADE FOR YOU</small>
</div>
</section>:
<section className="reader">
<header className="reader-top">
<button className="contents-button" onClick={()=>setContents(true)}>☰ 目录</button>
<div className="thread-progress"><span style={{width:((page+1)/(works.length+1)*100)+"%"}}/><i/></div>
<span>{String(page+1).padStart(2,"0")} / {String(works.length+1).padStart(2,"0")}</span>
</header>

<nav className="chapter-tabs" aria-label="章节书签">
{chapters.map(item=><button key={item.key} style={{"--tab":item.color} as React.CSSProperties} className={chapter?.key===item.key?"active":""} onClick={()=>go(item.start)}><span>{item.title}</span></button>)}
<button style={{"--tab":"#d7b4df"} as React.CSSProperties} className={isFinal?"active":""} onClick={()=>go(works.length)}><span>未完待续</span></button>
</nav>

<div className="desk-decoration" aria-hidden="true"><span>✿</span><span>☆</span><span>☁</span></div>
<div className="book-stage" onTouchStart={event=>touchStart.current=event.touches[0].clientX} onTouchEnd={onTouchEnd}>
<div className="book-shadow"/>
<div className="book-spine"/>
{work&&chapter?<article className={"spread turn-"+direction} key={work.id}>
<section className="photo-page">
<span className="washi"/><span className="paperclip">⌇</span>
<div className="photo-frame"><img src={view==="work"?work.image:scenes[work.scene]} alt={view==="work"?work.title:work.title+"的应用场景灵感"}/></div>
<div className="photo-caption"><span>{view==="work"?"原作照片":"AI 场景灵感 · 以原作为准"}</span><b>{work.kind}</b></div>
<div className="view-toggle"><button className={view==="work"?"active":""} onClick={()=>setView("work")}>原作</button><button className={view==="scene"?"active":""} onClick={()=>setView("scene")}>看它上场</button></div>
<span className="doodle doodle-left" aria-hidden="true">⋆｡°✩</span>
</section>
<section className="story-page">
<div className="chapter-label" style={{background:chapter.color}}>{chapter.subtitle}</div>
<span className="page-number">PAGE {String(page+1).padStart(2,"0")}</span>
<h1>{work.title}</h1>
<p className="note">“{work.note}”</p>
<div className="memory-block"><small>这一步，留在了来时的路上</small><p>{work.road}</p></div>
<div className="use-block"><small>让它去生活里</small><p>{work.use}</p></div>
<button className={"star-button "+(stars.includes(work.id)?"starred":"")} onClick={toggleStar}>{stars.includes(work.id)?"★ 这一页已经贴了星星":"☆ 给这一页贴一颗星"}</button>
<span className="doodle doodle-right" aria-hidden="true">♡</span>
</section>
</article>:<article className={"spread final-spread turn-"+direction} key="final">
<section className="photo-page final-collage">
<span className="washi"/><div className="mini-photo one"><img src="./works/02.webp" alt=""/></div><div className="mini-photo two"><img src="./works/10.webp" alt=""/></div><div className="mini-photo three"><img src="./works/03.webp" alt=""/></div><span className="final-sticker">TO BE<br/>CONTINUED!</span>
</section>
<section className="story-page final-page">
<div className="chapter-label" style={{background:"#d7b4df"}}>THE NEXT CHAPTER</div><span className="page-number">PAGE 19</span>
<h1>这本书，<br/>还没有写完。</h1>
<p className="final-note">它只是一个小小的展示柜，保存已经织出来的可爱，也留出位置，等待以后的新作品。</p>
<div className="future-lines"><p>19 / 下一次大胆配色</p><p>20 / 下一件舍不得送人的作品</p><p>21 / 尚未出现的神秘作品</p></div>
<blockquote>这本书以后由你继续写。<br/>里面哪些作品留下、哪些换掉，都由你决定。</blockquote>
<small className="signature">— 一位认真看过这些作品的朋友</small>
</section>
</article>}
<div className="sparkles" key={"spark-"+page} aria-hidden="true"><i>✦</i><i>⋆</i><i>✧</i></div>
</div>

<div className="reader-controls">
<button onClick={()=>turn(-1)} disabled={page===0}>← 上一页</button>
<span>{work?work.title:"未完待续"}</span>
<button onClick={()=>turn(1)} disabled={isFinal}>下一页 →</button>
</div>
<p className="swipe-hint">手机左右轻扫，也可以翻页</p>

{contents&&<div className="contents-overlay" onClick={()=>setContents(false)}>
<aside onClick={event=>event.stopPropagation()}><button className="close-contents" onClick={()=>setContents(false)}>关闭 ×</button><p>TABLE OF CONTENTS</p><h2>这一路，分成四章。</h2>
{chapters.map((item,index)=><button className="toc-chapter" key={item.key} onClick={()=>go(item.start)}><i style={{background:item.color}}/><span><small>CHAPTER 0{index+1}</small><strong>{item.title}</strong><em>{item.start+1}—{(chapters[index+1]?.start??works.length)} 页</em></span></button>)}
<button className="toc-final" onClick={()=>go(works.length)}>未完待续 · PAGE 19 →</button></aside>
</div>}
</section>}
</main>
}