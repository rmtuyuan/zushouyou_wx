var rePublish = {
    updataImgHt: null,
    //


    shop_id: null, //游戏类型id
    system_id: null, //系统id
    game_id: null, //游戏id
    game_large_id: null, //大区id
    server_id: null, //服务器id
    lei_id: null, //类型id 通用 王者 球球 1球球2王者3通用

    server_data: null, //服务数据 根据大区变的 
    game_large_data: null, //大区数据
    game_data: null, //游戏列表

    fabu_id: null, //发布 id
    type_id: null, //type  是删除 还是 关闭
    leaseid: null, // 是 2审核中修改 是修改其他
    init: function () {
        this.lei_id = $.getUrlParam("lei");
        //console.log(this.lei_id)
        this.fabu_id = $.getUrlParam("id");
        this.type_id = $.getUrlParam("type");
        this.leaseid = $.getUrlParam("leaseid");

        this.dataLoad();
        //this.ge_msg();
        //this.dataLoad();
        // this.wenDataLoad();
        this.ModalHide();
        this.ModalShow();
        //this.authorization();
        //this.selectChoice();
        this.updataImgH();
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
        this.delPublish();
        this.closePublish();
        // this.nextStep();
    },
    //变量
    img_file: [],
    img_file_str: "", //图片字符串

    my_form: null, //表单数据
    img_ok: false,
    content_ok: false,
    money_ok: false,
    checkbox_ok: false,
    dataLoad: function () {
        //数据加载
        var form = new FormData();
        form.append("uid", loginName);
        form.append("id", rePublish.fabu_id);
        $(".close-del-" + rePublish.type_id).show();
        $(".publish-content-" + rePublish.lei_id).show();
        if (this.leaseid == 1) {
            //其他 
            fetch("http://zushouyou.cn/Api/index/see_shelves", {
                method: 'POST',
                //headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: form
            }).then((response) => response.json()).then(function (data) {
                //console.log(data);
                if (data.code == 200) {
                    //根据lei 显示 system_id: null, //系统id
 
                 
                    rePublish.shop_id=data.data.shop_id;
                      rePublish.system_id=data.data.system_id;
                      rePublish.game_large_id=data.data.game_large_id;
                        rePublish.server_id=data.data.server_id;
                         rePublish.fabu_id=data.data.id;
                         rePublish.game_id=data.data.game_id;
                       

                    for (var key in data.data) {

                        if (data.data.hasOwnProperty(key)) {
                            var element = data.data[key];
                            if(key=="pai"){
                                 if(element==1){
                                    $(".wz-open-swith").attr("checked",'').siblings("span").addClass("active");
                                 }else{
                                      $(".wz-close-swith").attr("checked",'').siblings("span").addClass("active");
                                 }  
                            }else{
                                 $(".next-publish-step input[name='" + key + "']").val(element).addClass("actived");
                                  $(".next-publish-step textarea[name='" + key + "']").html(element).addClass("actived");
                            }
                           

                        }
                    }
                    if (data.data.number==0) {
                        $("#close_swith").attr("checked","").siblings("span").addClass("active");
                         $(".zuyong-count").attr("disabled",'');
                    }else{
                         $("#open_swith").attr("checked","").siblings("span").addClass("active");
                         $(".zuyong-count").removeAttr("disabled");
                    }
                    rePublish.img_file_str = data.data.img;
                    rePublish.img_file = rePublish.img_file_str.slice(0, -1).split(',');
                    var img_html = ``;
                    for (var i = 0; i < rePublish.img_file.length; i++) {
                        var element = rePublish.img_file[i];
                        img_html += `<div class="img-con" data-item=${i} style="height:${rePublish.updataImgHt}">
                              <div><img src="http://zushouyou.cn${element}" alt=""/></div>
                            <span class="del-img"></span>
                        </div>`;
                    }
                    $(".add-img-btn").before(img_html);
                    $(".close-del-" + rePublish.type_id).show();
                    $(".publish-content-" + data.data.lei).show();
                }
            });
        } else {
            //审核中的
            fetch("http://zushouyou.cn/Api/index/see_examine", {
                method: 'POST',
                //headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: form
            }).then((response) => response.json()).then(function (data) {
                console.log(data);
                if (data.code == 200) {
                    //根据lei 显示
                  
                    rePublish.shop_id=data.data.shop_id;
                      rePublish.system_id=data.data.system_id;
                      rePublish.game_large_id=data.data.game_large_id;
                        rePublish.server_id=data.data.server_id;
                         rePublish.fabu_id=data.data.id;
                         rePublish.game_id=data.data.game_id;
                      
                    for (var key in data.data) {

                        if (data.data.hasOwnProperty(key)) {
                            var element = data.data[key];
                            if(key=="pai"){
                                 if(element==1){
                                    $(".wz-open-swith").attr("checked",'').siblings("span").addClass("active");
                                 }else{
                                      $(".wz-close-swith").attr("checked",'').siblings("span").addClass("active");
                                 }  
                            }else{
                                 $(".next-publish-step input[name='" + key + "']").val(element).addClass("actived");
                                  $(".next-publish-step textarea[name='" + key + "']").html(element).addClass("actived");
                            }
                           
                            
                        }
                    }
                      if (data.data.number==0) {
                        $("#close_swith").attr("checked","").siblings("span").addClass("active");
                         $(".zuyong-count").attr("disabled",'');
                    }else{
                         $("#open_swith").attr("checked","").siblings("span").addClass("active");
                         $(".zuyong-count").removeAttr("disabled");
                    }
                    rePublish.img_file_str = data.data.img;
                    rePublish.img_file = rePublish.img_file_str.slice(0, -1).split(',');
                    var img_html = ``;
                    for (var i = 0; i < rePublish.img_file.length; i++) {
                        var element = rePublish.img_file[i];
                        img_html += `<div class="img-con" data-item=${i} style="height:${rePublish.updataImgHt}">
                              <div><img src="http://zushouyou.cn${element}" alt=""/></div>
                            <span class="del-img"></span>
                        </div>`;
                    }
                    $(".add-img-btn").before(img_html);
                    $(".close-del-" + rePublish.type_id).show();
                    $(".publish-content-" + data.data.lid).show();
                }
            });
        }


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


    updataImgH: function () {
        //图片的高和宽设置一样
        var ow = $(".img-box-con>div").css("width"); //上传图片的高
        $(".img-box-con>div").css("height", ow);
        var ow2 = 2 * parseFloat(ow.slice(0, -2)) + 30;
        $(".img-box-con").css("max-height", ow2 + "px");
        this.updataImgHt = ow;
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
           if( $(this).is(":checked")){
               $(this).attr("name","pai").siblings("span").addClass("active").parents(".radio-box").siblings(".radio-box").find(".p-close-swith").removeAttr("name").removeAttr("checked").siblings("span").removeClass("active");
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
            // console.log($(".publish-content-" + rePublish.lei_id + " .publish-form input").length);
            // console.log($(".publish-content-" + rePublish.lei_id + " .publish-form input.actived").length);


            if (rePublish.isCanconmit()) {
                //可以提交
                $("body").addClass("overflow-hidden");
                $("." + $(this).data("class")).show().siblings("div").hide();
                $(".modal-select").show();

                rePublish.my_form = new FormData();
                //rePublish.img_file_str= rePublish.img_file_str.slice(0,-1);
                //console.log( rePublish.img_file_str)
                rePublish.my_form.append("img", rePublish.img_file.join(",")); // 
               
                for (var i = 0; i < $(".publish-content-" + rePublish.lei_id + " .publish-form input.actived").length; i++) {
                    var element = $($(".publish-content-" + rePublish.lei_id + " .publish-form input.actived")[i]);
                     if(element.hasClass(".p-close-swith") && element.is(":checked")){
                         element.attr("name","pai").parents(".radio-box").siblings(".radio-box").find(".p-close-swith").removeAttr("name");
                    }
                    rePublish.my_form.append(element.attr("name"), element.val()); // 
                }
                for (var j = 0; j < $(".publish-content-" + rePublish.lei_id + " .publish-form textarea.actived").length; j++) {
                    var element = $($(".publish-content-" + rePublish.lei_id + " .publish-form textarea.actived")[j]);
                    rePublish.my_form.append(element.attr("name"), element.val()); // 
                }
                for (var x = 0; x < $(".updata-money input.actived").length; x++) {
                    var element = $($(".updata-money input.actived")[x]);
                    rePublish.my_form.append(element.attr("name"), element.val()); // 
                }
                rePublish.my_form.append("rent_no", 1);
                rePublish.my_form.append($(".zuyong-count").attr("name"), $(".zuyong-count").val()); // 


                rePublish.my_form.append("uid", loginName);
                rePublish.my_form.append("id", rePublish.fabu_id);
                rePublish.my_form.append("game_id", rePublish.game_id);
                rePublish.my_form.append("shop_id", rePublish.shop_id);
                rePublish.my_form.append("system_id", rePublish.system_id);
                rePublish.my_form.append("game_large_id", rePublish.game_large_id);
                rePublish.my_form.append("server_id", rePublish.server_id);


            }
            //console.log(rePublish.my_form)


            // if (($(".publish-content-" + rePublish.lei_id + " .publish-form input").length == $(".publish-content-" + rePublish.lei_id + " .publish-form input.actived").length) && ($(".publish-content-" + rePublish.lei_id + " .publish-form textarea").length == $(".publish-content-" + rePublish.lei_id + " .publish-form textarea.actived").length)) {
            //     // if ($(".publish-form input").length == $(".publish-form input.actived")) {
            //     //都填了
            //     alert("中间都填了");
            //     //判断图片和 下面钱全填了没
            //     if (rePublish.img_file.length > 0) {
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
        if (rePublish.img_file.length > 0) {
            //图片上传了
            rePublish.img_ok = true;
        } else {
            alert("图片没上传");

            rePublish.img_ok = false;
            return false;
        }
        if (($(".publish-content-" + rePublish.lei_id + " .publish-form input").length == $(".publish-content-" + rePublish.lei_id + " .publish-form input.actived").length) && ($(".publish-content-" + rePublish.lei_id + " .publish-form textarea").length == $(".publish-content-" + rePublish.lei_id + " .publish-form textarea.actived").length)) {
            //中间内容都填了

            rePublish.content_ok = true;
        } else {
            alert("账号信息没填完");
            rePublish.content_ok = false;
            $(".publish-form input").css("border-color", "#f00")
            $(".publish-form input.actived").css("border-color", "#999");
            $(".publish-form textarea").css("border-color", "#f00")
            $(".publish-form textarea.actived").css("border-color", "#999");
            return false;
        }
        if ($(".updata-money input").length == $(".updata-money input.actived").length) {
            //钱都填了

            rePublish.money_ok = true;
            $(".updata-money input.actived").css("color", "#333");
        } else {
            alert("钱没填了");
            rePublish.money_ok = false;
            $(".updata-money input").css("color", "#f00")
            $(".updata-money input.actived").css("color", "#333");
            return false;
        }
        if ($("#read_fabu_chk").is(":checked")) {
            //勾选了

            rePublish.checkbox_ok = true;
        } else {
            alert("没勾选了");
            rePublish.checkbox_ok = false;
            return false;
        }

        if (rePublish.checkbox_ok && rePublish.money_ok && rePublish.content_ok && rePublish.img_ok) {
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
                if (rePublish.leaseid == 2) {
                    //待审核
                    fetch("http://zushouyou.cn/Api/index/uplede_to_examine", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: rePublish.my_form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                            //跳转回首页
                            alert("审核修改成功");
                            window.history.back();  
                            //window.location.href = `http://192.168.3.120/zushouyou_new/index.html`;
                        }
                    });
                } else {
                    //其他
                    fetch("http://zushouyou.cn/Api/index/change_shelves", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: rePublish.my_form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                            //跳转回首页
                            alert("其他修改成功")
                              window.history.back();  
                            //window.location.href = `http://192.168.3.120/zushouyou_new/index.html`;
                        }
                    });

                }

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
                strExtension != 'png' && strExtension != 'bmp' && strExtension != 'BMP' && strExtension != 'JPG' && strExtension != 'PNG') {
                alert("请选择图片!");
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

                            rePublish.img_file_str += json_1.data.simg + ",";
                            rePublish.img_file[rePublish.img_file.length] = json_1.data.simg;

                            //$("#user_logo_file").siblings("img").attr("src", json_1.picurl);
                            // http://192.168.12.106:8080/photo20170616/35a7b57835ca4160885f861cbf926aa0.png
                        } else {
                            // alert("上传失败");
                            // console.log(data)
                        }
                    }
                };
                xhr.send(form_2);


                // rePublish.img_file[rePublish.img_file.length] = this.files[0];

                var div_html = `<div class="img-con" data-item=${rePublish.img_file.length-1} style="height:${rePublish.updataImgHt}">
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
            rePublish.img_file.splice(parseInt($(this).parent(".img-con").data("item")), 1);
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
            rePublish.img_file.splice(parseInt($(".img-con.active").data("item")), 1);

            $(".img-con.active").remove();
        });
    },
    delPublish: function () {
        //删除发布
        $(".reset-fabu-btn-box").on("click", ".close-del-2", function (e) {
            e.preventDefault();
            var id = $(this).data("id");
            var form = new FormData();
            form.append("uid", loginName);
            form.append("id", rePublish.fabu_id);

            fetch("http://zushouyou.cn/Api/index/delete_to_examine ", {
                method: 'POST',
                //headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: form
            }).then((response) => response.json()).then(function (data) {
                //console.log(data);
                if (data.code == 200) {
                     window.history.back();  
                }
            })
            $(this).parents(".account-content-item").remove();
        });

    },
    closePublish:function () {  
        //关闭发布
          $(".reset-fabu-btn-box").on("click", ".close-del-1", function (e) {
              e.preventDefault();
            var id = $(this).data("id");
            var form = new FormData();
            form.append("uid", loginName);
            form.append("id", rePublish.fabu_id);

            fetch("http://zushouyou.cn/Api/index/close_publication", {
                method: 'POST',
                //headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: form
            }).then((response) => response.json()).then(function (data) {
                console.log(data);
                if (data.code == 200) {
                     //window.history.back();  
                }
            })
            $(this).parents(".account-content-item").remove();
        });

    }
};


$(function () {
    rePublish.init();
});