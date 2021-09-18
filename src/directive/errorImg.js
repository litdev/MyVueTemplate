/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
    return new Promise((resolve) => {
        var img = new Image();
        img.onload = function () {
            if (this.complete == true) {
                resolve(true);
                img = null;
            }
        }
        img.onerror = function () {
            resolve(false);
            img = null;
        }
        img.src = url;
    })
}

//默认图片地址
const defaultImgUrl = require('@/assets/images/default-image.png');

export const errorImg = async function (el, binding) {
    let imgUrl = el.src;
    let exists = await imageIsExist(imgUrl);
    if (!exists) {
        el.setAttribute('src',defaultImgUrl);
    }
}

