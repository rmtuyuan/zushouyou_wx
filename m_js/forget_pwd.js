//忘记密码 完成后跳转到login


var forGet = {
    init: function () {
        this.forgetPhone();
        this.regGetPin();
        this.regPin();
        this.nextFun();
        this.forgetPwd1();
        this.forgetPwd2();
        this.forgetBtnFun();
    },
    phone_ok: false, //手机验证
    pin_ok: false, //验证码验证
    pin_code: null, //验证码值
    phone_val: null, //手机号值
    forgetPhone: function () {
        //手机号验证
        var phone_reg = /^1[34578]\d{9}$/;
        $("#forget_phone").blur(function () {
            var phone_val = $(this).val();
            if (!phone_reg.test(phone_val)) {
                $(this).siblings(".info-box").show().find("span").html("手机号格式不正确");
                forGet.phone_ok = false;
            } else {
                $(this).siblings(".info-box").hide();
                forGet.phone_ok = true;
            }
            forGet.nextSucc();

        });
        $("#forget_phone").keyup(function () {
            var phone_val = $(this).val();
            if (phone_val.length >= 11) {
                if (!phone_reg.test(phone_val)) {
                    $(this).siblings(".info-box").show().find("span").html("手机号格式不正确");
                    forGet.phone_ok = false;
                } else {
                    $(this).siblings(".info-box").hide();
                    forGet.phone_ok = true;
                }
                forGet.nextSucc();
            }
        });

    },

    nextSucc: function () {
        if (this.phone_ok && this.pin_ok) {
            $("#next_step").addClass("active");
        } else {
            $("#next_step").removeClass("active");
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
            if (forGet.phone_ok) {
                var form = new FormData();
                form.append("phone", $("#forget_phone").val()); // 文件对象
                fetch("http://zushouyou.cn/Api/Index/yzm2", {
                    method: 'POST',
                    //headers:{"Content-type": "application/json; charset=UTF-8" },
                    mode: 'cors',
                    // cache: 'no-cache',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    alert(data.data.code)
                    if (data.code == 200) {
                        forGet.phone_val = $("#forget_phone").val();
                        forGet.pin_code = data.data.code;
                        var time_num = 60;

                        $(".get-pin").removeClass("active");
                        $(".get-pin").html(time_num + "s");
                        var timer = setInterval(function () {
                            $(".get-pin").html(--time_num + "s");
                            if (time_num <= 0) {
                                clearInterval(timer);
                                timer = null;
                                forGet.pin_code = null;
                                $(".get-pin").addClass("active").html("获取验证码");
                            }
                        }, 1000);
                    } else {
                        $("#forget_phone").siblings(".info-box").show().find("span").html(data.message);
                    }

                });




            } else {
                $("#forget_phone").siblings(".info-box").show();
            }

        });
    },
    regPin: function () {
        // /验证码 
        $("#forget_pin").keyup(function () {
            if ($(this).val().length > 0) {
                if (($(this).val()) == forGet.pin_code) {
                    //forGet.pin_ok = true;
                    //$(this).siblings(".info-box").hide();
                } else {
                    forGet.pin_ok = false;
                    //$(this).siblings(".info-box").show().find("span").html("验证码不正确");
                }

                //$(this).siblings(".info-box").hide();
            } else {
                forGet.pin_ok = false;
                // $(this).siblings(".info-box").show();
            }
            forGet.nextSucc();
        });
        $("#forget_pin").blur(function () {
            if ($(this).val().length > 0) {
                if (($(this).val()) == forGet.pin_code) {
                    forGet.pin_ok = true;
                    $(this).siblings(".info-box").hide();
                } else {
                    forGet.pin_ok = false;
                    $(this).siblings(".info-box").show().find("span").html("验证码不正确");
                }

            } else {
                forGet.pin_ok = false;
                $(this).siblings(".info-box").show().find("span").html("验证码为空");
            }
            forGet.nextSucc();
        });
    },
    nextFun: function () {
        //点击下一步  代理
        $("#next_step").click(function (e) {
            e.preventDefault;
        });
        $(".next-step-box").on("click", "#next_step.active", function (e) {
            e.preventDefault;
            if (forGet.phone_val == $("#forget_phone").val()) {
                console.log(forGet.phone_val)
                $(this).parents(".form-login").hide().siblings("div.form-login").show();
            } else {
                //手机号和验证码不一致
                $("#forget_pin").siblings(".info-box").show().find("span").html("手机号和验证码不一致");
                $(this).removeClass("active");
            }
        });
    },
    forget_pwd_1: false,
    forget_pwd_2: false,
    //密码 
    pwdSucc: function () {
        if (this.forget_pwd_1 && this.forget_pwd_2) {
            $("#forget_btn").addClass("active");
        } else {
            $("#forget_btn").removeClass("active");
        }
    },
    forgetPwd1: function () {
        $("#forget_pwd_1").keyup(function () {
            if ($(this).val().length > 0) {
                forGet.forget_pwd_1 = true;
                //$(this).siblings(".info-box").hide();
            } else {
                forGet.forget_pwd_1 = false;
                // $(this).siblings(".info-box").show();
            }
            forGet.pwdSucc();
        });
        $("#forget_pwd_1").blur(function () {
            if ($(this).val().length > 0) {
                forGet.forget_pwd_1 = true;
                $(this).siblings(".info-box").hide();
            } else {
                forGet.forget_pwd_1 = false;
                $(this).siblings(".info-box").show().find("span").html("密码为空");
            }
            forGet.pwdSucc();
        });

    },
    forgetPwd2: function () {
        $("#forget_pwd_2").keyup(function () {
            if ($(this).val().length > 0) {
                if ($(this).val() == $("#forget_pwd_1").val()) {
                    forGet.forget_pwd_2 = true;
                } else {
                    forGet.forget_pwd_2 = false;
                }

                //$(this).siblings(".info-box").hide();
            } else {
                forGet.forget_pwd_2 = false;
                // $(this).siblings(".info-box").show();
            }
            forGet.pwdSucc();
        });
        $("#forget_pwd_2").blur(function () {
            if ($(this).val().length > 0) {
                if ($(this).val() == $("#forget_pwd_1").val()) {
                    forGet.forget_pwd_2 = true;
                    $(this).siblings(".info-box").hide();
                } else {
                    forGet.forget_pwd_2 = false;
                    $(this).siblings(".info-box").show().find("span").html("两次输入的不一致");
                }

            } else {
                forGet.forget_pwd_2 = false;
                $(this).siblings(".info-box").show().find("span").html("密码为空");
            }
            forGet.pwdSucc();
        });

    },
    forgetBtnFun: function () {
        //点击完成 代理
        $("#forget_btn").click(function (e) {
            e.preventDefault();
        });
        $(".next-step-box").on("click", "#forget_btn.active", function (e) {
            e.preventDefault();
            if ($("#forget_pwd_1").val() == $("#forget_pwd_2").val()) {
                //fetch
                var form = new FormData();
                form.append("phone", forGet.phone_val); // 文件对象
                form.append("password", $("#forget_pwd_1").val()); // 文件对象
                form.append("pass", $("#forget_pwd_2").val()); // 文件对象
                fetch("http://zushouyou.cn/Api/Index/forgetpass", {
                    method: 'POST',
                    //headers:{"Content-type": "application/json; charset=UTF-8" },
                    mode: 'cors',
                    // cache: 'no-cache',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    if (data.code == 200) {
                        //回到登录
                        alert("修改成功");

                        window.location.href = "login.html";
                    } else {
                        //没成功
                        $("#forget_btn").removeClass("active");
                        $("#forget_pwd_2").siblings(".info-box").show().find("span").html(data.message);
                    }

                })
            } else {
                $("#forget_pwd_2").siblings(".info-box").show().find("span").html("两次输入的不一致");
            }
        });

    }

}




//修改密码
var rePwd = {
    init: function () {
        //console.log(loginName)
        this.forgetPwd();
        this.forgetPwd1();
        this.forgetPwd2();
        this.forgetBtnFun();
    },
    re_pwd: false,
    re_pwd_1: false,
    re_pwd_2: false,
    //密码 
    reSucc: function () {
        if (this.re_pwd && this.re_pwd_1 && this.re_pwd_2) {
            $("#re_pwd_btn").addClass("active");
        } else {
            $("#re_pwd_btn").removeClass("active");
        }
    },
    forgetPwd: function () {
        $("#re_pwd").keyup(function () {
            if ($(this).val().length > 0) {
                rePwd.re_pwd = true;
                //$(this).siblings(".info-box").hide();
            } else {
                rePwd.re_pwd = false;
                // $(this).siblings(".info-box").show();
            }
            rePwd.reSucc();
        });
        $("#re_pwd").blur(function () {
            if ($(this).val().length > 0) {
                rePwd.re_pwd = true;
                $(this).siblings(".info-box").hide();
            } else {
                rePwd.re_pwd = false;
                $(this).siblings(".info-box").show().find("span").html("密码为空");
            }
            rePwd.reSucc();
        });

    },
    forgetPwd1: function () {
        $("#re_pwd_1").keyup(function () {
            if ($(this).val().length > 0) {
                rePwd.re_pwd_1 = true;
                //$(this).siblings(".info-box").hide();
            } else {
                rePwd.re_pwd_1 = false;
                // $(this).siblings(".info-box").show();
            }
            rePwd.reSucc();
        });
        $("#re_pwd_1").blur(function () {
            if ($(this).val().length > 0) {
                rePwd.re_pwd_1 = true;
                $(this).siblings(".info-box").hide();
            } else {
                rePwd.re_pwd_1 = false;
                $(this).siblings(".info-box").show().find("span").html("新密码为空");
            }
            rePwd.reSucc();
        });

    },
    forgetPwd2: function () {
        $("#re_pwd_2").keyup(function () {
            if ($(this).val().length > 0) {
                if ($(this).val() == $("#re_pwd_1").val()) {
                    rePwd.re_pwd_2 = true;
                } else {
                    rePwd.re_pwd_2 = false;
                }

                //$(this).siblings(".info-box").hide();
            } else {
                rePwd.re_pwd_2 = false;
                // $(this).siblings(".info-box").show();
            }
            rePwd.reSucc();
        });
        $("#re_pwd_2").blur(function () {
            if ($(this).val().length > 0) {
                if ($(this).val() == $("#re_pwd_1").val()) {
                    rePwd.re_pwd_2 = true;
                    $(this).siblings(".info-box").hide();
                } else {
                    rePwd.re_pwd_2 = false;
                    $(this).siblings(".info-box").show().find("span").html("两次输入的不一致");
                }

            } else {
                rePwd.re_pwd_2 = false;
                $(this).siblings(".info-box").show().find("span").html("密码为空");
            }
            rePwd.reSucc();
        });

    },
    forgetBtnFun: function () {
        //点击完成 代理
        $("#re_pwd_btn").click(function (e) {
            e.preventDefault();
        });
        $(".next-step-box").on("click", "#re_pwd_btn.active", function (e) {
            e.preventDefault();
            if ($("#re_pwd_2").val() == $("#re_pwd_1").val()) {
                //fetch
                var form = new FormData();
                form.append("id", loginName); // 文件对象
                form.append("fpass",  $("#re_pwd").val()); // 文件对象
                form.append("password", $("#re_pwd_1").val()); // 文件对象
                form.append("pass", $("#re_pwd_2").val()); // 文件对象
                fetch("http://zushouyou.cn/Api/Index/passedit", {
                    method: 'POST',
                    //headers:{"Content-type": "application/json; charset=UTF-8" },
                    mode: 'cors',
                    // cache: 'no-cache',
                    body: form
                }).then((response) => response.json()).then(function (data) {
                    console.log(data)
                    if (data.code == 200) {
                        //回到登录
                        alert("修改成功");
                        $.cookie(cookie_name,'');//清空cookie
                        window.location.href = "login.html";
                    }else if(data.code == 400){
                            $("#re_pwd_btn").removeClass("active");
                        $("#re_pwd").siblings(".info-box").show().find("span").html(data.message);
                    }
                     else {
                        //没成功
                        $("#re_pwd_btn").removeClass("active");
                        $("#re_pwd_2").siblings(".info-box").show().find("span").html(data.message);
                    }

                })
            } else {
                $("#re_pwd_2").siblings(".info-box").show().find("span").html("两次输入的不一致");
            }
        });

    }
}
$(function () { 
forGet.init();
rePwd.init();

})
