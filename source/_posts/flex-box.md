---
title: Flex
date: 2019-05-28
tags: [css, flex]
description: 积极追求，拥抱变化
---
### Flex布局指北
 #### 基本概念
 Flex是Flexible Box的缩写，为弹性布局。
 `
    .box {
        display: flex;
        display: -webkit-flex;
    }
    .box1 {
        display: inline-flex;
    }
 `
 采用Flex布局的元素为Flex容器，默认有两个轴线：主轴（水平）、交叉轴（垂直）
Flex容器的所有子元素自动成为容器成员，称为Flex项目

##### 容器的属性

1：flex-direction 排列方向
`row row-reverse| column | column-reverse`
2: flex-wrap 换行方式
`no-wrap | wrap | wrap-reverse`
3:flex-flow 
是前两个属性的简写形式
4：justify-content 水平方向的对齐方式
`flex-start | flex-end | center | space-between[两端对齐、项目之间的间隔相等] | space-around[每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍]`
5：align-items 垂直方向的对齐方式[一行多个项目]
`flex-start | flex-end | center | baseline[第一行文字的基线] | strentch[如果项目为设置高度或auto,则占满整个高度]`
6：align-content 多根轴线[交叉轴]的对齐方式
`flex-start | flex-end | center | space-between | space-around | stretch`

##### 项目的属性

1：order 定义项目的排列顺序，数值越小，排列越靠前。默认0。
2：flex-grow 定义项目的放大比例。默认为0.
    `0表示如果有剩余空间，也不放大。如果所有项目flex_grow为1，则平分剩余空间。【2，1，1】前者占据空间比后面两个多一倍`
3：flex-shrink 定义项目的缩小比例。默认为1.
    `1表示空间不足，项目则缩小。【0，1，1，1】空间不足时，前者不缩小`
4：flex-basis属性
    `flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。默认值为auto.[浏览器就是根据这个属性来计算是否有多余空间]。如果设置px,则占据固定空间`
5：flex 是前三个属性的简写方式，默认值 0 1 auto
    `auto(1 1 auto) none(0 0 auto)`
6：align-self 单个项目的对齐方式
    `auto | flex-start | flex-end | center | baseline | strentch`