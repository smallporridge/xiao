"use client";

import { useEffect, useMemo, useState } from "react";

type Group = "颈肩" | "上装" | "帽子" | "小物";
type Scene = "scarf" | "shawl" | "vest" | "hat" | "pouch" | "coaster" | "socks";
type Work = { id:number; title:string; kind:string; group:Group; image:string; scene:Scene; place:string; styling:string; moment:string; };

const works: Work[] = [
  { id:2, title:"小繁花三角巾", kind:"围巾", group:"颈肩", image:"./works/02.webp", scene:"scarf", place:"风衣与针织外套的领口", styling:"让三角尖自然落在胸前，绕颈一圈即可。", moment:"降温后的散步、看展、通勤" },
  { id:3, title:"手帐收纳袋", kind:"收纳", group:"小物", image:"./works/03.webp", scene:"pouch", place:"手帐桌与随身托特包", styling:"装常用笔、胶带和便签，成为一套可带走的手帐工具。", moment:"咖啡店写手帐、旅行记录" },
  { id:4, title:"杯垫", kind:"家居", group:"小物", image:"./works/04.webp", scene:"coaster", place:"书桌、床头或下午茶托盘", styling:"给每天都会拿起的杯子一个柔软落点。", moment:"阅读、手帐、冬日热饮" },
  { id:5, title:"Sophie’s cardigan", kind:"开衫", group:"上装", image:"./works/05.webp", scene:"vest", place:"日常叠穿与换季外套", styling:"内搭纯色衬衫或薄高领，把针法纹理留给近看。", moment:"早秋通勤、周末逛店" },
  { id:6, title:"不完全柏林围巾", kind:"围巾", group:"颈肩", image:"./works/06.webp", scene:"scarf", place:"深色大衣和机车夹克之间", styling:"松松绕一圈，保留两端不对称的垂坠。", moment:"冬日街头、夜间出门" },
  { id:8, title:"钻石帽子", kind:"帽子", group:"帽子", image:"./works/08.webp", scene:"hat", place:"冬日外套与耳机旁", styling:"把帽檐略向后推，让纹理成为轮廓。", moment:"散步、旅行、看雪" },
  { id:9, title:"小繁花披肩", kind:"披肩", group:"颈肩", image:"./works/09.webp", scene:"shawl", place:"衬衫、连衣裙或沙发扶手", styling:"披在肩上，或折窄后当作大围巾。", moment:"空调房、晚餐、短途旅行" },
  { id:10, title:"繁花披肩", kind:"披肩", group:"颈肩", image:"./works/10.webp", scene:"shawl", place:"素色长裙与大衣之上", styling:"完整展开，让花纹成为整套造型的主角。", moment:"看展、聚会、秋日拍照" },
  { id:11, title:"踏脚石披肩", kind:"披肩", group:"颈肩", image:"./works/11.webp", scene:"shawl", place:"阅读椅、长途车厢与办公室", styling:"斜搭一侧肩膀，既保暖又保留轻松感。", moment:"阅读、通勤、旅行途中" },
  { id:12, title:"云蛟披肩", kind:"披肩", group:"颈肩", image:"./works/12.webp", scene:"shawl", place:"极简黑白穿搭之上", styling:"用素色内搭托住它的结构和边缘。", moment:"秋冬约饭、展览开幕" },
  { id:14, title:"安仁披肩", kind:"披肩", group:"颈肩", image:"./works/14.webp", scene:"shawl", place:"棉麻衬衫和自然色外套", styling:"贴近颈部绕一圈，余量从一侧垂下。", moment:"古镇旅行、慢节奏周末" },
  { id:15, title:"Lace scarf", kind:"围巾", group:"颈肩", image:"./works/15.webp", scene:"scarf", place:"简洁领口与轻薄风衣", styling:"不要过度缠绕，让蕾丝针法在光下展开。", moment:"春秋通勤、咖啡店" },
  { id:17, title:"伊莉斯小围巾", kind:"围巾", group:"颈肩", image:"./works/17.webp", scene:"scarf", place:"圆领针织衫与衬衫领口", styling:"像项链一样系在颈间，留下短短的尾端。", moment:"日常出门、朋友见面" },
  { id:18, title:"华夫套衫", kind:"套衫", group:"上装", image:"./works/18.webp", scene:"vest", place:"牛仔裤、半裙与宽松长裤", styling:"保持其余单品简洁，让华夫纹理成为重点。", moment:"入秋第一件毛衣、周末散步" },
  { id:19, title:"三角小围巾", kind:"围巾", group:"颈肩", image:"./works/19.webp", scene:"scarf", place:"T 恤、衬衫和帆布包旁", styling:"轻轻打结，像一枚柔软的领口配饰。", moment:"换季、旅行、日常叠穿" },
  { id:21, title:"Close to You", kind:"披肩", group:"颈肩", image:"./works/21.webp", scene:"shawl", place:"大衣内层或居家阅读角", styling:"包住肩颈，保留自然产生的褶皱。", moment:"夜晚阅读、冷天通勤" },
  { id:22, title:"基础款袜子", kind:"袜子", group:"小物", image:"./works/22.webp", scene:"socks", place:"家中木地板与短靴里", styling:"让袜口露出一点，低调显示手作纹理。", moment:"居家、露营、冬日旅行" },
  { id:24, title:"白色山脉", kind:"背心", group:"上装", image:"./works/24.webp", scene:"vest", place:"白衬衫、条纹衫与长裙之上", styling:"用同色系叠穿放大清爽的山脉感。", moment:"春秋通勤、周末看展" },
  { id:26, title:"白色山脉背心", kind:"背心", group:"上装", image:"./works/26.webp", scene:"vest", place:"牛仔衬衫或深色高领之外", styling:"通过明暗对比把织纹清楚地托出来。", moment:"换季叠穿、旅行" },
  { id:27, title:"Zig Zag Scarf", kind:"围巾", group:"颈肩", image:"./works/27.webp", scene:"scarf", place:"纯色卫衣与短外套旁", styling:"绕一圈后把锯齿边完整露在正面。", moment:"街头散步、朋友聚会" },
  { id:28, title:"芭贝毛线背心", kind:"背心", group:"上装", image:"./works/28.webp", scene:"vest", place:"棉质衬衫与宽松长裤", styling:"选择安静的内搭，让毛线质感更突出。", moment:"办公室、图书馆、逛展" },
  { id:29, title:"横田古着背心", kind:"背心", group:"上装", image:"./works/29.webp", scene:"vest", place:"复古衬衫、灯芯绒和皮鞋", styling:"沿用旧电影般的低饱和配色。", moment:"秋日市集、唱片店、旅行" },
  { id:30, title:"三国万里子帽子", kind:"帽子", group:"帽子", image:"./works/30.webp", scene:"hat", place:"羊毛大衣与围巾上方", styling:"保持整体色彩克制，让帽型成为焦点。", moment:"冬日通勤、城市散步" },
];

const sceneImages: Record<Scene,string> = { scarf:"./scenes/scarf.webp", shawl:"./scenes/shawl.webp", vest:"./scenes/vest.webp", hat:"./scenes/hat.webp", pouch:"./scenes/pouch.webp", coaster:"./scenes/coaster.webp", socks:"./scenes/socks.webp" };
const filters = ["全部","颈肩","上装","帽子","小物"] as const;

export default function Home() {
  const [filter,setFilter] = useState<(typeof filters)[number]>("全部");
  const [selected,setSelected] = useState<Work|null>(null);
  const [view,setView] = useState<"work"|"scene">("scene");
  const visibleWorks = useMemo(() => filter === "全部" ? works : works.filter(work => work.group === filter),[filter]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  },[selected]);

  useEffect(() => {
    const onKey = (event:KeyboardEvent) => {
      if (!selected) return;
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const current = works.findIndex(work => work.id === selected.id);
        setSelected(works[(current + (event.key === "ArrowRight" ? 1 : -1) + works.length) % works.length]);
        setView("scene");
      }
    };
    window.addEventListener("keydown",onKey);
    return () => window.removeEventListener("keydown",onKey);
  },[selected]);

  const openWork = (work:Work) => { setSelected(work); setView("scene"); };
  const move = (direction:number) => {
    if (!selected) return;
    const current = works.findIndex(work => work.id === selected.id);
    setSelected(works[(current + direction + works.length) % works.length]);
    setView("scene");
  };

  return (
    <main id="top">
      <nav className="museum-nav">
        <a href="#top" className="wordmark">TEXTILE / ARCHIVE</a>
        <div className="nav-meta"><span>2024—2026</span><span>{works.length} WORKS</span></div>
      </nav>
      <header className="hero">
        <div className="hero-label">米开朗骑骡 · 纺织作品展</div>
        <h1><span>织物</span><i>/</i><span>在场</span></h1>
        <div className="hero-foot">
          <p>完成的作品不该只停在照片里。<br />点开任意一件，看它走进生活。</p>
          <a href="#exhibition" aria-label="进入作品展览">进入展厅 <b>↓</b></a>
        </div>
      </header>
      <section className="exhibition" id="exhibition">
        <div className="index-head">
          <div><span>EXHIBITION INDEX</span><h2>完成作品</h2></div>
          <p>点作品 · 看它如何被穿上或使用</p>
        </div>
        <div className="filter-rail" aria-label="作品分类">
          {filters.map(item => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "active" : ""} aria-pressed={filter === item}>{item}<sup>{item === "全部" ? works.length : works.filter(work => work.group === item).length}</sup></button>)}
        </div>
        <div className="work-grid">
          {visibleWorks.map((work,index) => (
            <button className="work-tile" key={work.id} onClick={() => openWork(work)} aria-label={"查看 " + work.title + " 的应用场景"}>
              <span className="tile-image"><img src={work.image} alt={work.title} loading={index < 4 ? "eager" : "lazy"} /></span>
              <span className="tile-caption"><small>{String(works.indexOf(work)+1).padStart(2,"0")} / {work.kind}</small><strong>{work.title}</strong><em>VIEW IN USE ↗</em></span>
            </button>
          ))}
        </div>
      </section>
      <footer><span>米开朗骑骡 · COMPLETE WORKS</span><a href="https://www.xiaohongshu.com/user/profile/617cb389000000000201ea5b" target="_blank" rel="noreferrer">XIAOHONGSHU ↗</a></footer>
      {selected && <div className="viewer" role="dialog" aria-modal="true" aria-label={selected.title + " 应用场景"}>
        <div className="viewer-bar">
          <span>{String(works.findIndex(work => work.id === selected.id)+1).padStart(2,"0")} / {String(works.length).padStart(2,"0")}</span>
          <div className="view-switch" aria-label="切换原作和应用场景">
            <button className={view === "work" ? "active" : ""} onClick={() => setView("work")}>原作</button>
            <button className={view === "scene" ? "active" : ""} onClick={() => setView("scene")}>看它上场</button>
          </div>
          <button className="viewer-close" onClick={() => setSelected(null)} aria-label="关闭">关闭 ×</button>
        </div>
        <div className="viewer-body">
          <div className="viewer-visual">
            <img src={view === "work" ? selected.image : sceneImages[selected.scene]} alt={view === "work" ? selected.title : selected.title + " 的应用场景灵感"} />
            <span>{view === "work" ? "ORIGINAL WORK / 原作照片" : "IN USE / AI 场景灵感 · 以原作为准"}</span>
          </div>
          <aside className="viewer-note">
            <span>{selected.kind} · COLLECTION {selected.id}</span><h2>{selected.title}</h2>
            <dl><div><dt>适合出现</dt><dd>{selected.place}</dd></div><div><dt>使用方式</dt><dd>{selected.styling}</dd></div><div><dt>属于它的时刻</dt><dd>{selected.moment}</dd></div></dl>
            <div className="viewer-nav"><button onClick={() => move(-1)}>← 上一件</button><button onClick={() => move(1)}>下一件 →</button></div>
          </aside>
        </div>
      </div>}
    </main>
  );
}