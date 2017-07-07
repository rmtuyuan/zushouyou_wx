var personal_msg = {
    init: function () {
        this.dataLoad();
        this.ModalShow();
        this.ModalHide();
        this.ModalSelect();
        this.selectAdd();
        this.updataImg();
        this.getInput();
        this.clickSaveBtn();
    },
    province_data: null, //省数据
    city_data: null, //市数据
    dataLoad: function () {
        //加载数据

        var form = new FormData();
        form.append("uid", loginName); // 
        //  个人信息
        fetch("http://zushouyou.cn/Api/Index/ge", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            console.log(data);
            if (data.code == 200) {
                //图片显示 
                shen = data.data.provinceid;
                shi = data.data.cityid;
                $(".user-logo-img").attr("src", "http://zushouyou.cn" + data.data.img);
                $(".msg-1>div.container").html(` <div class="msg-content-item">
                    <p>昵称</p>
                    <p><input type="text" name="nickname" value='${data.data.nickname}' placeholder="请输入昵称"></p>
                </div>
                <div class="msg-content-item">
                    <p>真实姓名</p>
                    <p><input type="text" name="username" value='${data.data.username}' placeholder="请输入姓名"></p>
                </div>
                <div class="msg-content-item">
                    <p>性别</p>
                    <p>
                        <span class="modal-show modal-choice-1" data-item="modal-1">${data.data.sex==1?"男":data.data.sex==2?"女":"保密"}</span>
                        <input type="text" class="actived" name="sex" value="${data.data.sex}" style="display:none" >
                        </p>
                </div>
                <div class="msg-content-item">
                    <p>年龄</p>
                    <p><input type="number" min="0" value='${data.data.age}' name="age" placeholder="请输入年龄"></p>
                </div>`);

                $(".msg-2>div.container").html(`<div class="msg-content-item">
                    <p>身份二维码</p>
                    <p><i class="fa  fa-qrcode modal-show" data-item="modal-2"></i></p>
                </div>
                <div class="msg-content-item">
                    <p>邮箱</p>
                    <p><input type="email" name="email" value='${data.data.email==null?"":data.data.email}' placeholder="请输入邮箱"></p>
                </div>
                <div class="msg-content-item">
                    <p>手机号</p>
                    <p class="phone-box"> 
                        <span >${data.data.phone}</span>
                        <input type="number"  style="display:none" placeholder="请输入手机号" >
                    </p>
                </div>
                <div class="msg-content-item">
                    <p>身份证号</p>
                    <p><input type="text" value='${data.data.shen==null?"":data.data.shen}' name="shen" minlength="18" maxlength="18" placeholder="请输入身份证号"></p>
                </div>
                <div class="msg-content-item zima-xinyong">
                    <p>芝麻信用</p>
                    <p class="${data.data.sesame_credit==1?"":"authentication"}">
                        <span>已认证</span>
                        <a href="#" class="text-purple">未认证</a>
                    </p>
                </div>`);


                $(".msg-3>div.container").html(` <div class="msg-content-item sf-msg-content-item">
                    <p>所在省市</p>
                    <p><span class="modal-show add-select" data-item="modal-3">${data.data.province==null?"请选择":data.data.province}   ${data.data.city==null?"":data.data.city}</span>
                         <input type="text" class="province" name="provinceid" value="" style="display:none" >
                          <input type="text"  class="city" name="cityid" value="" style="display:none" >
                    </p>
                </div>
                <div class="msg-content-item tea-msg-content-item">
                    <p><textarea rows="" cols="" name="address" placeholder="现住址">${data.data.address}</textarea></p>
                </div>`);


                $(".msg-4>div.container").html(`  <div class="msg-content-item tea-msg-content-item">
                    <p><textarea rows="" cols="" name="description" value=''  maxlength="30" placeholder="个性签名(不超过30个字)">${data.data.description}</textarea></p>
                </div>`);
            }
        });


        fetch("http://zushouyou.cn/Api/Index/province", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default'
            //body: form
        }).then((response) => response.json()).then(function (data) {
            // console.log(data);
            if (data.code == 200) {
                //图片显示
                var shen_html = '  <div class="active">全部</div>';
                //$(".modal-content-front").html();
                personal_msg.province_data = data.data;
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];

                    shen_html += `<p ><a href="#" data-provinceid=${element.provinceid}>${element.province}</a></p>`;
                }
                $(".modal-content-front").html(shen_html);
            }
        });

        fetch("http://zushouyou.cn/Api/Index/city", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default'
            //body: form
        }).then((response) => response.json()).then(function (data) {

            if (data.code == 200) {
                personal_msg.city_data = data.data;

            }
            //图片显示 

        });
    },
    ModalShow: function () {
        $('.personal-msg-main').on("click", ".modal-show", function () {
            $("body").addClass("overflow-hidden");
            //console.log($(this).data("item"))
            $("." + $(this).data("item")).show().siblings("div").hide().parent('.modal-content').show().siblings(".modal-content").hide();
            $(".modal-select").show();
        });
    },
    ModalHide: function () {
        $(".close-modal").click(function () {
            $(this).parents(".setting-modal").hide();
            $("body").removeClass("overflow-hidden");
            // $(".modal-content").hide();
            $('.modal-content-front').css("left", "0");
        });
    },
    ModalSelect: function () {
        $(".modal-content-mid").on("click", ".modal-1>p", function () {
            var html = $(this).html();

            $("." + $(this).parents(".modal-1").data("item")).html(html).siblings("input").val($(this).data("sex"));
            $(this).parents(".setting-modal").hide();
            $("body").removeClass("overflow-hidden");
        });
    },
    add_text: "",
    selectAdd: function () {
        $(".modal-content-btm").on("touchstart click", "a", function (e) {
            //console.log(1111)
            e.preventDefault();
            personal_msg.add_text += $(this).html() + " ";
            $(this).addClass("active").siblings().removeClass("active");
            if ($(this).parents("._panel-box").hasClass("modal-content-front")) {
                var city_html = ' <div class="active">全部</div>';
                for (var i = 0; i < personal_msg.city_data.length; i++) {
                    var element = personal_msg.city_data[i];
                    if (element.provinceid == $(this).data("provinceid")) {
                        city_html += `<p> <a href="#" data-cityid=${element.cityid}>${element.city}</a></p>
                        `;
                    }
                }
                $(".modal-content-back").html(city_html);
                $(".add-select").siblings(".province").addClass("actived").val($(this).data("provinceid"));
                console.log($(".add-select").siblings(".province").val());

                $(this).parents('.modal-content-front').siblings(".modal-content-back").show();
                $(this).parents('.modal-content-front').css('left', '-100%');
                $('.modal-content-front').css("top", "0px");
                console.log(parseInt($(".modal-content-back p").length) * 45);
                if (parseInt($(".modal-content-back p").length) * 45 > 225) {
                    $(".modal-content-back").css("top", "0");
                } else {
                    $(".modal-content-back").css("bottom", "0px");
                }
                //$(".add-select")
                //根据参数 更新内容


            } else {

                $(".add-select").html(personal_msg.add_text);
                $(".add-select").siblings(".city").addClass("actived").val($(this).data("cityid"));
                $(this).parents(".setting-modal").hide();
                $("body").removeClass("overflow-hidden");
                $('.modal-content-front').css('left', '0').css("top", "0px");
                personal_msg.add_text = "";

            }
        });
    },
    getInput: function () {
        //给填的input 增加 actived
        $(".personal-msg-main").on("keyup", "input", function () {
            //$(".personal-msg-main input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                // $(this).css("border-color", "#999").css("color", "#333");

            } else {
                $(this).removeClass("actived");
                //$(this).css("border-color", "#f00");
            }
        });
        $(".personal-msg-main").on("blur", "input", function () {
            //$(".personal-msg-main input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                //$(this).css("border-color", "#999");
            } else {
                $(this).removeClass("actived");
                //$(this).css("border-color", "#f00");
            }
        });
        $(".personal-msg-main").on("keyup", "textarea", function () {
            //$(".personal-msg-main textarea").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                //$(this).css("border-color", "#999");
            } else {
                $(this).removeClass("actived");
                //$(this).css("border-color", "#f00");
            }
        });
        $(".personal-msg-main").on("blur", "textarea", function () {
            // $(".personal-msg-main textarea").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                //$(this).css("border-color", "#999");
            } else {
                $(this).removeClass("actived");
                ///$(this).css("border-color", "#f00");
            }
        });

    },
    img_file: null,
    updataImg: function () {
        //上传图片 显示图片
        $("#user_logo_file").change(function () {

            var fileObj = this.files[0]; // 获取文件对象
            personal_msg.img_file = fileObj;
            var imgUrl = window.URL.createObjectURL(this.files[0]);
            var FileController = "http://zushouyou.cn/Api/Index/img"; // 接收上传文件的后台地址
            // FormData 对象
            var form = new FormData();
            //form.append("uid", loginName); // 可以增加表单数据
            form.append("img", fileObj); // 文件对象
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        // alert("成");
                        var json_1 = JSON.parse(data.currentTarget.responseText);
                        console.log(json_1)

                    } else {
                        alert("失败");

                    }
                }
            };
            xhr.send(form);
            xhr.onload = function () {
                // 
            };
            $(".user-logo-img").attr("src", imgUrl);

        });

    },
    clickSaveBtn: function () {
        //点击保存
        $(".save-btn").click(function (e) {
            e.preventDefault();
            var form2 = new FormData();
            form2.append("id", loginName); // 

            for (var i = 0; i < $(".personal-msg-main input.actived").length; i++) {
                var element1 = $($(".personal-msg-main input.actived")[i]);
                form2.append(element1.attr("name"), element1.val());

            }
            for (var j = 0; j < $(".personal-msg-main textarea.actived").length; j++) {
                var element2 = $($(".personal-msg-main textarea.actived")[j]);
                form2.append(element2.attr("name"), element2.val());
            }
            if (personal_msg.img_file) {
                form2.append("img", personal_msg.img_file); // 
            }
            fetch("http://zushouyou.cn/Api/Index/useredit", {
                method: 'POST',
                //headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: form2
            }).then((response) => response.json()).then(function (data) {
                console.log(data)
                if (data.code == 200) {
                    //alert("修改成功");
                    window.location.href = 'user_center.html';
                }
            })

        });

    }

};

$(function () {
    personal_msg.init();
})