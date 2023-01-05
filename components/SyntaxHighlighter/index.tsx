/* eslint-disable react/jsx-key */
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwlLight';
import React, { ReactNode } from 'react';

type Children = ReactNode & {
  props: {
    children: string;
    className: string;
  };
};

type Props = {
  children: Children;
};

// 高亮代码组件
const SyntaxHighlighter: React.FC<Props> = ({ children }) => {
  const code = children.props.children;
  const language = children.props.className?.replace('language-', '').trim();

  if (!language) return <code>{children}</code>;

  return (
    <>
      <div className="relative bg-gray-100 top-4 pl-6 py-2 font-bold">
        {language}
      </div>
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </>
  );
};

export default SyntaxHighlighter;
