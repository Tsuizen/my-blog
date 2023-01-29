const Youtube = ({ videoId, aspectRatio = '16 / 9', autoPlay = false }) => {
  const src = `https://www.youtube.com/embed/${videoId}?&autoplay=${autoPlay}`;

  return (
    <>
      <iframe
        title="Youtube"
        src={src}
        className="relative w-full h-full"
        style={{ aspectRatio }}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </>
  );
};

export default Youtube;
