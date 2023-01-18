import { AiOutlineRocket } from 'react-icons/ai';

const BackToTop = () => {
  let timer: number;
  return (
    <div
      className="fixed right-10 bottom-10 cursor-pointer tooltip"
      data-tip="返回顶部"
      onClick={() => {
        cancelAnimationFrame(timer);
        //获取当前毫秒数在·
        const startTime = +new Date();
        //获取当前页面的滚动高度
        const curHeight =
          document.body.scrollTop || document.documentElement.scrollTop;
        const maxTime = 500;
        timer = requestAnimationFrame(function func() {
          const diff =
            maxTime - Math.max(0, maxTime - (+new Date() - startTime));
          document.documentElement.scrollTop = document.body.scrollTop =
            curHeight - (diff * curHeight) / maxTime;
          timer = requestAnimationFrame(func);
          // 在顶部时
          if (diff === maxTime) {
            cancelAnimationFrame(timer);
          }
        });
      }}
    >
      <AiOutlineRocket className="text-4xl" />
    </div>
  );
};

export default BackToTop;
