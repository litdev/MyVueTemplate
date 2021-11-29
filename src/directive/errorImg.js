/**
 * 检测图片是否存在
 * @param url
 */
 function imageIsExist(url) {
    return new Promise((resolve) => {
        var img = new Image();
        img.onload = function () {
            if (this.complete == true){
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
// 使用方法：<img :src="$const.Default_Error_Image" v-realImg="item.ImagePathUrl">
// :src为默认图，v-realImg为目标图
export const realImg = async function (el, binding) {
    let imgURL = binding.value;//获取图片地址
    if (imgURL) {
        let exist = await imageIsExist(imgURL);
        if (exist) {
            el.setAttribute('src', imgURL);
        }
    }
}

