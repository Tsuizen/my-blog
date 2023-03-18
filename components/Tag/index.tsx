import classNames from 'classnames';
import Link from 'next/link';

interface TagsInfo {
  name: string;
  postsNum: number;
}

interface Props {
  className: string;
  tags: TagsInfo[];
}

const Tag: React.FC<Props> = (props) => {
  const { className, tags } = props;

  return (
    <div className={classNames(className, 'mx-4 px-6 sticky top-20')}>
      <div className="text-lg text-purple-400 font-bold">标签</div>
      <div className="mt-6">
        {tags.map((tag) => (
          <span key={tag.name} className="inline-block m-2">
            <Link
              href={`/tag/${tag.name}`}
              className="text-md text-base-content font-bold hover:text-primary"
            >
              #{tag.name}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tag;
