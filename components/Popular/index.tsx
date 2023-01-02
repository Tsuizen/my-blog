import classnames from 'classnames';

const Popular = ({ className }: { className: string }) => {
  return (
    <section
      className={classnames(
        className,
        'mx-4 px-6 text-accent text-lg font-bold'
      )}
    >
      最流行
    </section>
  );
};

export default Popular;
