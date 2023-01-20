---
slug: buil-my-blog
category: 前端
categorySlug: frontend
title: 使用Next.js构建我的个人博客
subtitle: ''
author: Tsuizen
description: 身为码农怎么能没有自己的博客，本来打算在博客园写作，但是由于之前的整改风波，决定还是自己搭建，顺便可以练习技术以及督促自己更新🧐。
tags:
  - Next.js
  - 前端性能优化
featureImage: ''
createdAt: 2023-01-18
updatedAt: 2023-01-18
draft: false
---

## 技术选型

在技术选型的时候，我参考了很多前后端分离的博客系统，前端基本采用 CSR 的方式构建，虽然拥有良好的交互性，但是首屏加载性能堪忧，对于博客的阅读体验来说是很糟糕的。而就个人博客来说页面内容不经常改动，也不需要过于复杂的交互，于是服务端预构建成了我的首选项。

我的技术栈偏向于 React，因此 Nuxt.js 首先被排除在外，React 元框架 Gatsby, Next.js 以及 Remix，网上有很多对比，Remix 似乎是最佳选项，但由于其采用 stale-while-revalidate 缓存策略并且不支持 SSG 而对部署平台的要求较高，若我使用 Cloudflare 的 CDN 能否发挥其优势未知，加上目前 Remix 生态没有 Next.js 丰富，因此 Next.js 暂时成为了我的首选项。（先挖个坑，未来有时间或使用 Remix 进行重构
