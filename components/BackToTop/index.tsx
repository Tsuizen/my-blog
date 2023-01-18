import { AiOutlineRocket } from 'react-icons/ai';

const BackToTop = () => {
  let timer: number;
  return (
    <div
      className="fixed right-10 bottom-10 cursor-pointer tooltip "
      data-tip="返回顶部"
      onClick={() => {
        cancelAnimationFrame(timer);
        //获取当前毫秒数
        const startTime = +new Date();
        //获取当前页面的滚动高度
        const b = document.body.scrollTop || document.documentElement.scrollTop;
        const d = 500;
        const c = b;
        timer = requestAnimationFrame(function func() {
          var t = d - Math.max(0, startTime - +new Date() + d);
          document.documentElement.scrollTop = document.body.scrollTop =
            (t * -c) / d + b;
          timer = requestAnimationFrame(func);
          if (t == d) {
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
