"use client";

import { useEffect, useMemo, useState } from "react";

type Work = {
  id: number;
  title: string;
  category: "披肩" | "围巾" | "衣物" | "帽子" | "小物" | "手作日记";
  image: string;
  note: string;
};

const works: Work[] = [
  { id: 1, title: "教程｜意式单螺纹 管状收针（准备针）", category: "手作日记", image: "./works/01.webp", note: "技能点 +1：意式收针已解锁。" },
  { id: 2, title: "围巾｜小繁花三角巾", category: "围巾", image: "./works/02.webp", note: "小繁花围巾，轻装出门时的可爱加成。" },
  { id: 3, title: "小物｜手帐收纳袋", category: "小物", image: "./works/03.webp", note: "手账装备栏扩容成功。" },
  { id: 4, title: "小物｜杯垫", category: "小物", image: "./works/04.webp", note: "杯垫虽小，配色绝不随便。" },
  { id: 5, title: "毛衣｜Sophie’s cardigan", category: "衣物", image: "./works/05.webp", note: "今日穿搭主角已就位。" },
  { id: 6, title: "围巾｜不完全柏林围巾", category: "围巾", image: "./works/06.webp", note: "“不完全”才有玩家自定义的味道。" },
  { id: 7, title: "2025｜年度报告", category: "手作日记", image: "./works/07.webp", note: "2025 存档：今年也认真玩了毛线。" },
  { id: 8, title: "帽子｜钻石帽子 💎", category: "帽子", image: "./works/08.webp", note: "钻石纹理，闪亮属性 +8。" },
  { id: 9, title: "披肩｜小繁花披肩", category: "披肩", image: "./works/09.webp", note: "披肩展开，繁花地图加载完成。" },
  { id: 10, title: "披肩｜繁花披肩", category: "披肩", image: "./works/10.webp", note: "这件属于一看就想放大细节的类型。" },
  { id: 11, title: "披肩｜踏脚石披肩", category: "披肩", image: "./works/11.webp", note: "一针一格，稳稳推进任务进度。" },
  { id: 12, title: "披肩｜云蛟披肩", category: "披肩", image: "./works/12.webp", note: "云蛟登场，气场和柔软同时在线。" },
  { id: 13, title: "毛线店 💕", category: "手作日记", image: "./works/13.webp", note: "新地图：毛线店。快乐值直接拉满。" },
  { id: 14, title: "披肩｜安仁披肩", category: "披肩", image: "./works/14.webp", note: "低饱和配色，耐看属性很高。" },
  { id: 15, title: "围巾｜lace scarf 完工", category: "围巾", image: "./works/15.webp", note: "完工！成就徽章已点亮。" },
  { id: 16, title: "围巾｜lace scarf", category: "围巾", image: "./works/16.webp", note: "制作中的过程照也是珍贵存档。" },
  { id: 17, title: "围巾｜伊莉斯小围巾", category: "围巾", image: "./works/17.webp", note: "轻便小围巾，日常搭配万能道具。" },
  { id: 18, title: "毛衣｜华夫套衫", category: "衣物", image: "./works/18.webp", note: "华夫纹理密集，细节党狂喜。" },
  { id: 19, title: "围巾｜三角小围巾", category: "围巾", image: "./works/19.webp", note: "小三角围巾，轻量但很能打。" },
  { id: 20, title: "2024｜年度报告", category: "手作日记", image: "./works/20.webp", note: "2024 存档：手作支线越开越多。" },
  { id: 21, title: "披肩｜close to you", category: "披肩", image: "./works/21.webp", note: "名字很温柔，成品很有存在感。" },
  { id: 22, title: "袜子｜平平针 基础款", category: "小物", image: "./works/22.webp", note: "基础款袜子，实用技能点满。" },
  { id: 23, title: "pony 棒针", category: "手作日记", image: "./works/23.webp", note: "好工具到手，开工速度 +20%。" },
  { id: 24, title: "背心｜白色山脉", category: "衣物", image: "./works/24.webp", note: "白色山脉，清爽系主角装备。" },
  { id: 25, title: "哇～新线～", category: "手作日记", image: "./works/25.webp", note: "新线登场！ENFP 快乐小狗已上线。" },
  { id: 26, title: "背心｜白色山脉背心", category: "衣物", image: "./works/26.webp", note: "同系列再刷一次，属于真爱副本。" },
  { id: 27, title: "围巾｜misha and puff zig zag scarf", category: "围巾", image: "./works/27.webp", note: "锯齿纹像二次元片尾的节奏条。" },
  { id: 28, title: "芭贝毛线背心｜再来一件！", category: "衣物", image: "./works/28.webp", note: "“再来一件”就是最高级的好评。" },
  { id: 29, title: "背心｜横田古着背心", category: "衣物", image: "./works/29.webp", note: "古着感背心，复古属性加载成功。" },
  { id: 30, title: "帽子｜三国万里子帽子", category: "帽子", image: "./works/30.webp", note: "帽子完成，角色造型度 +19。" },
];

const filters = ["全部", "披肩", "围巾", "衣物", "帽子", "小物", "手作日记"] as const;

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [selected, setSelected] = useState<Work | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [letterOpen, setLetterOpen] = useState(false);
  const [wish, setWish] = useState<Work | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("mklql-keepsakes");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (!selected || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (selected.id - 1 + direction + works.length) % works.length;
      setSelected(works[next]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const visibleWorks = useMemo(
    () => (filter === "全部" ? works : works.filter((work) => work.category === filter)),
    [filter],
  );

  const toggleFavorite = (id: number) => {
    const next = favorites.includes(id)
      ? favorites.filter((favorite) => favorite !== id)
      : [...favorites, id];
    setFavorites(next);
    window.localStorage.setItem("mklql-keepsakes", JSON.stringify(next));
  };

  const drawWish = () => {
    const picked = works[Math.floor(Math.random() * works.length)];
    setWish(picked);
  };

  return (
    <main>
      <nav className="topbar" aria-label="作品集导航">
        <a className="brand" href="#top" aria-label="回到首页">
          <span className="brand-mark">针</span>
          <span>米开朗骑骡 · 手作冒险日志</span>
        </a>
        <div className="nav-links">
          <a href="#collection">作品图鉴</a>
          <a href="#wish">今日扭蛋</a>
          <button className="letter-link" onClick={() => setLetterOpen(true)}>好友留言</button>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="knit-orbit orbit-one" aria-hidden="true" />
        <div className="knit-orbit orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-stickers" aria-label="兴趣标签"><span>ENFP</span><span>快乐小狗</span><span>二次元浓度 ↑</span><span>手账选手</span></div>
          <p className="eyebrow">ENFP HANDMADE PLAYER · SAVE DATA 01</p>
          <h1>手作玩家的<br /><em>冒险日志。</em></h1>
          <p className="hero-intro">
            给我的 ENFP 快乐小狗朋友：<br />你的毛线宇宙，值得建一个专属存档。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#collection">打开作品图鉴 <span>↓</span></a>
            <button className="quiet-button" onClick={() => setLetterOpen(true)}>查看好友留言</button>
          </div>
        </div>
        <div className="hero-portrait" aria-label="创作者档案">
          <div className="portrait-frame">
            <img src="./avatar.webp" alt="米开朗骑骡的小红书头像" />
            <div className="stitched-corner">SAVE<br />DATA</div>
          </div>
          <div className="portrait-caption">
            <span className="caption-number">01 — 30</span>
            <p>Lv.30 手作玩家<br />今日灵感值 99%</p>
          </div>
        </div>
        <div className="scroll-note" aria-hidden="true"><span />继续冒险</div>
      </header>

      <section className="manifesto" aria-label="作品集序言">
        <p className="section-kicker">建站理由 · VERY SIMPLE</p>
        <blockquote>
          “朋友圈放不下 30 张图，<br />所以干脆做了一个网站。”
        </blockquote>
        <p className="manifesto-note">
          无煽情、无隐藏剧情，纯粹因为她真的很会织。<br />顺便把二次元、手账和快乐小狗能量一起装进来。
        </p>
      </section>

      <section className="collection" id="collection">
        <div className="collection-heading">
          <div>
            <p className="section-kicker">作品图鉴 · COMPLETE COLLECTION</p>
            <h2>已解锁作品，<br />请随意翻牌。</h2>
          </div>
          <div className="collection-meta">
            <strong>{String(visibleWorks.length).padStart(2, "0")}</strong>
            <span>件正在展出</span>
          </div>
        </div>

        <div className="filters" aria-label="按作品类型筛选">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="gallery">
          {visibleWorks.map((work, index) => (
            <article className={`work-card card-shift-${index % 3}`} key={work.id}>
              <button className="image-button" onClick={() => setSelected(work)} aria-label={`查看${work.title}`}>
                <img src={work.image} alt={work.title} loading="lazy" />
                <span className="view-cue">点击放大</span>
              </button>
              <div className="work-info">
                <div>
                  <span className="work-index">NO. {String(work.id).padStart(2, "0")}</span>
                  <h3>{work.title}</h3>
                  <p>{work.note}</p>
                </div>
                <button
                  className={`keep-button ${favorites.includes(work.id) ? "kept" : ""}`}
                  onClick={() => toggleFavorite(work.id)}
                  aria-label={favorites.includes(work.id) ? `取消珍藏${work.title}` : `珍藏${work.title}`}
                  title="把这一件留在心里"
                >
                  {favorites.includes(work.id) ? "♥" : "♡"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wish-section" id="wish">
        <div className="wish-copy">
          <p className="section-kicker light">今日扭蛋机 · LUCKY DRAW</p>
          <h2>抽一张<br />状态卡。</h2>
          <p>随机掉落一件作品和一句今日状态，抽到哪张都算 SSR。</p>
          <button className="draw-button" onClick={drawWish}>启动扭蛋 <span>✦</span></button>
        </div>
        <div className={`wish-card ${wish ? "revealed" : ""}`} aria-live="polite">
          {wish ? (
            <>
              <span className="wish-label">TODAY&apos;S HANDMADE SSR</span>
              <img src={wish.image} alt="" />
              <p>{wish.note}</p>
              <button onClick={() => setSelected(wish)}>看看这件作品 →</button>
            </>
          ) : (
            <>
              <div className="yarn-ball" aria-hidden="true"><span /></div>
              <p className="wish-placeholder">一张 SSR<br />正在毛线团里待机</p>
            </>
          )}
        </div>
      </section>

      <section className="care-section">
        <img src="./works/24.webp" alt="白色山脉背心作品细节" loading="lazy" />
        <div className="care-note">
          <span className="tape" aria-hidden="true" />
          <p className="handwritten">FRIEND OBSERVATION LOG</p>
          <h2>ENFP 快乐小狗型<br />手作玩家鉴定完毕。</h2>
          <div className="player-traits">
            <span>脑洞启动快</span><span>看到新线会开心</span>
            <span>手账装备齐全</span><span>开新坑行动力 MAX</span>
          </div>
          <p>结论：快乐值很高，作品也很能打。来自男性好友的认真整理，不含隐藏剧情。</p>
          <button onClick={() => setLetterOpen(true)}>查看好友留言 <span>→</span></button>
        </div>
      </section>

      <footer>
        <div>
          <p className="footer-title">米开朗骑骡 · 手作冒险日志</p>
          <p>毛线、手账、番剧，快乐支线全部开启。</p>
        </div>
        <div className="footer-right">
          <a href="https://www.xiaohongshu.com/user/profile/617cb389000000000201ea5b" target="_blank" rel="noreferrer">回到她的小红书主页 ↗</a>
          <p>仅作为送给创作者的非商业个人礼物<br />图片与作品归创作者本人所有</p>
        </div>
      </footer>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <button className="close-button" onClick={() => setSelected(null)} aria-label="关闭作品详情">×</button>
          <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-image"><img src={selected.image} alt={selected.title} /></div>
            <div className="lightbox-copy">
              <span>NO. {String(selected.id).padStart(2, "0")} · {selected.category}</span>
              <h2>{selected.title}</h2>
              <p>{selected.note}</p>
              <button className={`keep-large ${favorites.includes(selected.id) ? "kept" : ""}`} onClick={() => toggleFavorite(selected.id)}>
                {favorites.includes(selected.id) ? "♥ 已替你珍藏" : "♡ 替你珍藏这一件"}
              </button>
              <small>键盘 ← → 可以继续刷图鉴</small>
            </div>
          </div>
        </div>
      )}

      {letterOpen && (
        <div className="letter-overlay" role="dialog" aria-modal="true" aria-label="给米开朗骑骡的好友留言" onClick={() => setLetterOpen(false)}>
          <button className="close-button dark" onClick={() => setLetterOpen(false)} aria-label="关闭信件">×</button>
          <article className="letter-paper" onClick={(event) => event.stopPropagation()}>
            <span className="letter-date">好友留言 · 无煽情版</span>
            <h2>嗨，米开朗骑骡：</h2>
            <p>做这个网站的原因很简单：你的作品已经多到可以开图鉴，而且每一件都挺好看。用网页存档，比在聊天框里连发 30 张图酷一点。</p>
            <p>我把这里做成了二次元手账风，也塞进了一点 ENFP 快乐小狗设定。筛选、收藏、放大查看和随机扭蛋都安排上了，主打一个好玩、好翻、随时能看。</p>
            <p>以后有新作品就继续更新这个存档。祝你永远有新线可买、有灵感可记、追番不踩雷、手账不爆本，开多少新坑都能快乐收尾。</p>
            <p className="letter-end">总之，继续开心做喜欢的东西。<br />下一张作品卡，随时等你解锁。</p>
            <div className="signature">— 你的男性好友 / 本站临时管理员</div>
            <button className="fold-letter" onClick={() => setLetterOpen(false)}>关闭留言，继续刷图鉴</button>
          </article>
        </div>
      )}
    </main>
  );
}
