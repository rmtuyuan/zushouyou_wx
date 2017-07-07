//租用支付
var accountPay = {
    sid: null,
    commodity_id: null,
    init: function () {
        this.sid = $.getUrlParam("id");
        this.dataLoad();
        this.selectPayWay();
        this.clickBtn();
    },
    dataLoad: function () {
        //根据参数获取账号信息

        var form = new FormData();
        form.append("uid", loginName); // 
        form.append("id", accountPay.sid); // 
        fetch("http://zushouyou.cn/Api/Index/zy_pay", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
             console.log(data);
            if (data.code == 200) {
                //显示数据
                accountPay.commodity_id = data.data.commodity_id;
                $(".content-box>div.container").html(` <div class="content-box-item">
                <p>角色名称</p>
                <span>${data.data.name}</span>
            </div>
            <div class="content-box-item">
                <p>适配系统</p>
                <span>${data.data.system_id==3?"不限":data.data.system_id==2?"IOS":"Android"}</span>
            </div>
            <div class="content-box-item">
                <p>游戏信息</p>
                <span>${data.data.game_name}/${data.data.game_large_name}/${data.data.server_name}</span>
            </div>
            <div class="content-box-item">
                <p>租用套餐</p>
                <span>${data.data.hour} ${data.data.waste}元</span>
            </div>
            <div class="content-box-item">
                <p>上号方式</p>
                <span>${data.data.game_name==1?"明文账号密码":"上号器登录"}</span>
            </div>`);
            }
        })
    },
    selectPayWay: function () {
        //选择支付方式
        $(".pay-way-item input[type='radio']").change(function () {
            //console.log(221)
            if ($(this).is(":checked")) {

                $(this).parent("div").addClass("active").parents(".pay-way-item").siblings().find("div").removeClass("active");
            }
        });
    },
    clickBtn: function () {
        //点击立即支付
        $(".now-pay-btn").click(function (e) {
            e.preventDefault();
            var ua = navigator.userAgent.toLowerCase();

            if ($(".pay-way-item input:checked").hasClass("pay-ye")) {
                //余额支付
                var form = new FormData();
                var pay = 2;
                form.append("uid", loginName); // 
                form.append("pay", pay); //  
                form.append("commodity_id", accountPay.commodity_id); // 
                fetch("http://zushouyou.cn/Api/Index/order_wallet", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    //console.log(data);
                    if (data.code == 200) {
                        alert("余额支付成功");
                        //window.history.back();
                        window.location.href='my_orders.html';
                    } else {
                        alert("余额支付失败");
                    }
                });
            } else if ($(".pay-way-item input:checked").hasClass("pay-zfb")) {
                //支付宝支付
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    alert("微信浏览器不支持支付宝");
                } else {
                    var pay = 3;
                    var form = new FormData();
                    form.append("uid", loginName); // 
                    form.append("commodity_id", accountPay.commodity_id); //
                    form.append("pay", pay); //  
                    fetch("http://zushouyou.cn/Api/Index/phone_order", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                           
                        

                            window.location.href = `http://zushouyou.cn/Vendor/wappay/pay.php?ordername=${data.data.receive_name}&total_fee=${data.data.price}&attach=${data.data.subject}&trade_no=${data.data.orderid}`;
                        } else {
                            alert("支付宝支付失败");
                        }
                    });
                }

            } else if ($(".pay-way-item input:checked").hasClass("pay-wx")) {
                //微信支付
                var pay = 1;
                var form = new FormData();
                form.append("uid", loginName); //
                form.append("pay", pay); //   
                form.append("commodity_id", accountPay.commodity_id); // 
                fetch("http://zushouyou.cn/Api/Index/wxpay", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    //console.log(data);
                    if (data.code == 200) {
                       
                           window.location.href = `http://zushouyou.cn/Wxpay/example/jsapi.php?ordername=${data.data.receive_name}&total_fee=${data.data.price}&attach=${data.data.subject}&bianhao=${data.data.orderid}`;
                    } else {
                        alert("微信支付失败");
                    }
                });
            } else {
                //财付通支付
                var pay = 4;
                var form = new FormData();
                form.append("uid", loginName); // 
                form.append("pay", pay); //  
                form.append("commodity_id", accountPay.commodity_id); // 
                fetch("http://zushouyou.cn/Api/Index/order_wallet", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    //console.log(data);
                    if (data.code == 200) {
                        alert("财付通支付成功");
                        window.history.back();
                    } else {
                        alert("财付通支付失败");
                    }
                });
            }

        });
    }
};

$(function () {
    accountPay.init();
});