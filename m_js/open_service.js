var openService = {
    init: function () {

        this.dataLoad();
        this.selectPayWay();
        this.clickBtn();
        //this.selectPayContent();
    },
    osid: null,
    osid_ok: false,
    dataLoad: function () {
        //根据参数获取账号信息

        // var form = new FormData();
        // form.append("uid", loginName); // 
        // form.append("id", accountPay.sid); // 
        fetch("http://zushouyou.cn/Api/Index/shang", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default'
            // body: form
        }).then((response) => response.json()).then(function (data) {
            // console.log(data);
            if (data.code == 200) {
                //显示数据
                var html = '';
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    html += `<div class="pay-way-item pay-wx ">
                    <p> <span> ${element.long}天  ${element.money}元</span></p>
                    <div class="">
                        <input type="radio" data-id='${element.id}'  name="pay-cont" />
                    </div>
                </div>`;

                }
                $(".open-service-money").html(html);
            }
        })
    },
    selectPayWay: function () {
        //选择支付方式
        $(".pay-way-box").on("change", ".pay-way-item input[type='radio']", function () {
            // $(".pay-way-item input[type='radio']").change(function () {
            //console.log(221)
            if ($(this).is(":checked")) {
                if ($(this).parents(".container").hasClass("open-service-money")) {
                    openService.osid = $(this).data("id");

                    openService.osid_ok = true;
                }
                $(this).parent("div").addClass("active").parents(".pay-way-item").siblings().find("div").removeClass("active");
            }
        });
    },

    selectPayContent: function () {
        //选择支付方式
        $(".pay-way-box").on("change", ".pay-way-item input[type='radio']", function () {
            // $(".pay-way-item input[type='radio']").change(function () {
            //console.log(221)
            if ($(this).is(":checked")) {
                if ($(this).parents(".container").hasClass("open-service-money")) {
                    openService.osid = $(this).data("id");
                    openService.osid_ok = true;
                }
                $(this).parent("div").addClass("active").parents(".pay-way-item").siblings().find("div").removeClass("active");
            }
        });
    },
    clickBtn: function () {
        //点击立即支付
        $(".now-pay-btn").click(function (e) {
            e.preventDefault();

            if (openService.osid_ok) {

                if ($(".pay-way-select .pay-way-item input:checked").hasClass("pay-ye")) {
                    //余额支付
                    var form = new FormData();
                    form.append("uid", loginName); // 
                    form.append("id", openService.osid); // 
                    form.append("state", 3); // 
                    fetch("http://zushouyou.cn/Api/Index/txt_wallet", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                            alert("余额支付成功");
                            window.location.href = 'user_center.html';
                        } else {
                            alert("余额支付失败");
                        }
                    });
                } else if ($(".pay-way-select .pay-way-item input:checked").hasClass("pay-zfb")) {
                    //支付宝支付
                    var form = new FormData();
                    form.append("uid", loginName); // 
                    form.append("id", openService.osid); // 
                    form.append("state", 3); // 
                    fetch("http://zushouyou.cn/Api/Index/txt_wallet", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                            alert("支付宝支付成功");
                            window.location.href = 'user_center.html';
                        } else {
                            alert("支付宝支付失败");
                        }
                    });
                } else if ($(".pay-way-select .pay-way-item input:checked").hasClass("pay-wx")) {
                    //微信支付
                    var form = new FormData();
                    form.append("uid", loginName); // 
                    form.append("id", openService.osid); // 
                    form.append("state", 3); // 
                    fetch("http://zushouyou.cn/Api/Index/txt_wallet", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                            alert("微信支付成功");
                            window.location.href = 'user_center.html';
                        } else {
                            alert("微信支付失败");
                        }
                    });
                } else {
                    //财付通支付
                    var form = new FormData();
                    form.append("uid", loginName); // 
                    form.append("id", openService.osid); // 
                    form.append("state", 3); // 
                    fetch("http://zushouyou.cn/Api/Index/txt_wallet", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                            alert("财付通支付成功");
                            window.location.href = 'user_center.html';
                        } else {
                            alert("财付通支付失败");
                        }
                    });
                }

            }


        });
    }
};

$(function () {
    openService.init();
})