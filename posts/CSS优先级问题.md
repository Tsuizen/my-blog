---
slug: css-selector-priority
category: 前端
categorySlug: frontend
title: CSS选择器优先级问题
subtitle: ''
author: Tsuizen
description: 一直被网上流传的CSS选择器优先级按1000, 100，10，1划分误导，这种不科学的划分方式早该被辟谣了。
tags:
  - CSS
featureImage: ''
createdAt: 2022-05-13
updatedAt: 2022-05-13
draft: false
---

# 样式应用优先级比较
优先级从高到低依次为
1. 内联样式（例如```style=''font-weigth:bold''```）
2. id选择器（例如```#example```）
3. 类选择器（例如```.example```)，属性选择器（例如```[type="radio"]```）和伪类（例如```:hover```）
4. 类型选择器（例如```h1```）和伪元素（例如```::before```)
5. 通配选择符（```*```）关系选择符（例如```+```, ```>```, ```~```）对优先级没有影响

当一个样式声明中使用```!import```时，此声明将覆盖其他任何声明。
继承的样式永远比直接添加的样式优先级低，例如
```css
#parent {
  color: green;
}

h1 {
  color: purple;
}
```
当他应用在
```html
<html>
  <body id="parent">
    <h1>Here is a title!</h1>
  </body>
</html>
```
浏览器会将他渲染成紫色
<h1 style="color:purple">Here is a title!</h1>

# 多选择器权重的比较
网上流传以内联样式开始到通配符权重依次为1000，100，10，1，0，当多个选择器共同作用时将权值相加比较的做法在部分情况下可以生效但并不正确。
上述的0，1并不是十进制的0和1，也不是二进制，而是根据浏览器对权值和的具体计算方法决定的，例如在老版本的Firefox中权值实现方式如下：
![Alt text](../public/Posts/CSS%E4%BC%98%E5%85%88%E7%BA%A7/%E4%BC%98%E5%85%88%E7%BA%A7.png)
id和类选择器相差两个16进制，因此在老版本的Firefox中如果添加$16^2=256$个类选择器的权值要大于一个id选择器。
而按照css的意图，不同类型的选择器权重应该是相互隔离的。经过在新版的Edge，Safari上测试，上述现象已经不会发生。我电脑上没有其他浏览器，有兴趣的同学可以在其他浏览器上测试一下。
因此在计算优先级时严谨的做法是计算每个选择器的个数，个数大的优先级高，相同时再向下一级的选择器进行比较。例如下面的例子中字体颜色应该为orange
```css
.outer .inner p {

  color: orange;

}

.inner p {

  color: blue;

}
```

```html
<div class="outer">
  <div class="inner">
    <p>我是橘色</p>
  </div>
</div>
```
<p style="color: orange">我是橘色</p>