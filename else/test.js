
function getChildren(children,tag){
    // var children = oDivs.childNodes;//先把ele所有子节点获取到；

    for(var i=0;i<children.length;i++){ 做循环="" var="" node="children[i];" if(node.nodetype="=1){" 如果当前子元素的‘节点类型’是1，并且节点名称是tag值；="" tag.push(children[i]);="" 把子节点放到数组中；="" if="" (i="==" 71)="" {="" debugger;="" }="" (node.childnodes)="" getchildren(node.childnodes,="" tag);="" return="" tag;="" len="getChildren(document.getElementById('test').childNodes,[]);" 排序="" function="" getsort(a,b)="" a="" -="" b="" let="" testarr="[3,1,2,4," 6,="" 8]="" testarr.sort((a,="" b)=""> {
    return a - b;
});
// 二分查找
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length -1;
    while(left <= right)="" {="" let="" mid="Math.floor((left" +="" 2)="" if="" (arr[mid]="==" target)="" return="" mid;="" }="" else=""> target){
                right = mid - 1; 
        } else if(arr[mid] < target) {
            left = mid + 1;
        }
    }
    return -1;
}
// 寻找左侧边界的

function left_binarySearch(arr, target) {
    let left = 0;
    let right = arr.length;
    while(left < right) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) {
            right = mid
        } else if (arr[mid] > target){
                right = mid - 1; 
        } else if(arr[mid] < target) {
            left = mid + 1;
        }
    }
    return left;
}</=></children.length;i++){>