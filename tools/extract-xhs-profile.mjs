const url = process.argv[2];

if (!url) {
  throw new Error("Usage: node tools/extract-xhs-profile.mjs <profile-url>");
}

const response = await fetch(url, {
  headers: { "user-agent": "Mozilla/5.0" },
});
const html = await response.text();
const match = html.match(/window\.__INITIAL_STATE__=(.*?)<\/script>/s);

if (!match) {
  throw new Error("Initial profile state was not found.");
}

const state = JSON.parse(match[1].replace(/\bundefined\b/g, "null"));
const info = state.user.userPageData.basicInfo;
const notes = (state.user.notes ?? []).flat().map((note) => {
  const card = note.noteCard ?? {};
  const image =
    (card.cover?.infoList ?? []).find(
      (item) => item.imageScene === "WB_DFT",
    ) ?? card.cover?.infoList?.[0];

  return {
    id: note.id,
    title: card.displayTitle,
    liked: card.interactInfo?.likedCount,
    cover: image?.url ?? card.cover?.url,
    width: card.cover?.width,
    height: card.cover?.height,
  };
});

console.log(
  JSON.stringify(
    {
      user: {
        nickname: info.nickname,
        redId: info.redId,
        avatar: info.imageb,
        description: info.desc,
      },
      notes,
    },
    null,
    2,
  ),
);
