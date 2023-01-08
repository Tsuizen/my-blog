import { useEffect, useState } from 'react';

// SSG 页面初始会给build时的html，rehydrate不会重新渲染页面，通过useEffect在页面mounted后再更新页面
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#some-problematic-code-1
const useMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export default useMounted;
