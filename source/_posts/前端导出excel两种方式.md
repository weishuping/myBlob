---
title: 前端导出excel两种方式
date: 2020-06-19 10:58:37
tags:
---
### 前端导出excel的几种方式
近期以来工作中遇到导出excel，我不知道选型哪种方式，所以总结一下。

#### 原生form方式
创建iframe和form，将参数绑定到input的value上，触发submit函数。
<!-- more -->
```
<div class="uploadForm">
        <iframe name="uploadIframe" style="display: none"></iframe>
        <form
            ref="form"
            :action="action"// 路径
            enctype="multipart/form-data"
            :method="method"// 请求方法 post  get
            name="download"
            target="uploadIframe">
            <slot/>
            <button ui="small" @click="submit" :disabled="disabled">
                {{downloadName}}
            </button>
        </form>
    </div>
```
优点：
get\post均支持，前端传参数是json格式
缺点：
不能支持对象，或者对象属性

#### base64字节流转换
创建blob对象，前端重新转义字节流。
```
    axios.post(url,
    data,
    {
        responseType: 'arraybuffer'
    })
    .then(function (res) {
        if (res.status !== 200) {
            return Promise.reject(res);
        }
        let blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
        });
        let objectUrl = URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download', fileName + '.xls');
        a.click();
        URL.revokeObjectURL(objectUrl);
        EventBus.$toast.success({
            message: '导出成功'
        });
    }).catch(res => {
        EventBus.$toast.error({
            message: res.message || '导出失败'
        });
    });
```
缺点：后缀为xls ，打开的时候不友好提示。更改为.xlsx