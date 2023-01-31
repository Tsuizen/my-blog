const SEO = {
  defaultTitle: "Tsuizen's blog",
  titleTemplate: '%s',
  description: 'Tsuizen的个人博客',
  canonical: 'https://blog.tsuizen.cn',
  robotsProps: {
    noarchive: false, // 不显示缓存链接
    nosnippet: false, // 不在搜索中显示文本片段
    maxSnippet: -1, // 值为-1谷歌会显示他认为最有效的文本片段长度
    notranslate: false, // 不在搜索结果中提供页面翻译
    noimageindex: false // 不要在此页面上为图像编制索引。如果不指定此值，页面上的图像可能会被编入索引并显示在搜索结果中。
  }
};

export default SEO;
