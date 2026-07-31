"use client";

import { useEffect, useState } from "react";

type Scene = "scarf" | "shawl" | "vest" | "hat" | "pouch" | "coaster" | "socks";
type RoomKey = "shoulder" | "wear" | "outing" | "desk";
type Work = {
  id:number; title:string; kind:string; room:RoomKey; image:string; scene:Scene;
  note:string; place:string; styling:string; moment:string;
};

const works:Work[] = [
  { id:2,title:"小繁花三角巾",kind:"围巾",room:"outing",image:"./works/02.webp",scene:"scarf",note:"小小一条，却很会替普通衣服加上一点轻快。",place:"风衣与针织外套的领口",styling:"让三角尖自然落在胸前，绕颈一圈即可。",moment:"降温后的散步、看展、通勤" },
  { id:3,title:"手帐收纳袋",kind:"收纳",room:"desk",image:"./works/03.webp",scene:"pouch",note:"她把手帐的热闹，认真装进了一个自己织的小口袋。",place:"手帐桌与随身托特包",styling:"装常用笔、胶带和便签，变成一套可以带走的手帐工具。",moment:"咖啡店写手帐、旅行记录" },
  { id:4,title:"杯垫",kind:"家居",room:"desk",image:"./works/04.webp",scene:"coaster",note:"不是宏大的作品，却会在每一次放下杯子时被用到。",place:"书桌、床头或下午茶托盘",styling:"给每天都会拿起的杯子一个柔软落点。",moment:"阅读、手帐、冬日热饮" },
  { id:5,title:"Sophie’s Cardigan",kind:"开衫",room:"wear",image:"./works/05.webp",scene:"vest",note:"从织一件东西，到织出一整套可以穿走的心情。",place:"日常叠穿与换季外套",styling:"内搭纯色衬衫或薄高领，把针法纹理留给近看。",moment:"早秋通勤、周末逛店" },
  { id:8,title:"钻石帽子",kind:"帽子",room:"outing",image:"./works/08.webp",scene:"hat",note:"纹理像一排被收好的小光点，戴上以后轮廓也变得有趣。",place:"冬日外套与耳机旁",styling:"把帽檐略向后推，让纹理成为轮廓。",moment:"散步、旅行、看雪" },
  { id:9,title:"小繁花披肩",kind:"披肩",room:"shoulder",image:"./works/09.webp",scene:"shawl",note:"花纹第一次大面积展开，像一张柔软的地图。",place:"衬衫、连衣裙或沙发扶手",styling:"披在肩上，或折窄后当作大围巾。",moment:"空调房、晚餐、短途旅行" },
  { id:10,title:"繁花披肩",kind:"披肩",room:"shoulder",image:"./works/10.webp",scene:"shawl",note:"当针脚重复得足够多，花纹就真的长成了风景。",place:"素色长裙与大衣之上",styling:"完整展开，让花纹成为整套造型的主角。",moment:"看展、聚会、秋日拍照" },
  { id:11,title:"踏脚石披肩",kind:"披肩",room:"shoulder",image:"./works/11.webp",scene:"shawl",note:"一针接一针，看似缓慢，却会把很长的路走完。",place:"阅读椅、长途车厢与办公室",styling:"斜搭一侧肩膀，既保暖又保留轻松感。",moment:"阅读、通勤、旅行途中" },
  { id:12,title:"云蛟披肩",kind:"披肩",room:"shoulder",image:"./works/12.webp",scene:"shawl",note:"名字、形状和纹理放在一起，已经像一件有设定的作品。",place:"极简黑白穿搭之上",styling:"用素色内搭托住它的结构和边缘。",moment:"秋冬约饭、展览开幕" },
  { id:14,title:"安仁披肩",kind:"披肩",room:"shoulder",image:"./works/14.webp",scene:"shawl",note:"颜色很安静，细节却值得停下来多看一会儿。",place:"棉麻衬衫和自然色外套",styling:"贴近颈部绕一圈，余量从一侧垂下。",moment:"旅行、慢节奏周末" },
  { id:15,title:"Lace Scarf",kind:"围巾",room:"shoulder",image:"./works/15.webp",scene:"scarf",note:"轻、透、细密，是毛线也可以拥有的另一种表情。",place:"简洁领口与轻薄风衣",styling:"不要过度缠绕，让蕾丝针法在光下展开。",moment:"春秋通勤、咖啡店" },
  { id:17,title:"伊莉斯小围巾",kind:"围巾",room:"outing",image:"./works/17.webp",scene:"scarf",note:"小围巾像一句短句，篇幅不长，却能让造型完整。",place:"圆领针织衫与衬衫领口",styling:"像项链一样系在颈间，留下短短的尾端。",moment:"日常出门、朋友见面" },
  { id:18,title:"华夫套衫",kind:"套衫",room:"wear",image:"./works/18.webp",scene:"vest",note:"密密的纹理让衣服看起来柔软，也让耐心变得可见。",place:"牛仔裤、半裙与宽松长裤",styling:"保持其余单品简洁，让华夫纹理成为重点。",moment:"入秋第一件毛衣、周末散步" },
  { id:22,title:"基础款袜子",kind:"袜子",room:"outing",image:"./works/22.webp",scene:"socks",note:"所谓基础款，是把手作真正穿进每天。",place:"家中木地板与短靴里",styling:"让袜口露出一点，低调显示手作纹理。",moment:"居家、露营、冬日旅行" },
  { id:24,title:"白色山脉",kind:"背心",room:"wear",image:"./works/24.webp",scene:"vest",note:"清楚的结构和安静的颜色，像一件可以反复穿很多年的作品。",place:"白衬衫、条纹衫与长裙之上",styling:"用同色系叠穿放大清爽的山脉感。",moment:"春秋通勤、周末看展" },
  { id:27,title:"Zig Zag Scarf",kind:"围巾",room:"outing",image:"./works/27.webp",scene:"scarf",note:"锯齿边让一条围巾有了节奏，也多了一点二次元片尾感。",place:"纯色卫衣与短外套旁",styling:"绕一圈后把锯齿边完整露在正面。",moment:"街头散步、朋友聚会" },
  { id:29,title:"横田古着背心",kind:"背心",room:"wear",image:"./works/29.webp",scene:"vest",note:"喜欢的旧时光没有被复制，而是被重新织了一遍。",place:"复古衬衫、灯芯绒和皮鞋",styling:"沿用旧电影般的低饱和配色。",moment:"秋日市集、唱片店、旅行" },
  { id:30,title:"三国万里子帽子",kind:"帽子",room:"outing",image:"./works/30.webp",scene:"hat",note:"一件小作品，也可以拥有很完整的角色轮廓。",place:"羊毛大衣与围巾上方",styling:"保持整体色彩克制，让帽型成为焦点。",moment:"冬日通勤、城市散步" },
];

const rooms:{key:RoomKey;number:string;title:string;en:string;intro:string}[] = [
  {key:"shoulder",number:"ROOM 01",title:"肩上的风景",en:"LANDSCAPES TO WEAR",intro:"围巾和披肩，是她反复回到的形状。每一次换线、换针法，都像把同一片风景重新画一遍。"},
  {key:"wear",number:"ROOM 02",title:"穿进日常",en:"MADE TO LIVE IN",intro:"当作品不再只被铺开拍照，而是可以真的穿出门，毛线便拥有了新的生活。"},
  {key:"outing",number:"ROOM 03",title:"带出门的小宇宙",en:"SMALL THINGS, FAR AWAY",intro:"帽子、袜子和小围巾，都是不动声色的角色装备：轻巧，却能把今天变得不一样。"},
  {key:"desk",number:"ROOM 04",title:"桌边收藏",en:"OBJECTS FOR EVERY DAY",intro:"手作不只负责好看。它也可以收好一支笔，接住一杯热饮，安静地加入每天。"},
];

const sceneImages:Record<Scene,string> = {
  scarf:"./scenes/scarf.webp",shawl:"./scenes/shawl.webp",vest:"./scenes/vest.webp",hat:"./scenes/hat.webp",
  pouch:"./scenes/pouch.webp",coaster:"./scenes/coaster.webp",socks:"./scenes/socks.webp",
};

export default function Home(){
  const [selected,setSelected] = useState<Work|null>(null);
  const [view,setView] = useState<"work"|"scene">("scene");
  const [letterOpen,setLetterOpen] = useState(false);

  useEffect(()=>{
    document.body.style.overflow = selected || letterOpen ? "hidden" : "";
    return()=>{document.body.style.overflow=""};
  },[selected,letterOpen]);

  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){setSelected(null);setLetterOpen(false)}
      if(!selected || !["ArrowLeft","ArrowRight"].includes(event.key))return;
      const current=works.findIndex(work=>work.id===selected.id);
      setSelected(works[(current+(event.key==="ArrowRight"?1:-1)+works.length)%works.length]);
      setView("scene");
    };
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[selected]);

  const openWork=(work:Work)=>{setSelected(work);setView("scene")};
  const move=(direction:number)=>{
    if(!selected)return;
    const current=works.findIndex(work=>work.id===selected.id);
    setSelected(works[(current+direction+works.length)%works.length]);
    setView("scene");
  };

  return <main id="top">
    <nav className="site-nav">
      <a href="#top" className="brand">一针一线 · 小宇宙</a>
      <div><a href="#story">轨迹</a><a href="#rooms">作品</a><a href="#letter">留给以后</a></div>
    </nav>

    <header className="hero">
      <div className="thread" aria-hidden="true"><span/><i/></div>
      <p className="hero-kicker">A HANDMADE UNIVERSE · 18 SELECTED WORKS</p>
      <h1><span>一针一线</span><span>织成你的小宇宙</span></h1>
      <p className="hero-copy">我把你散落在小红书里的作品，重新放在一起。<br/>想让你看看：原来你已经创造了这样一个完整的世界。</p>
      <a className="enter" href="#story">开始参观 <b>↓</b></a>
      <span className="hero-index">PRIVATE EXHIBITION / 2024—2026</span>
    </header>

    <section className="story" id="story">
      <div className="section-title">
        <p>CREATIVE ORBIT</p><h2>作品自己写下的轨迹</h2>
        <span>没有编造日期，也没有替她说话。<br/>只把作品放在一起，看见它们真实的变化。</span>
      </div>
      <div className="story-track">
        <article><span>01</span><img src="./works/02.webp" alt="小繁花三角巾"/><div><small>从小小一件开始</small><h3>先把喜欢，织成可以带走的形状。</h3></div></article>
        <article><span>02</span><img src="./works/10.webp" alt="繁花披肩"/><div><small>花纹渐渐展开</small><h3>针脚多到一定程度，就变成了风景。</h3></div></article>
        <article><span>03</span><img src="./works/18.webp" alt="华夫套衫"/><div><small>作品穿进日常</small><h3>不只完成，也开始真正陪人生活。</h3></div></article>
        <article><span>04</span><img src="./works/03.webp" alt="手帐收纳袋"/><div><small>宇宙住到桌边</small><h3>连最普通的日常，也有了手作的位置。</h3></div></article>
      </div>
    </section>

    <section className="rooms" id="rooms">
      {rooms.map(room=><section className={"room room-"+room.key} key={room.key}>
        <header className="room-head">
          <div><span>{room.number} · {room.en}</span><h2>{room.title}</h2></div><p>{room.intro}</p>
        </header>
        <div className="room-grid">
          {works.filter(work=>work.room===room.key).map((work,index)=><button className="work-card" key={work.id} onClick={()=>openWork(work)} aria-label={"查看 "+work.title+" 的故事和使用场景"}>
            <span className="work-image"><img src={work.image} alt={work.title} loading="lazy"/></span>
            <span className="work-label"><small>{String(works.indexOf(work)+1).padStart(2,"0")} / {work.kind}</small><strong>{work.title}</strong><em>{work.note}</em><b>看它走进生活 ↗</b></span>
          </button>)}
        </div>
      </section>)}
    </section>

    <section className="dna">
      <div className="dna-intro"><p>CREATIVE DNA</p><h2>她的编织宇宙配方</h2><span>来自这 18 件精选完成作品的真实分类。</span></div>
      <div className="dna-bars">
        <div><span style={{"--size":"50%"} as React.CSSProperties}/><strong>50%</strong><p>肩上的风景<small>围巾与披肩</small></p></div>
        <div><span style={{"--size":"22%"} as React.CSSProperties}/><strong>22%</strong><p>穿进日常<small>开衫、套衫与背心</small></p></div>
        <div><span style={{"--size":"17%"} as React.CSSProperties}/><strong>17%</strong><p>温暖配件<small>帽子与袜子</small></p></div>
        <div><span style={{"--size":"11%"} as React.CSSProperties}/><strong>11%</strong><p>桌边小物<small>收纳与家居</small></p></div>
      </div>
      <div className="curator-picks">
        <article><small>最想带出门</small><strong>小繁花三角巾</strong><span>轻巧、明亮，不需要特别的场合。</span></article>
        <article><small>最像一幅画</small><strong>云蛟披肩</strong><span>名字和纹理都有自己的世界观。</span></article>
        <article><small>最适合每天用</small><strong>手帐收纳袋</strong><span>兴趣和手作在同一件东西里相遇。</span></article>
      </div>
    </section>

    <section className="eyes">
      <p>FROM A FRIEND’S VIEW</p>
      <h2>我记住的，不只是成品。</h2>
      <div>
        <p>我最先记住的是作品，放在一起以后，才看见你很清楚的偏爱：小围巾、大片的披肩、可以叠穿的背心，还有会加入手帐日常的小东西。</p>
        <p>你会回到喜欢的形状里，换一种线、一个颜色或一种针法，再认真做一遍。它们不是零散的更新，而是一个逐渐清晰的小宇宙——柔软，但有自己的结构；可爱，也很耐看。</p>
      </div>
    </section>

    <section className="future" id="letter">
      <div className="future-copy"><p>TO BE CONTINUED</p><h2>这里先留一点空白，<br/>等下一件作品出现。</h2></div>
      <div className="future-slots">
        <div><span>19</span><p>下一次大胆配色</p></div><div><span>20</span><p>下一件舍不得送人的作品</p></div><div><span>21</span><p>尚未出现的神秘作品</p></div>
      </div>
      <button className="gift-button" onClick={()=>setLetterOpen(true)}><span>打开最后一只小盒子</span><b>＋</b></button>
    </section>

    <footer><span>Made with patience, imagination, and many tiny stitches.</span><a href="https://www.xiaohongshu.com/user/profile/617cb389000000000201ea5b" target="_blank" rel="noreferrer">她的小红书 ↗</a></footer>

    {selected&&<div className="viewer" role="dialog" aria-modal="true" aria-label={selected.title+" 作品详情"}>
      <div className="viewer-bar"><span>{String(works.findIndex(work=>work.id===selected.id)+1).padStart(2,"0")} / {works.length}</span><div className="view-switch"><button className={view==="work"?"active":""} onClick={()=>setView("work")}>原作</button><button className={view==="scene"?"active":""} onClick={()=>setView("scene")}>看它上场</button></div><button onClick={()=>setSelected(null)}>关闭 ×</button></div>
      <div className="viewer-body">
        <div className="viewer-visual"><img src={view==="work"?selected.image:sceneImages[selected.scene]} alt={view==="work"?selected.title:selected.title+" 的应用场景灵感"}/><span>{view==="work"?"ORIGINAL / 原作照片":"IN USE / AI 场景灵感 · 以原作为准"}</span></div>
        <aside className="viewer-note"><span>{selected.kind} · WORK {selected.id}</span><h2>{selected.title}</h2><blockquote>{selected.note}</blockquote><dl><div><dt>适合出现</dt><dd>{selected.place}</dd></div><div><dt>使用方式</dt><dd>{selected.styling}</dd></div><div><dt>属于它的时刻</dt><dd>{selected.moment}</dd></div></dl><div className="viewer-nav"><button onClick={()=>move(-1)}>← 上一件</button><button onClick={()=>move(1)}>下一件 →</button></div></aside>
      </div>
    </div>}

    {letterOpen&&<div className="letter-overlay" role="dialog" aria-modal="true" aria-label="留给未来的一封信" onClick={()=>setLetterOpen(false)}>
      <article className="letter" onClick={event=>event.stopPropagation()}><button className="letter-close" onClick={()=>setLetterOpen(false)}>关闭 ×</button><small>FOR THE MAKER / 2026</small><h2>这个小网站，属于你。</h2><p>它不是作品的终点，只是一个小小的展示柜，用来保存你已经织出来的可爱，也留出位置，等待以后出现的新作品。</p><p>里面哪些作品留下、哪些换掉、以后要不要继续更新，都由你决定。</p><strong>你的作品值得被好好看见。<br/>下一件，也会很有意思。</strong><span>— 一位认真看过这些作品的朋友</span></article>
    </div>}
  </main>
}