/**
 * 通用工具类
 */
import storage from "@/utils/storage";

const defaultSettings = require('../settings.js')
const TokenKey = defaultSettings.tokenName || 'AccessToken'

/**
 * 判断是否已经登录
 */
export function checkIsLogin() {
    return storage.cookie.get(TokenKey) ? true : false;
}

/**
 * 
 * @returns 获取token
 */
export function getToken() {
    return storage.cookie.get(TokenKey);
}

/**
 * 设置登录的token
 * @param {String} token 
 */
export function setToken(token) {
    storage.cookie.set(TokenKey, token);
}

/**
 * 移除登录token
 */
export function removeToken() {
    storage.cookie.remove(TokenKey);
}

/**
 * 格式化数字
 * @param {number}  = [111] 数字
 * @return {Number}
 */
export function formatNumber(number) {
    return isNaN(number) ? 0 : Number(number);
}

/**
 * 格式化没有分隔符的日期
 * @param {String} date 20210201/151027/20210201151027
 * @returns DateTime
 */
export function formatNoSepDate(date) {
    if (!date) return '';
    let len = date.length;
    if (len == 8) {
        //20210201
        return insertStr(insertStr(date, 4, '-'), 7, '-');
    } else if (len == 6) {
        //151027
        return insertStr(insertStr(date, 2, ':'), 5, ':');
    } else if (len == 14) {
        //20210201151027
        return insertStr(insertStr(insertStr(insertStr(insertStr(date, 4, '-'), 7, '-'), 10, ' '), 13, ':'), 16, ':');
    } else if (len == 15) {
        return insertStr(insertStr(insertStr(insertStr(date, 4, '-'), 7, '-'), 13, ':'), 16, ':');
    } else {
        return date;
    }
}
function insertStr(soure, start, newStr) {
    return soure.slice(0, start) + newStr + soure.slice(start);
}

/**
 * 计算时间查
 * @param {String} startTime 开始时间
 * @param {String} endTime 结束时间
 * @param {String} action 取值类别 ad=总天数,ah=总小时,am=总分钟,as=总秒,ms=总毫秒
 * @returns {Int} 差值 
 */
export function diffDateTime(startTime, endTime, action) {
    if (!startTime || !endTime || !action) {
        return 0;
    }
    if (typeof (startTime) === 'string') {
        startTime = new Date(startTime.replace(/-/g, "/"));
    }
    if (typeof (endTime) === 'string') {
        endTime = new Date(endTime.replace(/-/g, "/"));
    }
    //总毫秒数
    let totalMillisecond = endTime.getTime() - startTime.getTime();
    //总秒数
    let totalSecond = Math.floor(totalMillisecond / 1000);
    //总分钟
    let totalMinute = Math.floor(totalMillisecond / (1000 * 60));
    //总小时
    let totalHour = Math.floor(totalMillisecond / (1000 * 60 * 60));
    //总天数
    let totalDay = Math.floor(totalMillisecond / (1000 * 60 * 60 * 24));
    switch (action) {
        case 'ms'://总毫秒
            return totalMillisecond;
        case 'as'://总秒
            return totalSecond;
        case 'am'://总分钟
            return totalMinute;
        case 'ah'://总小时
            return totalHour;
        case 'ad'://总天数
            return totalDay;
        default:
            return 0;
    }
}

/**
 * 格式化时间
 * @param {dateObj}  = [2021-02-02 23:23:23] 源字符串
 * @param {fmt}  = [yyyy-MM-dd EE HH:mm:ss] 格式,EE是周几
 * @return {string} 
 */
export function formatDate(dateObj, fmt) {
    let date;
    if ((typeof dateObj == 'string') && dateObj.constructor == String) {
        dateObj = dateObj.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/')
        if (dateObj.indexOf(".") > 0) dateObj = dateObj.slice(0, dateObj.indexOf("."))
        date = new Date(dateObj);
    } else if (Date.parse(dateObj)) {
        date = dateObj
    } else {
        return ""
    }
    var o = {
        "M+": date.getMonth() + 1, //月份         
        "d+": date.getDate(), //日         
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
        "H+": date.getHours(), //小时         
        "m+": date.getMinutes(), //分         
        "s+": date.getSeconds(), //秒         
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
        "S": date.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") +
            week[date.getDay().toString() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k].toString()) : (("00" + o[k]
                .toString()).substr(("" + o[k].toString()).length)));
        }
    }
    return fmt;
};

/**
 * 格式化金额，默认保留两位小数，并格式化为千分位
 * @param {number}  = [123] 要格式化的数字
 * @param {decimals}  = [2] 保留几位小数
 * @param {dec_point}  = [.] 小数点符号
 * @param {thousands_sep}  = [,] 千分位符号
 * @param {roundtag}  = [ceil] 四舍五入参数，默认 "ceil" 向上取,"floor"向下取,"round" 
 * @return {string}
 * */
export function formatMoney(number, decimals, dec_point, thousands_sep, roundtag) {
    if (!number) {
        number = 0;
    }
    if (!decimals) {
        decimals = 2; //默认保留2位小数
    }
    if (!dec_point) {
        dec_point = '.';
    }
    if (!thousands_sep) {
        thousands_sep = ',';
    }
    if (!roundtag) {
        roundtag = 'round';
    }
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    roundtag = roundtag || "ceil"; //"ceil","floor","round"
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {

            var k = Math.pow(10, prec);

            return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec *
                2)) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};

// exports.install = function (Vue, options) {

//     /**
//      * 判断是否已经登录
//      */
//     const checkIsLogin = function () {
//         var user = require("@/utils/user")
//         return user.hasToken();
//     }
//     /**
//      * 格式化数字
//      * @param {number}  = [111] 数字
//      * @return {Number}
//      */
//     const formatNumber = function (number) {
//         return isNaN(number) ? 0 : Number(number);
//     }

//     /**
//      * 格式化没有分隔符的日期
//      * @param {String} date 20210201/151027/20210201151027
//      * @returns DateTime
//      */
//     const formatNoSepDate = function (date) {
//         if (!date) return '';
//         let len = date.length;
//         if (len == 8) {
//             //20210201
//             return insertStr(insertStr(date, 4, '-'), 7, '-');
//         } else if (len == 6) {
//             //151027
//             return insertStr(insertStr(date, 2, ':'), 5, ':');
//         } else if (len == 14) {
//             //20210201151027
//             return insertStr(insertStr(insertStr(insertStr(insertStr(date, 4, '-'), 7, '-'), 10, ' '), 13, ':'), 16, ':');
//         } else if (len == 15) {
//             return insertStr(insertStr(insertStr(insertStr(date, 4, '-'), 7, '-'), 13, ':'), 16, ':');
//         } else {
//             return date;
//         }
//     }
//     const insertStr = function (soure, start, newStr) {
//         return soure.slice(0, start) + newStr + soure.slice(start);
//     }

//     /**
//      * 计算时间查
//      * @param {String} startTime 开始时间
//      * @param {String} endTime 结束时间
//      * @param {String} action 取值类别 ad=总天数,ah=总小时,am=总分钟,as=总秒,ms=总毫秒
//      * @returns {Int} 差值 
//      */
//     const diffDateTime = function (startTime, endTime, action) {
//         if (!startTime || !endTime || !action) {
//             return 0;
//         }
//         if (typeof (startTime) === 'string') {
//             startTime = new Date(startTime.replace(/-/g, "/"));
//         }
//         if (typeof (endTime) === 'string') {
//             endTime = new Date(endTime.replace(/-/g, "/"));
//         }
//         //总毫秒数
//         let totalMillisecond = endTime.getTime() - startTime.getTime();
//         //总秒数
//         let totalSecond = Math.floor(totalMillisecond / 1000);
//         //总分钟
//         let totalMinute = Math.floor(totalMillisecond / (1000 * 60));
//         //总小时
//         let totalHour = Math.floor(totalMillisecond / (1000 * 60 * 60));
//         //总天数
//         let totalDay = Math.floor(totalMillisecond / (1000 * 60 * 60 * 24));
//         switch (action) {
//             case 'ms'://总毫秒
//                 return totalMillisecond;
//             case 'as'://总秒
//                 return totalSecond;
//             case 'am'://总分钟
//                 return totalMinute;
//             case 'ah'://总小时
//                 return totalHour;
//             case 'ad'://总天数
//                 return totalDay;
//             default:
//                 return 0;
//         }
//     }

//     /**
//      * 格式化时间
//      * @param {dateObj}  = [2021-02-02 23:23:23] 源字符串
//      * @param {fmt}  = [yyyy-MM-dd EE HH:mm:ss] 格式,EE是周几
//      * @return {string} 
//      */
//     const formatDate = function (dateObj, fmt) {
//         let date;
//         if ((typeof dateObj == 'string') && dateObj.constructor == String) {
//             dateObj = dateObj.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/')
//             if (dateObj.indexOf(".") > 0) dateObj = dateObj.slice(0, dateObj.indexOf("."))
//             date = new Date(dateObj);
//         } else if (Date.parse(dateObj)) {
//             date = dateObj
//         } else {
//             return ""
//         }
//         var o = {
//             "M+": date.getMonth() + 1, //月份         
//             "d+": date.getDate(), //日         
//             "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
//             "H+": date.getHours(), //小时         
//             "m+": date.getMinutes(), //分         
//             "s+": date.getSeconds(), //秒         
//             "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
//             "S": date.getMilliseconds() //毫秒         
//         };
//         var week = {
//             "0": "日",
//             "1": "一",
//             "2": "二",
//             "3": "三",
//             "4": "四",
//             "5": "五",
//             "6": "六"
//         };
//         if (/(y+)/.test(fmt)) {
//             fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString() + "").substr(4 - RegExp.$1.length));
//         }
//         if (/(E+)/.test(fmt)) {
//             fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") +
//                 week[date.getDay().toString() + ""]);
//         }
//         for (var k in o) {
//             if (new RegExp("(" + k + ")").test(fmt)) {
//                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k].toString()) : (("00" + o[k]
//                     .toString()).substr(("" + o[k].toString()).length)));
//             }
//         }
//         return fmt;
//     };

//     /**
//      * 格式化金额，默认保留两位小数，并格式化为千分位
//      * @param {number}  = [123] 要格式化的数字
//      * @param {decimals}  = [2] 保留几位小数
//      * @param {dec_point}  = [.] 小数点符号
//      * @param {thousands_sep}  = [,] 千分位符号
//      * @param {roundtag}  = [ceil] 四舍五入参数，默认 "ceil" 向上取,"floor"向下取,"round" 
//      * @return {string}
//      * */
//     const formatMoney = function (number, decimals, dec_point, thousands_sep, roundtag) {
//         if (!number) {
//             number = 0;
//         }
//         if (!decimals) {
//             decimals = 2; //默认保留2位小数
//         }
//         if (!dec_point) {
//             dec_point = '.';
//         }
//         if (!thousands_sep) {
//             thousands_sep = ',';
//         }
//         if (!roundtag) {
//             roundtag = 'round';
//         }
//         number = (number + '').replace(/[^0-9+-Ee.]/g, '');
//         roundtag = roundtag || "ceil"; //"ceil","floor","round"
//         var n = !isFinite(+number) ? 0 : +number,
//             prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
//             sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
//             dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
//             s = '',
//             toFixedFix = function (n, prec) {

//                 var k = Math.pow(10, prec);

//                 return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec *
//                     2)) / k;
//             };
//         s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
//         var re = /(-?\d+)(\d{3})/;
//         while (re.test(s[0])) {
//             s[0] = s[0].replace(re, "$1" + sep + "$2");
//         }

//         if ((s[1] || '').length < prec) {
//             s[1] = s[1] || '';
//             s[1] += new Array(prec - s[1].length + 1).join('0');
//         }
//         return s.join(dec);
//     };

//     //必须放到最后面,调用方式：this.$func.formatNumber('12');
//     Vue.prototype.$func = {
//         checkIsLogin,
//         formatNumber,
//         formatNoSepDate,
//         diffDateTime,
//         formatDate,
//         formatMoney,
//     }
// }

// 使用
// import publicFunc from "./utils/common";
// Vue.use(publicFunc);