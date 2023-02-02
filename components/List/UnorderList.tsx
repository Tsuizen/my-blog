import classNames from 'classnames';

import ListProvider from './ListProvider';

const UnorderList: React.FC<JSX.IntrinsicElements['ul']> = (props) => {
  const { className = '', ...rest } = props;
  const isTaskList = className.includes('contains-task-list');
  return (
    <ListProvider type={isTaskList ? 'tl' : 'ul'}>
      <ul {...rest} className={classNames(className, 'my-6')} />
    </ListProvider>
  );
};

export default UnorderList;
