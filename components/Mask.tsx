import { useClickAway } from 'ahooks';
import classnames from 'classnames';
import { FC, useRef } from 'react';

export interface MaskProps {
  show: boolean;
  toggleShow: any;
  className?: string;
  children: any;
}

const Mask: FC<MaskProps> = (props) => {
  const { children, className, toggleShow } = props;
  const targetRef = useRef(null);

  useClickAway(
    () => {
      toggleShow();
      console.log('click');
    },
    targetRef,
    ['mousedown', 'touchstart']
  );

  return (
    <>
      <div
        className={classnames(
          className,
          'z-50 opacity-100 w-screen h-screen flex flex-col justify-center items-center fixed top-0 left-0 bg-blue-50'
        )}
      >
        <div ref={targetRef}>{children}</div>
      </div>
    </>
  );
};

Mask.defaultProps = {
  className: ''
};

export default Mask;
