---
title: css+html基础篇
date: 2020-07-01 11:30:01
tags: CSS继承 HTML元素
---
####  可继承属性：
1. 字体相关: font-size font-family等;
2. 文本相关: line-height、text-indent：文本缩进、text-align：文本水平对齐、color;
3. 元素可见性：visibility
4. 列表布局属性：list-style-type等
5. 光标属性
6. 页面属性：page等
7. 声音样式

#### 无继承性的属性
1. display
2. 文本属性：vertical-aligh、 text-decoration、text-shadow
3. 盒模型属性：w h mar padding border ...
4. 背景属性：background等
5. 定位属性：float、top、right、bottom、left、overflow等
6. 轮廓属性：outline
7. 页面样式：size、page-break-before
8. 声音样式：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during
   
#### 所有元素可继承属性
visibility cursor

#### 内联元素可继承属性
1. 字体系列属性
2. 除text-indent text-align之外的文本系列属性

#### 块级元素可继承属性
text-indent、text-align

#### 特殊
父元素下的设置了href的a标签不会继承父级color，因为a:-webkit-any-link: color: -webkit-link;

#### 其他
text-align在css2.1中，具有继承性。应用于块、表格单元格和行内块元素，仅对于行内元素生效。

#### 属性值计算过程
1. 确定声明值:  在开发者样式表里面和浏览器样式表里面,把没有冲突的属性值,作为该元素的属性值
2. 层叠冲突:    对样式表里面有冲突的声明,使用这个层叠规则,确定这个属性值
3. 使用继承:    对仍然没有属性值的属性,若可以继承的话,继承该父元素的值
4. 使用默认的值: 最后一步的话,对仍然没有熟悉值的属性,使用默认的属性值;

#### 块状元素
前后均有换行符、可设置margin/padding/宽高独占一行
div table form h1-h6 li ol p ul / nav aside header footer section 
#### 行内元素
与其他元素处于同一行，仅左右padding和左右margin生效，不可设置宽高，不能嵌套块级元素
a b br input img label select textarea 

#### HTML5

