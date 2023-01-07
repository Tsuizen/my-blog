/* eslint-disable react/jsx-key */
import Highlight, { defaultProps } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import litghtTheme from 'prism-react-renderer/themes/nightOwlLight';
import React, { ReactNode } from 'react';

import { useThemeStore } from '@/store/store';

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
  const theme = useThemeStore((state) => state.theme);

  if (!language) return <code>{children}</code>;

  return (
    <>
      <div className="relative bg-base-300 top-4 pl-6 py-2 font-bold rounded-tl-md rounded-tr-md">
        {language}
      </div>
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={theme === 'light' ? litghtTheme : darkTheme}
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
