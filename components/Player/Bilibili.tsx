const Bilibili = ({ bvid, aspectRatio = '16/9' }) => {
  const src = `https://player.bilibili.com/player.html?aid=350930056&bvid=${bvid}&cid=983353902&page=1`;
  return (
    <iframe
      src={src}
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className="relative w-full h-full"
      style={{ aspectRatio }}
    ></iframe>
  );
};

export default Bilibili;
