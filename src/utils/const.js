/**
 * 全局静态常量
 */

exports.install = function (Vue, options) {
    //账户名，只能数字、字母、下划线组成
    const RegEx_AccountName = /^[a-zA-Z0-9_]*$/;
    //数字
    const RegEx_Number = /^\d+$/;

    //是不是有效的手机号
    const RegEx_CellPhone = /^1[3456789]\\d{9}$/;

    //是不是有效的金额，不允许为负
    const RegEx_Money = /^0|(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/;

    //是不是有效的金额，允许为负
    const RegEx_MoneyMinus = /^-?(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,4})))$/;

    //是否为邮箱
    const RegEx_Email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    //是否为身份证号码
    const RegEx_IdNo = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    
    //时间选择器
    const DataPickShortcuts = {
        shortcuts: [
            {
                text: "今天",
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: "昨天",
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            // {
            //     text: "前天",
            //     onClick(picker) {
            //         const end = new Date();
            //         const start = new Date();
            //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
            //         end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
            //         picker.$emit("pick", [start, end]);
            //     },
            // },
            {
                text: "最近三天",
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: "最近一周",
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: "最近一个月",
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: "最近三个月",
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: "最近半年",
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: "最近一年",
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

    //必须放到最后面,调用方式：this.$const.MyConst
    Vue.prototype.$const = {
        RegEx_AccountName,
        RegEx_Number,
        RegEx_CellPhone,
        RegEx_Email,
        RegEx_IdNo,
        RegEx_Money,
        RegEx_MoneyMinus,
        DataPickShortcuts,
    }
}