import { checkIsLogin } from "@/utils/common";


// 自定义组件，登录后元素可见
export const hasLogin = {
    inserted(el, binding, vnode) {
        if (!checkIsLogin()) {
            el.parentNode.removeChild(el);
        }
    }
}