
function getChildren(children,tag){
    // var children = oDivs.childNodes;//先把ele所有子节点获取到；

    for(var i=0;i<children.length;i++){//做循环
        var node = children[i];
        if(node.nodeType==1){
            //如果当前子元素的‘节点类型’是1，并且节点名称是tag值；
            tag.push(children[i]);//把子节点放到数组中；
            if (i === 71) {
                debugger;
            }
            if (node.childNodes) {
                getChildren(node.childNodes, tag);
            }
        }
    }
    return tag;
}	
var len = getChildren(document.getElementById('test').childNodes,[]);
