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
  { id: 1, title: "教程｜意式单螺纹 管状收针（准备针）", category: "手作日记", image: "./works/01.webp", note: "愿意把会的东西分享出去，也是一种温柔。" },
  { id: 2, title: "围巾｜小繁花三角巾", category: "围巾", image: "./works/02.webp", note: "一小片繁花，被妥帖地留在颈间。" },
  { id: 3, title: "小物｜手帐收纳袋", category: "小物", image: "./works/03.webp", note: "连零碎的日常，也值得被认真安放。" },
  { id: 4, title: "小物｜杯垫", category: "小物", image: "./works/04.webp", note: "小小一件，也有被认真对待的光。" },
  { id: 5, title: "毛衣｜Sophie’s cardigan", category: "衣物", image: "./works/05.webp", note: "把长久的耐心，织成可以穿在身上的温柔。" },
  { id: 6, title: "围巾｜不完全柏林围巾", category: "围巾", image: "./works/06.webp", note: "不完全也很好，它有只属于你的节奏。" },
  { id: 7, title: "2025｜年度报告", category: "手作日记", image: "./works/07.webp", note: "原来一年真的可以被织成看得见的样子。" },
  { id: 8, title: "帽子｜钻石帽子 💎", category: "帽子", image: "./works/08.webp", note: "细节闪闪发亮，俏皮得刚刚好。" },
  { id: 9, title: "披肩｜小繁花披肩", category: "披肩", image: "./works/09.webp", note: "像把一整片花期，安静地披在肩上。" },
  { id: 10, title: "披肩｜繁花披肩", category: "披肩", image: "./works/10.webp", note: "花会谢，但你织出的这一季不会。" },
  { id: 11, title: "披肩｜踏脚石披肩", category: "披肩", image: "./works/11.webp", note: "一针接着一针，就是抵达喜欢的方式。" },
  { id: 12, title: "披肩｜云蛟披肩", category: "披肩", image: "./works/12.webp", note: "柔软里也藏着很有力量的纹路。" },
  { id: 13, title: "毛线店 💕", category: "手作日记", image: "./works/13.webp", note: "看到喜欢的线，就像提前遇见下一件作品。" },
  { id: 14, title: "披肩｜安仁披肩", category: "披肩", image: "./works/14.webp", note: "安静、松弛，又有自己的分寸。" },
  { id: 15, title: "围巾｜lace scarf 完工", category: "围巾", image: "./works/15.webp", note: "完成的那一刻，耐心终于有了形状。" },
  { id: 16, title: "围巾｜lace scarf", category: "围巾", image: "./works/16.webp", note: "还在路上的作品，也一样值得记录。" },
  { id: 17, title: "围巾｜伊莉斯小围巾", category: "围巾", image: "./works/17.webp", note: "给普通的一天，加一点轻盈的仪式感。" },
  { id: 18, title: "毛衣｜华夫套衫", category: "衣物", image: "./works/18.webp", note: "每一格纹理，都收好了一点时间。" },
  { id: 19, title: "围巾｜三角小围巾", category: "围巾", image: "./works/19.webp", note: "小小的暖意，刚好够拥抱日常。" },
  { id: 20, title: "2024｜年度报告", category: "手作日记", image: "./works/20.webp", note: "回头看，走过的路已经开满了作品。" },
  { id: 21, title: "披肩｜close to you", category: "披肩", image: "./works/21.webp", note: "就像名字一样，是一份靠近时才懂的柔软。" },
  { id: 22, title: "袜子｜平平针 基础款", category: "小物", image: "./works/22.webp", note: "最基础的针法，也能织出踏实的喜欢。" },
  { id: 23, title: "pony 棒针", category: "手作日记", image: "./works/23.webp", note: "好用的工具，是手作人悄悄珍惜的伙伴。" },
  { id: 24, title: "背心｜白色山脉", category: "衣物", image: "./works/24.webp", note: "清澈的白色里，藏着起伏的山脉。" },
  { id: 25, title: "哇～新线～", category: "手作日记", image: "./works/25.webp", note: "对新线的开心，是下一次创造的序章。" },
  { id: 26, title: "背心｜白色山脉背心", category: "衣物", image: "./works/26.webp", note: "柔软也可以有清晰、坚定的轮廓。" },
  { id: 27, title: "围巾｜misha and puff zig zag scarf", category: "围巾", image: "./works/27.webp", note: "跳跃的纹路，把好心情也织了进去。" },
  { id: 28, title: "芭贝毛线背心｜再来一件！", category: "衣物", image: "./works/28.webp", note: "真正喜欢的事，当然值得再来一次。" },
  { id: 29, title: "背心｜横田古着背心", category: "衣物", image: "./works/29.webp", note: "旧时光的味道，被新的双手轻轻接住。" },
  { id: 30, title: "帽子｜三国万里子帽子", category: "帽子", image: "./works/30.webp", note: "一顶帽子，也能有鲜明可爱的性格。" },
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
          <span>米开朗骑骡 · 手作档案</span>
        </a>
        <div className="nav-links">
          <a href="#collection">作品</a>
          <a href="#wish">今日手作签</a>
          <button className="letter-link" onClick={() => setLetterOpen(true)}>给你的话</button>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="knit-orbit orbit-one" aria-hidden="true" />
        <div className="knit-orbit orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">A SMALL ARCHIVE OF HANDMADE WARMTH</p>
          <h1>把时间，<br /><em>织成温柔。</em></h1>
          <p className="hero-intro">
            给米开朗骑骡：你认真对待每一针，<br />我也想认真收藏每一份闪光。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#collection">开始翻阅 <span>↓</span></a>
            <button className="quiet-button" onClick={() => setLetterOpen(true)}>先读一封信</button>
          </div>
        </div>
        <div className="hero-portrait" aria-label="创作者档案">
          <div className="portrait-frame">
            <img src="./avatar.webp" alt="米开朗骑骡的小红书头像" />
            <div className="stitched-corner">made<br />with care</div>
          </div>
          <div className="portrait-caption">
            <span className="caption-number">01 — 30</span>
            <p>30 个公开手作片段<br />和数不清的耐心</p>
          </div>
        </div>
        <div className="scroll-note" aria-hidden="true"><span />慢慢往下看</div>
      </header>

      <section className="manifesto" aria-label="作品集序言">
        <p className="section-kicker">写在前面</p>
        <blockquote>
          “编织很像把看不见的时间，<br />变成一件可以触摸的东西。”
        </blockquote>
        <p className="manifesto-note">
          这里没有销量和排名，只有每一次起针、拆线、重来与完成。<br />我想让这些散落在日常里的作品，有一个可以随时回来的地方。
        </p>
      </section>

      <section className="collection" id="collection">
        <div className="collection-heading">
          <div>
            <p className="section-kicker">作品档案 · THE COLLECTION</p>
            <h2>一针一线，<br />都有自己的故事。</h2>
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
                <span className="view-cue">轻触细看</span>
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
          <p className="section-kicker light">今天，线团想对你说</p>
          <h2>抽一张<br />手作签。</h2>
          <p>每一次点开，都是从你的作品里随机挑出的一句小小鼓励。</p>
          <button className="draw-button" onClick={drawWish}>轻轻抽一张 <span>✦</span></button>
        </div>
        <div className={`wish-card ${wish ? "revealed" : ""}`} aria-live="polite">
          {wish ? (
            <>
              <span className="wish-label">TODAY&apos;S WARM NOTE</span>
              <img src={wish.image} alt="" />
              <p>{wish.note}</p>
              <button onClick={() => setSelected(wish)}>看看这件作品 →</button>
            </>
          ) : (
            <>
              <div className="yarn-ball" aria-hidden="true"><span /></div>
              <p className="wish-placeholder">有一句话<br />正在一团毛线里等你</p>
            </>
          )}
        </div>
      </section>

      <section className="care-section">
        <img src="./works/24.webp" alt="白色山脉背心作品细节" loading="lazy" />
        <div className="care-note">
          <span className="tape" aria-hidden="true" />
          <p className="handwritten">To 米开朗骑骡</p>
          <h2>愿你一直做<br />让自己开心的事。</h2>
          <p>
            不必赶，不必和谁比较。你喜欢的颜色、你反复琢磨的针法、
            你完成时那一点小小的得意，都很值得。
          </p>
          <button onClick={() => setLetterOpen(true)}>打开完整的信 <span>→</span></button>
        </div>
      </section>

      <footer>
        <div>
          <p className="footer-title">米开朗骑骡 · 手作档案</p>
          <p>把喜欢的事，慢慢做很久。</p>
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
              <small>键盘 ← → 可以继续翻阅</small>
            </div>
          </div>
        </div>
      )}

      {letterOpen && (
        <div className="letter-overlay" role="dialog" aria-modal="true" aria-label="给米开朗骑骡的一封信" onClick={() => setLetterOpen(false)}>
          <button className="close-button dark" onClick={() => setLetterOpen(false)} aria-label="关闭信件">×</button>
          <article className="letter-paper" onClick={(event) => event.stopPropagation()}>
            <span className="letter-date">写给认真生活的你</span>
            <h2>亲爱的米开朗骑骡：</h2>
            <p>我做这个小网站，不是想把你的作品变得多么“正式”，而是想告诉你：那些被你一针一线认真完成的小东西，也值得被认真收藏。</p>
            <p>我很喜欢看你做自己喜欢的事。看一团线慢慢有了形状，看你把耐心藏进纹理里，也看见你在一次次完成中，成为更自在、更闪亮的自己。</p>
            <p>谢谢你让我知道，时间原来可以被织成柔软的样子。希望以后，你仍然可以不慌不忙地做很多喜欢的作品；而我也很幸运，能一直看见、一直为你鼓掌。</p>
            <p className="letter-end">愿你的生活永远有线可织，有梦可做，<br />也一直有人珍惜你的认真。</p>
            <div className="signature">— 一个把你的作品放在心上的朋友</div>
            <button className="fold-letter" onClick={() => setLetterOpen(false)}>把信轻轻收好</button>
          </article>
        </div>
      )}
    </main>
  );
}
