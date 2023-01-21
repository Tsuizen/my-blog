/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://tsuizen.cn',
  changefreq: 'daily',
  priority: 1,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  // exclude: ['/protected-page', '/awesome/secret-page'],
  // alternateRefs: [
  //   {
  //     href: 'https://tsuizen.cn',
  //     hreflang: 'cn'
  //   }
  // ],
  // Default transformation function
  transform: async (config, path) => {
    const result = {
      loc: 'https://tsuizen.cn' + path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    };
    if (path.startsWith('/tag')) {
      result.priority = 0.6
    }
    if (path.startsWith('/posts')) {
      result.priority = 1
      this.changefreq = 'always'
    }
    if (path.startsWith('/category')) {
      result.priority = 0.4
    }
    if (path.startsWith('/archives')) {
      result.priority = 0.3
    }
    return result;
  },
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/additional-page')
  // ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      },
      {
        userAgent: 'test-bot',
        allow: ['/path', '/path-2']
      }
      // {
      //   userAgent: 'black-listed-bot',
      //   disallow: ['/sub-path-1', '/path-2']
      // }
    ],
    additionalSitemaps: []
  }
};
