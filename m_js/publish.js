/**
 * Created by Administrator on 2017/6/8.
 */
var my_publish = {
    updataImgHt: null,
    //



    init: function () {
        this.ge_msg();
        this.dataLoad();
        this.wenDataLoad();
        this.ModalHide();
        this.ModalShow();
        this.authorization();
        this.selectChoice();
        
        this.commRadFun();
        this.chkFun();
        this.limitShow();
        this.conmitPublishBtn();
        this.wzCommRadFun();
        this.pubishModalSelect();
        this.updataImg();
        this.delUpdataImg();
        this.updataImgModal();
        this.imgToolsClose();
        this.imgToolsDel();
        this.nextStep();
        this.updataImgH();
    },
    shop_id: null, //游戏类型id
    system_id: null, //系统id
    game_id: null, //游戏id
    game_large_id: null, //大区id
    server_id: null, //服务器id
    lei_id: null, //类型id 通用 王者 球球 1球球2王者3通用

    server_data: null, //服务数据 根据大区变的 
    game_large_data: null, //大区数据
    game_data: null, //游戏列表
    ge_msg: function () {
        //个人信息加载
        var form = new FormData();
        form.append("uid", loginName); // 

        fetch("http://zushouyou.cn/Api/Index/ge", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                if(data.data.sesame_credit==1){
                    //未授权
                    $(".not-authorization").show()
                }else{
                     $(".red-authorization").show()
                }
                if (data.data.count == 1) {
                    $(".ipt-box .next-step").addClass("actived");
                    $(".ge-msg").html(` <div>尊敬的 <span>${data.data.nickname}</span> 您好 ${data.data.lever==1?"（您最多可发布账号数量为3个）":""}</div>
                    <div class="uesr-level-box">
                        您现在的级别是：${data.data.lever==1?'普通会员 ':"商家"} <a href="become_business.html">点击升级为商家</a>
                    </div>`);
                } else {
                    $(".ipt-box .next-step").removeClass("actived");
                }
            }
        });
    },
    dataLoad: function () {
        //加载数据 默认 
        //console.log(loginName)
        if (loginName) {
            var form = new FormData();
            form.append("shop_id", 0); // 
            //1 游戏类型
            fetch("http://zushouyou.cn/Api/Index/shop_list", {
                method: 'POST',
                //headers: myHeaders,
                mode: 'cors',
                cache: 'default'
                //  body: form
            }).then((response) => response.json()).then(function (data) {
            
                if (data.code == 200) {

                    var shop_html = ``;
                    for (var i = 0; i < data.data.length; i++) {
                        var element = data.data[i];
                        shop_html += `  <p data-id='${element.id}'>${element.name}</p>`;
                    }
                    $(".modal-select .modal-1").html(shop_html);
                }
            });
            this.dataLoadFun(form);
        }else{
            window.location.href='login.html';
        }




    },
    dataLoadFun: function (form) {
        //数据封装函数

        //2 游戏列表
        fetch("http://zushouyou.cn/Api/Index/game_list", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                var game_html = ``;
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    game_html += `  <p data-id='${element.id}' data-yid='${element.yid}'>${element.name}</p>`;
                }
                $(".modal-select .modal-2").html(game_html);
            }
        });
        //3 系统 写死了
        //4 大区
        fetch("http://zushouyou.cn/Api/Index/game_large", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data)
            if (data.code == 200) {
                my_publish.game_large_data = data.data;
                var game_large_html = ``;
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    game_large_html += `  <p data-id='${element.id}'>${element.name}</p>`;
                }
                $(".modal-select .modal-4").html(game_large_html);
            }
        });
        //5 服务器
        fetch("http://zushouyou.cn/Api/Index/server", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data)
            if (data.code == 200) {
                my_publish.server_data = data.data;
                var server_html = ``;
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    server_html += `  <p data-id='${element.id}'>${element.name}</p>`;
                }
                $(".modal-select .modal-5").html(server_html);
            }
        });
    },
    wenDataLoad: function () {
        //温馨提示内容加载
        fetch("http://zushouyou.cn/Api/index/wen", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',

        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                $(".wen-content").html(" <p>温馨提示 :</p>" + data.data.content)
            }
        });

    },
    authorization: function () {
        //判断是否授权

        var form = new FormData();
        form.append("uid", loginName); // 

        fetch("http://zushouyou.cn/Api/Index/grant", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {

            //
            if (data.data.sesame_credit == 2) {
                //已绑定
                $(".not-authorization").hide().siblings(".red-authorization").show();
            } else {
                //没绑定
                //点击授权
                $(".authorization-btn").click(function (e) {
                    e.preventDefault();
                    $(".not-authorization").show().siblings(".red-authorization").hide();
                    //跳转到芝麻信用
                    // $(this).parents(".not-authorization").hide().siblings(".red-authorization").show();

                });
            }
        })


    },
    ModalShow: function () {
        //点击弹出modal框
        $(".choice-item>div>span").click(function () {
            $("body").addClass("overflow-hidden");
            $("." + $(this).data("class")).show().siblings("div").hide();
            $(".modal-select").show();
        });
    },
    ModalHide: function () {
        //点击弹窗 关闭
        $(".close-modal").click(function () {
            $(this).parents(".modal-select").hide();
            $("body").removeClass("overflow-hidden");
        });
    },
    selectChoice: function () {
        //选择选项 关闭模态框  更新 文本
        $(".modal-content>div.choice-modal").on("click", "p", function () {
            //$(".modal-content>div.choice-modal>p").click(function () {
            var text = $(this).html();
            $(this).parents(".modal-select").hide();
            $("body").removeClass("overflow-hidden");
            //判断选择的是什么
            if ($(this).parent(".choice-modal").hasClass("shop-box")) {
                //选择游戏类型  手机还是pc
                my_publish.shop_id = $(this).data("id");
                var form = new FormData();

                form.append("shop_id", my_publish.shop_id); //
                my_publish.dataLoadFun(form);

            }
            if ($(this).parent(".choice-modal").hasClass("game-box")) {
                //选择游戏
                my_publish.game_id = $(this).data("id");
                //把游戏的类型获取到 是 通用还是什么
                my_publish.lei_id = $(this).data("yid");
                //  根据 id显示对应的大区
                var gl_html = ``;
                for (var i = 0; i < my_publish.game_large_data.length; i++) {

                    var element = my_publish.game_large_data[i];
                    if (my_publish.game_id == element.game_id) {
                        gl_html += `  <p data-id='${element.id}'>${element.name}</p>`;
                    }

                }
                $(".modal-select .modal-4").html(gl_html);
            }
            if ($(this).parent(".choice-modal").hasClass("system-box")) {
                //系统
                my_publish.system_id = $(this).data("id");


            }
            if ($(this).parent(".choice-modal").hasClass("gl-box")) {
                //大区
                my_publish.game_large_id = $(this).data("id");
                //  根据 id显示对应的服务器
                var server_html = ``;
                for (var i = 0; i < my_publish.server_data.length; i++) {

                    var element = my_publish.server_data[i];
                    if (my_publish.game_large_id == element.game_large_id) {
                        server_html += `  <p data-id='${element.id}'>${element.name}</p>`;
                    }

                }
                $(".modal-select .modal-5").html(server_html);

            }
            if ($(this).parent(".choice-modal").hasClass("server-box")) {
                //服务器
                my_publish.server_id = $(this).data("id");


            }

            $(".choice-item  span." + $(this).parent("div").data("item")).html(text).addClass("active").css("color", "#333");
        });
    },
    nextStep: function () {
        //点击下一步
        $(".next-step").click(function (e) {
            e.preventDefault();
        })
        $(".next-step.actived").click(function (e) {
            e.preventDefault();
            //满足添加 跳转
            if ($(".red-authorization .choice-item>div>span.active").length == 5) {
                //都选了
                $(".next-publish-step").find(".publish-content-" + my_publish.lei_id).show().addClass("actived");
                $(this).parents(".red-authorization").hide().siblings(".next-publish-step").show();
            } else {
                //有没选
                $(".red-authorization .choice-item>div>span").css("color", "#f00")
                $(".red-authorization .choice-item>div>span.active").css("color", "#333")
            }

        });
    },
    updataImgH: function () {
        //图片的高和宽设置一样
        var con_ow=$('.container').css("width");
        var ow = $(".img-box-con>div").css("width"); //上传图片的高
     
        var ow2 = 2 * parseFloat(ow.slice(0, -2))*.01 * parseFloat(con_ow.slice(0, -2)) + 30;
        
        $(".img-box-con").css("max-height", ow2);
           $(".img-box-con>div").css("height", parseFloat(ow.slice(0, -2))*.01 * parseFloat(con_ow.slice(0, -2)));
        this.updataImgHt = parseFloat(ow.slice(0, -2))*.01 * parseFloat(con_ow.slice(0, -2));
        //console.log( this.updataImgHt)
    },
    commRadFun: function () {
        //最下面单选按钮 动画效果
        $(".updata-limit .radio-box input[type='radio']").change(function () {
            if ($(this).is(":checked")) {
                $(this).siblings("span").addClass("active");
                $(this).parents(".radio-box").siblings(".radio-box").find("span").removeClass("active");
            } else {
                //$(this).siblings("span").removeClass("active");
            }
        });
    },
    wzCommRadFun: function () {
        //王者荣耀单选按钮
        $(".wz-limit-box .radio-box input[type='radio']").change(function () {
            if ($(this).is(":checked")) {
                $(this).siblings("span").addClass("active");
                $(this).parents(".radio-box").siblings(".radio-box").find("span").removeClass("active");
            } else {
                //$(this).siblings("span").removeClass("active");
            }
        });
    },
    limitShow: function () {
        //根据单选按钮 显示是否禁用
        $(".updata-limit .radio-box input[type='radio']").change(function () {
            if ($(this).hasClass("close-swith")) {
                $(".zuyong-count-box").removeClass("active").find("input").attr("disabled", "");
            } else {
                $(".zuyong-count-box").addClass("active").find("input").removeAttr("disabled");
            }
        });
    },
    chkFun: function () {
        //阅读协议checkbox
        $("#read_fabu_chk").change(function () {
            if ($(this).is(":checked")) {
                $(this).siblings("span").addClass("active");
            } else {
                $(this).siblings("span").removeClass("active");
            }
        });
    },

    //变量
    img_file: [],
    img_file_str: "", //图片字符串

    my_form: null, //表单数据
    img_ok: false,
    content_ok: false,
    money_ok: false,
    checkbox_ok: false,
    conmitPublishBtn: function () {
        //判断 input 有值没
        $(".next-publish-step input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).css("border-color", "#999").css("color", "#333");

            } else {
                $(this).removeClass("actived");
                $(this).css("border-color", "#f00");
            }
        });
        $(".next-publish-step input.p-close-swith").change(function () {
            if ($(this).is(":checked")) {
                $(this).attr("name", "pai").siblings("span").addClass("active").parents(".radio-box").siblings(".radio-box").find(".p-close-swith").removeAttr("name").removeAttr("checked").siblings("span").removeClass("active");
            }

        });
        $(".next-publish-step input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).css("border-color", "#999");
            } else {
                $(this).removeClass("actived");
                $(this).css("border-color", "#f00");
            }
        });
        $(".next-publish-step textarea").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).css("border-color", "#999");
            } else {
                $(this).removeClass("actived");
                $(this).css("border-color", "#f00");
            }
        });
        $(".next-publish-step textarea").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).css("border-color", "#999");
            } else {
                $(this).removeClass("actived");
                $(this).css("border-color", "#f00");
            }
        });

        //点击提交按钮 判断 全填了没   弹出弹窗
        $(".fabu-btn-item>a.submit-btn").click(function (e) {
            e.preventDefault();
            // console.log($(".publish-content-" + my_publish.lei_id + " .publish-form input").length);
            // console.log($(".publish-content-" + my_publish.lei_id + " .publish-form input.actived").length);


            if (my_publish.isCanconmit()) {
                //可以提交
                $("body").addClass("overflow-hidden");
                $("." + $(this).data("class")).show().siblings("div").hide();
                $(".modal-select").show();

                my_publish.my_form = new FormData();
                //my_publish.img_file_str= my_publish.img_file_str.slice(0,-1);
                //console.log( my_publish.img_file_str)
                my_publish.my_form.append("img", my_publish.img_file.join(",")); // 

                for (var i = 0; i < $(".publish-content-" + my_publish.lei_id + " .publish-form input.actived").length; i++) {
                    var element = $($(".publish-content-" + my_publish.lei_id + " .publish-form input.actived")[i]);
                    if (element.hasClass(".p-close-swith") && element.is(":checked")) {
                        element.attr("name", "pai").parents(".radio-box").siblings(".radio-box").find(".p-close-swith").removeAttr("name");
                    }
                    my_publish.my_form.append(element.attr("name"), element.val()); // 
                }
                for (var j = 0; j < $(".publish-content-" + my_publish.lei_id + " .publish-form textarea.actived").length; j++) {
                    var element = $($(".publish-content-" + my_publish.lei_id + " .publish-form textarea.actived")[j]);
                    my_publish.my_form.append(element.attr("name"), element.val()); // 
                }
                for (var x = 0; x < $(".updata-money input.actived").length; x++) {
                    var element = $($(".updata-money input.actived")[x]);
                    my_publish.my_form.append(element.attr("name"), element.val()); // 
                }
                my_publish.my_form.append("rent_no", 1);
                my_publish.my_form.append($(".zuyong-count").attr("name"), $(".zuyong-count").val()); // 


                my_publish.my_form.append("uid", loginName);
                my_publish.my_form.append("game_id", my_publish.game_id);
                my_publish.my_form.append("shop_id", my_publish.shop_id);
                my_publish.my_form.append("system_id", my_publish.system_id);
                my_publish.my_form.append("game_large_id", my_publish.game_large_id);
                my_publish.my_form.append("server_id", my_publish.server_id);


            }
            //console.log(my_publish.my_form)


            // if (($(".publish-content-" + my_publish.lei_id + " .publish-form input").length == $(".publish-content-" + my_publish.lei_id + " .publish-form input.actived").length) && ($(".publish-content-" + my_publish.lei_id + " .publish-form textarea").length == $(".publish-content-" + my_publish.lei_id + " .publish-form textarea.actived").length)) {
            //     // if ($(".publish-form input").length == $(".publish-form input.actived")) {
            //     //都填了
            //     alert("中间都填了");
            //     //判断图片和 下面钱全填了没
            //     if (my_publish.img_file.length > 0) {
            //         //图片选择了
            //         //判断钱选择没有
            //         if ($(".updata-money input").length == $(".updata-money input.actived").length) {
            //             //钱都填了
            //             alert("钱填了 ");
            //             //判断 协议勾选没有
            //             if ($("#read_fabu_chk").is(":checked")) {
            //                 //勾选了
            //                 alert("协议\勾选了  可以提交了");

            //             } else {
            //                 alert("协议没有勾选");

            //             }

            //         } else {
            //             //有点 钱没填
            //             alert("钱没填");
            //             $(".updata-money input").css("border-color", "#f00")
            //             $(".updata-money input.actived").css("border-color", "#999");
            //         }

            //     } else {
            //         //图片没选择
            //         alert("选择图片");
            //     }

            // } else {
            //     //没填
            //     alert("中间有没填了");

            // }




        });
    },
    isCanconmit: function () {
        //判断是否可以提交
        if (my_publish.img_file.length > 0) {
            //图片上传了
            my_publish.img_ok = true;
        } else {
            alert("图片没上传");

            my_publish.img_ok = false;
            return false;
        }
        if (($(".publish-content-" + my_publish.lei_id + " .publish-form input").length == $(".publish-content-" + my_publish.lei_id + " .publish-form input.actived").length) && ($(".publish-content-" + my_publish.lei_id + " .publish-form textarea").length == $(".publish-content-" + my_publish.lei_id + " .publish-form textarea.actived").length)) {
            //中间内容都填了

            my_publish.content_ok = true;
        } else {
            alert("账号信息没填完");
            my_publish.content_ok = false;
            $(".publish-form input").css("border-color", "#f00")
            $(".publish-form input.actived").css("border-color", "#999");
            $(".publish-form textarea").css("border-color", "#f00")
            $(".publish-form textarea.actived").css("border-color", "#999");
            return false;
        }
        if ($(".updata-money input").length == $(".updata-money input.actived").length) {
            //钱都填了

            my_publish.money_ok = true;
            $(".updata-money input.actived").css("color", "#333");
        } else {
            alert("钱没填了");
            my_publish.money_ok = false;
            $(".updata-money input").css("color", "#f00")
            $(".updata-money input.actived").css("color", "#333");
            return false;
        }
        if ($("#read_fabu_chk").is(":checked")) {
            //勾选了

            my_publish.checkbox_ok = true;
        } else {
            alert("没勾选了");
            my_publish.checkbox_ok = false;
            return false;
        }

        if (my_publish.checkbox_ok && my_publish.money_ok && my_publish.content_ok && my_publish.img_ok) {
            //都填了
            return true;
        } else {
            return false;
        }
    },
    pubishModalSelect: function () {
        //弹窗的确认发布 和 取消发布
        $(".other-modal-1>p>a").click(function (e) {
            e.preventDefault();
            if ($(this).hasClass("quit-publish")) {
                $(this).parents(".modal-select").hide();
                $("body").removeClass("overflow-hidden");
            } else {
                //确认发布  fetch
                fetch("http://zushouyou.cn/Api/index/release_tong", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: my_publish.my_form
                }).then((response) => response.json()).then(function (data) {
                    //console.log(my_publish.my_form);
                    if (data.code == 200) {
                        //跳转回首页
                        alert("发布成功")
                        window.location.href = `index.html`;
                    }
                })
            }
        });
    },
    updataImg: function () {
        //上传图片 显示图片
        $(".add-img-btn>input").change(function (e) {

            var imgPath = $(this).val();
            var imgUrl = window.URL.createObjectURL(this.files[0]);


            if (imgPath == "") {
                alert("请选择上传图片！");
                return;
            }
            //判断上传文件的后缀名
            var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
            if (strExtension != 'jpg' && strExtension != 'gif' &&
                strExtension != 'png' && strExtension != 'bmp' && strExtension != 'JPG' && strExtension != 'PNG') {
                alert("请选择图片文件");
                return;
            } else {

                var fileObj = this.files[0]; // 获取文件对象
                var form_2 = new FormData();
                form_2.append("img", fileObj);
                var xhr = new XMLHttpRequest();
                xhr.open("post", "http://zushouyou.cn/Api/index/img", true);
                xhr.onreadystatechange = function (data) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            //alert("成");
                            var json_1 = JSON.parse(data.currentTarget.responseText);
                            //console.log(json_1);

                            my_publish.img_file_str += json_1.data.simg + ",";

                            my_publish.img_file[my_publish.img_file.length] = json_1.data.simg;
                           // console.log(my_publish.img_file);
                            //$("#user_logo_file").siblings("img").attr("src", json_1.picurl);
                            // http://192.168.12.106:8080/photo20170616/35a7b57835ca4160885f861cbf926aa0.png
                        } else {
                            // alert("上传失败");
                            // console.log(data)
                        }
                    }
                };
                xhr.send(form_2);


                // my_publish.img_file[my_publish.img_file.length] = this.files[0];

                var div_html = `<div class="img-con" data-item=${my_publish.img_file.length-1} style="height:${my_publish.updataImgHt}px">
                              <div><img src="${imgUrl}" alt=""/></div>
                            <span class="del-img"></span>
                        </div>`;
                $(".add-img-btn").before(div_html);
            }

        });

    },

    delUpdataImg: function () {
        //删除图片 代理
        $(".img-box-con").on("click", "span.del-img", function () {
            my_publish.img_file.splice(parseInt($(this).parent(".img-con").data("item")), 1);
            $(this).parent(".img-con").remove();
            //删除

        });

    },
    updataImgModal: function () {
        //点击图片出来弹窗 显示原图 代理
        $(".img-box-con").on("click", ".img-con img", function () {
            var imgUrl = $(this).attr("src");
            $(this).parents(".img-con").addClass("active").siblings(".img-con").removeClass("active");
            //$("body").addClass("overflow-hidden");
            $('.img-container>img').attr("src", imgUrl);
            $(".big-img-modal").show();
        });
    },
    imgToolsClose: function () {
        //关闭 弹框
        $(".close-img-modal").click(function () {
            $(this).parents(".big-img-modal").hide();
            $("body").removeClass("overflow-hidden");
        });

    },
    imgToolsDel: function () {
        //删除图片 并关闭弹框
        $(".del-img-modal").click(function () {
            $(this).parents(".big-img-modal").hide();
            //$("body").removeClass("overflow-hidden");
            my_publish.img_file.splice(parseInt($(".img-con.active").data("item")), 1);

            $(".img-con.active").remove();
        });
    }

};
$(function () {
    my_publish.init();
});