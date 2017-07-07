//注册
var regist = {
    init: function () {
        //this.chkFun();
        this.regPhone();
        this.regGetPin();
        this.regPin();
        this.regPwd();
        // this.chkFun();
        this.regBtnClick();
    },
    phone_reg_ok: false, //手机号
    pwd_reg_ok: false, //密码
    pin_reg_ok: false, //验证码
   
    pin_code: null, //验证码值
    phone_val: null, //手机号值
    regPhone: function () {
        //手机号验证
        var phone_reg = /^1[34578]\d{9}$/;
        $("#reg_phone").blur(function () {
            var phone_val = $(this).val();
            if (!phone_reg.test(phone_val)) {
                $(this).siblings(".info-box").show().find("span").html("手机号格式不正确");
                regist.phone_reg_ok = false;
            } else {
                $(this).siblings(".info-box").hide();
                regist.phone_reg_ok = true;
            }
            regist.regSucc();

        });
        $("#reg_phone").keyup(function () {
            var phone_val = $(this).val();
            if (phone_val.length >= 11) {
                if (!phone_reg.test(phone_val)) {
                    $(this).siblings(".info-box").show().find("span").html("手机号格式不正确");
                    regist.phone_reg_ok = false;
                } else {
                    $(this).siblings(".info-box").hide();
                    regist.phone_reg_ok = true;
                }
                regist.regSucc();
            }
        });
    },
    regSucc: function () {
        if (this.phone_reg_ok && this.pwd_reg_ok && this.pin_reg_ok ) {
            $("#reg_btn").addClass("active");
        } else {
            $("#reg_btn").removeClass("active");
        }
    },
    regGetPin: function () {
        //获取验证码
        $(".get-pin").click(function (e) {
            e.preventDefault();
        })
        $(".my-form-group").on("click", ".get-pin.active", function (e) {
            // $(".get-pin.active").click(function (e) {
             
            e.preventDefault();
            if (regist.phone_reg_ok) {

                var form = new FormData();


                form.append("phone", $("#reg_phone").val()); // 文件对象
                fetch("http://zushouyou.cn/Api/Index/yzm1", {
                    method: 'POST',
                    //headers:{"Content-type": "application/json; charset=UTF-8" },
                    mode: 'cors',
                    // cache: 'no-cache',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    alert(data.data.code)
                    if (data.code == 200) {
                        regist.pin_code = data.data.code;
                        regist.phone_val = $("#reg_phone").val();
                        var time_num = 60;

                        $(".get-pin").removeClass("active");
                        $(".get-pin").html(time_num + "s");
                        var timer = setInterval(function () {
                            $(".get-pin").html(--time_num + "s");
                            if (time_num <= 0) {
                                clearInterval(timer);
                                timer = null;
                                regist.pin_code = null;
                                $(".get-pin").addClass("active").html("获取验证码");
                            }
                        }, 1000);
                    } else {
                        $("#reg_phone").siblings(".info-box").show().find("span").html(data.message);
                    }

                });




            } else {
                $("#reg_phone").siblings(".info-box").show();
            }

        });
    },
    regPin: function () {
        // /验证码 没验证
        $("#reg_pin").keyup(function () {
            if ($(this).val().length > 0) {
                if (($(this).val()) == regist.pin_code) {
                    //regist.pin_reg_ok = true;
                    //$(this).siblings(".info-box").hide();
                } else {
                    regist.pin_reg_ok = false;
                    //$(this).siblings(".info-box").show().find("span").html("验证码不正确");
                }

                //$(this).siblings(".info-box").hide();
            } else {
                regist.pin_reg_ok = false;
                // $(this).siblings(".info-box").show();
            }
            regist.regSucc();
        });
        $("#reg_pin").blur(function () {
            if ($(this).val().length > 0) {
                if (($(this).val()) == regist.pin_code) {
                    regist.pin_reg_ok = true;
                    $(this).siblings(".info-box").hide();
                } else {
                    regist.pin_reg_ok = false;
                    $(this).siblings(".info-box").show().find("span").html("验证码不正确");
                }

            } else {
                regist.pin_reg_ok = false;
                $(this).siblings(".info-box").show().find("span").html("验证码为空");
            }
            regist.regSucc();
        });
    },
    regPwd: function () {
        $("#reg_pwd").keyup(function () {
            if ($(this).val().length > 0) {
            
                //$(this).siblings(".info-box").hide();
                 if ($(this).val().length > 6) {
                    regist.pwd_reg_ok = true;
                   // $(this).siblings(".info-box").hide();
                } else {
                    regist.pwd_reg_ok = false;
                    //$(this).siblings(".info-box").show().find("span").html("密码小于6位");
                }

            } else {
                regist.pwd_reg_ok = false;
                // $(this).siblings(".info-box").show();
            }
            regist.regSucc();
        });
        $("#reg_pwd").blur(function () {
            if ($(this).val().length > 0) {
                if ($(this).val().length > 6) {
                    regist.pwd_reg_ok = true;
                    $(this).siblings(".info-box").hide();
                } else {
                    regist.pwd_reg_ok = false;
                    $(this).siblings(".info-box").show().find("span").html("密码小于6位");
                }

            } else {
                regist.pwd_reg_ok = false;
                $(this).siblings(".info-box").show().find("span").html("密码为空");
            }
            regist.regSucc();
        });

    },
   
    regBtnClick: function () {
        //点击注册按钮
        $("#reg_btn").click(function (e) {
            e.preventDefault();
        });
        $(".form-login").on("click", "#reg_btn.active", function (e) {
            // $("#reg_btn.active").click(function (e) {

            e.preventDefault();
            if (regist.phone_val == $("#reg_phone").val()) {
                var form = new FormData();
                form.append("phone", $("#reg_phone").val()); // 
                form.append("password", $("#reg_pwd").val()); // 
                form.append("code", $("#reg_pin").val()); // 
                  form.append("uid",loginName); // 
                fetch("http://zushouyou.cn/Api/index/bind_mobile", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    alert("绑定成功")
                    console.log(data)
                    if (data.code == 200) {
                        location.href=document.referrer;
                       // window.location.href = "http://192.168.3.120/zushouyou_new/login.html";
                    } else {
                        $("#reg_btn").removeClass("active");
                        $("#reg_pwd").siblings(".info-box").show().find("span").html(data.message);
                    }

                })
            } else {
                $("#reg_pwd").siblings(".info-box").show().find("span").html('手机号和验证码不一致');
            }


        });
    }
};

$(function () {

    regist.init();
});