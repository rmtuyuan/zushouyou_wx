// 提现
var wMoney = {
    init: function () {
        this.dataLoad();
        this.succFun();
        this.chkboxFun();
        this.clickBtn();
    },
    surplus: 0, //余额
    status: 1, //普通提现

    dataLoad: function () {
        var form2 = new FormData();
        form2.append("id", loginName); // 
        fetch("http://zushouyou.cn/Api/Index/wallet", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form2
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                wMoney.surplus = data.data.surplus;
                $(".money-box").html(data.data.surplus + "元");

            }
        });
    },
    succFun: function () {
        $(".withdraw-content input").keyup(function () {

            if ($(this).val().length > 0) {
                if ($(this).hasClass("money-input")) {
                    if ($(this).val() > wMoney.surplus) {
                        $(this).val(wMoney.surplus);
                    }
                }
                $(this).addClass("actived");
                $(this).css("color", "#333");

            } else {
                $(this).removeClass("actived");
                $(this).css("color", "#f00");
            }
        });
        $(".withdraw-content input").blur(function () {

            if ($(this).val().length > 0) {
                if ($(this).hasClass("money-input")) {
                    if ($(this).val() > wMoney.surplus) {
                        $(this).val(wMoney.surplus);
                    }
                }
                $(this).addClass("actived");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).css("color", "#f00");
            }
        });
    },
    chkboxFun: function () {
        //是否是快速提现
        $('.my-checkbox').change(function () {
            if ($(this).is(":checked")) {
                wMoney.status = 2;
            } else {
                wMoney.status = 1;
            }
        });
    },
    clickBtn: function () {
        //点击提交
        $(".withdraw-btn>a").click(function (e) {
            e.preventDefault();
            if ($(".withdraw-content input").length == $(".withdraw-content input.actived").length) {
                //都填了
                var form = new FormData();
                form.append("uid", loginName); //

                for (var i = 0; i < $(".withdraw-content input.actived").length; i++) {
                    var element = $($(".withdraw-content input.actived")[i]);
                    form.append(element.attr("name"), element.val()); //
                }

                fetch("http://zushouyou.cn/Api/Index/us_withdrawals", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    //console.log(data);
                    if (data.code == 200) {
                        $("body").addClass("overflow-hidden");

                        $(".modal-select").show();
                        setTimeout(function () {
                            $("body").removeClass("overflow-hidden");

                            $(".modal-select").hide();
                            window.location.href = 'user_center.html';
                        }, 1000);
                    }
                });

            } else {
                $(".withdraw-content input").css("color", "#f00");
                $(".withdraw-content input.actived").css("color", "#333");
            }
        });
    }
}


$(function () {
    wMoney.init();
    $(".withdraw-btn-box-chk>p>input").change(function () {
        if ($(this).is(":checked")) {
            $(this).siblings("i").addClass("active");
        } else {
            $(this).siblings("i").removeClass("active");
        }
    });
    //点击弹出模态框
    //  $(".withdraw-btn>a").click(function () {
    //     $("body").addClass("overflow-hidden");
    //     // $("." + $(this).data("class")).show().siblings("div").hide();
    //     $(".modal-select").show();
    // });
    //关闭模态框
    $(".close-modal").click(function () {
        $(this).parents(".modal-select").hide();
        $("body").removeClass("overflow-hidden");
    });

    //点击切换
    $(".withdraw-title>div").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $('.withdraw-btn-box-chk').addClass($(this).data("item")).removeClass($(this).siblings("div").data("item"));
    });
});