import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

import { EXCEPTION_POST } from '../config/code';
import getDB from '../db/prisma';

async function getRecentPosts(start = 0) {
  const db = getDB();
  if (!db) {
    console.error('获取数据库实例失败！');
    return [];
  }

  const metas = await db.posts.findMany({
    where: {
      category: { in: ['博客', '编译', '研究'] }
    },

    orderBy: {
      id: 'desc'
    },

    skip: start,

    take: 5,

    select: {
      title: true,
      description: true,
      slug: true,
      category: true,
      categorySlug: true,
      author: true,
      tags: true,
      featureImage: true,
      featureImageWidth: true,
      featureImageHeight: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return metas.map((v) => {
    return {
      ...v
    };
  });
}

export default async function recentpost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 请求方法校验
  if (req.method !== 'POST') {
    return res.status(200).json({
      ...EXCEPTION_POST.METHOD_FAILED,
      result: {
        posts: []
      }
    });
  } else {
    // 请求参数校验
    const submitSchema = Joi.object({
      count: Joi.number().integer().positive(),
      lastSlug: Joi.number().integer()
    });

    const { error, value } = submitSchema.validate(JSON.parse(req.body));

    if (error) {
      console.log(error);
      return res.status(200).json({
        ...EXCEPTION_POST.VALIDATE_FAILED
      });
    }

    // 数据查询
    const recentPosts = await getRecentPosts(value.count);
    console.log('recent', recentPosts);
    res.status(200).json({
      code: 0,
      msg: ''
    });
  }
}
