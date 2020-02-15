
// 保存条件
function saveModalData(i) {
    return new Promise((resolve, reject) => {
        console.log('i am promise', i);
        // 走api请求
        resolve(i);
    });
}
function hulkConfirm(index) {
    this.saveModalData(index).then((i) => {
        // editCondition
        console.log('editCondition over', i);
    });
}

// async function exe() {
//     for (let index = 0; index < 3; index++) {
//         await this.hulkConfirm(index);
//     }
// }


function coverHulk(i) {
    return new Promise((resolve, reject) => {
        console.log('cover hulk', i);
        this.hulkConfirm(i);
        resolve(i);
    });
}
async function exe() {
    for (let index = 0; index < 3; index++) {
        await this.coverHulk(index);
    }
}
