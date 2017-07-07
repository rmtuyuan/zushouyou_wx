/**
 * Created by Administrator on 2017/6/13.
 */
var AccountDetail = {
    id: null, //出租id
    uid: null, //用户id
    sid: null, //商品id
    money_select: null, //选择套餐
    init: function () {
        this.id = $.getUrlParam("id");
        this.ShowMsg();
        // this.userEvaluate();
        this.zuhaoDescription();
        this.ModalShow();
        this.ModalHide();
        this.ModalSelect();

        this.SelectBox();
        this.SelectEvaluate();
        this.shareShowHide();
        this.collectFun();
        this.hireImmediately();
    },

    ShowMsg: function () {
        // 商品信息

        //根据参数显示通用 球球 王者荣耀
        var form = new FormData();
        form.append("id", AccountDetail.id); // 
        fetch("http://zushouyou.cn/Api/index/rent", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                //根据 lei 1 球球  2 王者 3 通用 来显示页面
                AccountDetail.sid = data.data.commodity_id; //更新商品id

                //banner 图片
                $('.banner-img-box').html(`  <img src="http://zushouyou.cn${data.data.simg}" alt="" />`)
                var msg_html = '';

                if (data.data.lei == 1) {
                    //1 球球
                    msg_html = ` <div class="content-1-box">
                            <div class="container">
                                <div class="qq-content-item">
                                    <div>
                                        <p></p>
                                        <h3>商品信息</h3>
                                    </div>
                                    <p>${data.data.information}</p>
                                </div>
                                <div class="qq-content-item">
                                    <div>
                                        <p></p>
                                        <h3>光环</h3>
                                    </div>
                                    <p>${data.data.halo}</p>
                                </div>
                                <div class="qq-content-item">
                                    <div>
                                        <p></p>
                                        <h3>圣衣</h3>
                                    </div>
                                    <p>${data.data.garments}</p>
                                </div>
                                <div class="qq-content-item">
                                    <div>
                                        <p></p>
                                        <h3>袍子</h3>
                                    </div>
                                    <p>${data.data.spore}</p>
                                </div>
                            </div>
                        </div>
                        <div class="h3">
                            <div class="container">
                                <h3>简介</h3>
                            </div>
                        </div>
                        <div class="content-1-box sf-content-1-box">
                            <div class="content-1-item sf-content-1-item">
                                <div class="container">
                                    <div>
                                        <span>9</span>
                                        <span>光环</span>
                                    </div>
                                    <div>
                                        <span>9</span>
                                        <span>圣衣</span>
                                    </div>
                                    <div>
                                        <span>9</span>
                                        <span>袍子</span>
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                <div class="content-1-item sf-content-1-item">
                                    <span>如需更多信息请搜索角色名称 : <b>${data.data.name}</b></span>
                                </div>
                                <div class="content-1-item upper-box-${data.data.upper_id}">
                                    <p>上号方式</p>
                                    <span  class='upper-2'>上号器上号</span>
                                     <span class='upper-1'>明文账号密码</span>
                                </div>
                                <div class="content-1-item">
                                    <p>累计出租</p>
                                    <span>${data.data.rental}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>累计时长</p>
                                    <span>${data.data.rental_time}</span>
                                </div> 
                                <div class="content-1-item system-box system-box-${data.data.system_id}">
                                    <p>适配系统</p>
                                    <span class='system-1'>Android</span>
                                     <span class='system-2'>iOS</span>
                                      <span class='system-3'>不限</span>
                                </div>
                                <div class="content-1-item">
                                    <p>限制</p>
                                    <span>租号${data.data.number}次以上可以租用此号</span>
                                </div>
                            </div>
                        </div>`;
                } else if (data.data.lei == 2) {
                    //王者
                    msg_html = ` <div class="content-1-box">
                            <div class="container">
                                 <div class="content-1-item system-box system-box-${data.data.system_id}">
                                    <p>操作系统</p>
                                    <span class='system-1'>Android</span>
                                     <span class='system-2'>iOS</span>
                                      <span class='system-3'>不限</span>
                                </div>
                                <div class="content-1-item">
                                    <p>游戏大区</p>
                                    <span>${data.data.game_large_name}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>英雄数量</p>
                                    <span>${data.data.hero_number}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>皮肤数量</p>
                                    <span>${data.data.skin_quantity}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>贵族等级</p>
                                    <span>${data.data.royal}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>物理铭文等级</p>
                                    <span>${data.data.hysical}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>法师铭文等级</p>
                                    <span>${data.data.mage}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>坦克铭文等级</p>
                                    <span>${data.data.tank}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>刺客铭文等级</p>
                                    <span>${data.data.glyph}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>可否排位</p>
                                    <span>${data.data.pai>1?'否':"是"}</span>
                                </div>
                            </div>
                        </div>
                        <div class="h3">
                            <div class="container">
                                <h3>简介</h3>
                            </div>
                        </div>
                        <div class="content-1-box">
                            <div class="container">
                                <div class="content-1-item">
                                    <span>${data.data.information}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>角色名称</p>
                                    <span>${data.data.name}</span>
                                </div>
                                <div class="content-1-item upper-box-${data.data.upper_id}">
                                    <p>上号方式</p>
                                    <span  class='upper-2'>上号器上号</span>
                                     <span class='upper-1'>明文账号密码</span>
                                </div>
                                <div class="content-1-item">
                                    <p>累计出租</p>
                                    <span>${data.data.rental}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>累计时长</p>
                                    <span>${data.data.rental_time}</span>
                                </div> 
                                <div class="content-1-item">
                                    <p>限制</p>
                                    <span>租号${data.data.number}次以上可以租用此号</span>
                                </div>
                            </div>
                        </div>`;
                } else {
                    // 通用
                    msg_html = ` <div class="content-1-box">
                            <div class="container">
                                <div class="content-1-item system-box system-box-${data.data.system_id}">
                                    <p>操作系统</p>
                                    <span class='system-1'>Android</span>
                                     <span class='system-2'>iOS</span>
                                      <span class='system-3'>不限</span>
                                </div>
                                <div class="content-1-item">
                                    <p>游戏大区</p>
                                    <span>${data.data.game_large_name}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>服务器</p>
                                    <span>${data.data.server_name}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>角色名称</p>
                                    <span>${data.data.name}</span>
                                </div>
                                  <div class="content-1-item upper-box-${data.data.upper_id}">
                                    <p>上号方式</p>
                                    <span  class='upper-2'>上号器上号</span>
                                     <span class='upper-1'>明文账号密码</span>
                                </div>
                                <div class="content-1-item">
                                    <p>累计出租</p>
                                    <span>${data.data.rental}</span>
                                </div>
                                <div class="content-1-item">
                                    <p>累计时长</p>
                                    <span>${data.data.rental_time}</span>
                                </div> 
                                <div class="content-1-item">
                                    <p>限制</p>
                                    <span>租号${data.data.number}次以上可以租用此号</span>
                                </div>
                                <div class="content-1-item">
                                    <p>账号描述</p>
                                    <span>${data.data.information}</span>
                                </div>
                            </div>
                        </div>`;

                }
                // 添加到页面上
                $(".content-1-container .content-box-" + data.data.lei).html(msg_html).show().siblings(".content-box").hide();

                // 价格模态框
                $('.select-meal-content').html(` <div class="meal-content-item" data-text="money">
                    租用1小时 <span>${data.data.money}</span>元
                </div>
                <div class="meal-content-item" data-text="money1">
                    租用3小时 <span>${data.data.money1}</span>元
                </div>
                <div class="meal-content-item" data-text="money2">
                    租用6小时 <span>${data.data.money2}</span>元
                </div>
                <div class="meal-content-item" data-text="money3">
                    租用12小时 <span>${data.data.money3}</span>元
                </div>
                <div class="meal-content-item" data-text="money4">
                    租用24小时 <span>${data.data.money4}</span>元
                </div>
                <div class="meal-content-item" data-text="money5">
                    包夜(22:00-7:00) <span>${data.data.money5}</span>元
                </div>`);
                AccountDetail.userEvaluate();


            }
        })
        //根据参数显示页面内容
    },
    userEvaluate: function () {
        //加载用户评价

        var form = new FormData();
        AccountDetail.sid = Math.floor(AccountDetail.sid);
        form.append("commodity_id", AccountDetail.sid); // 

        fetch("http://zushouyou.cn/Api/index/evaluate", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {

            if (data.code == 200) {
                //显示用户评价 title
                $(".content-2-title").html(` <div class="active" data-item="content-2-container-1">
                        <span>${Math.floor(data.data[0].hao)+Math.floor(data.data[0].cha)+Math.floor(data.data[0].zhong)}</span>
                        <p>全部</p>
                    </div>
                    <div data-item="content-2-container-2">
                        <span>${Math.floor(data.data[0].hao)}</span>
                        <p>好评</p>
                    </div>
                    <div data-item="content-2-container-3">
                        <span>${Math.floor(data.data[0].zhong)}</span>
                        <p>中评</p>
                    </div>
                    <div data-item="content-2-container-4">
                        <span>${Math.floor(data.data[0].cha)}</span>
                        <p>差评</p>
                    </div>`);

                //评价内容  判断各个评价属于好中差
                var all_html = ``; //
                var hao_html = ``;
                var zhong_html = ``;
                var cha_html = ``;
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    var dateParms = element.time;


                    if (dateParms instanceof Date) {
                        var datatime = dateParms;
                    }
                    //判断是否为字符串

                    if ((typeof dateParms == "string") && dateParms.constructor == String) {

                        //将字符串日期转换为日期格式
                        var datatime = new Date(parseInt(dateParms) * 1000);

                    }


                    all_html += ` <div class="content-2-item">
                                <div class="content-2-item-rt">

                                    <div class="user-msg-box">
                                        <div class="content-2-item-lf">
                                            <div><img src="http://zushouyou.cn${element.pic}" alt="" /></div>
                                        </div>
                                        <div>
                                            <span class="user-name-text">${element.nickname}</span>
                                            <div class="start-back">
                                                <p class="start-front" style="width:${Math.floor(element.translate)*20}%"></p>
                                            </div>
                                        </div>
                                        <p>
                                            <span>${datatime.getHours()>10? datatime.getHours():"0"+ datatime.getHours()}:${datatime.getMinutes()>10? datatime.getMinutes():"0"+ datatime.getMinutes()}:${datatime.getSeconds()>10? datatime.getSeconds():"0"+ datatime.getSeconds()}</span>
                                            <span>${datatime.getFullYear()}-${datatime.getMonth()+1>10? datatime.getMonth()+1:"0"+ (datatime.getMonth()+1)}-${datatime.getDate()>10? datatime.getDate():"0"+ datatime.getDate()}</span>
                                        </p>
                                    </div>
                                    <p>
                                        ${element.content}

                                    </p>

                                </div>
                            </div>`;

                    //好评
                    if (element.lever == 1) {
                        hao_html += ` <div class="content-2-item">
                                <div class="content-2-item-rt">

                                    <div class="user-msg-box">
                                        <div class="content-2-item-lf">
                                            <div><img src="http://zushouyou.cn${element.pic}" alt="" /></div>
                                        </div>
                                        <div>
                                            <span class="user-name-text">${element.nickname}</span>
                                            <div class="start-back">
                                                <p class="start-front" style="width:${Math.floor(element.translate)*20}%"></p>
                                            </div>
                                        </div>
                                        <p>
                                             <span>${datatime.getHours()>10? datatime.getHours():"0"+ datatime.getHours()}:${datatime.getMinutes()>10? datatime.getMinutes():"0"+ datatime.getMinutes()}:${datatime.getSeconds()>10? datatime.getSeconds():"0"+ datatime.getSeconds()}</span>
                                            <span>${datatime.getFullYear()}-${datatime.getMonth()+1>10? datatime.getMonth()+1:"0"+ (datatime.getMonth()+1)}-${datatime.getDate()>10? datatime.getDate():"0"+ datatime.getDate()}</span>
                                        </p>
                                    </div>
                                    <p>
                                        ${element.content}

                                    </p>

                                </div>
                            </div>`;

                    }
                    //差评
                    if (element.lever == 3) {
                        cha_html += ` <div class="content-2-item">
                                <div class="content-2-item-rt">

                                    <div class="user-msg-box">
                                        <div class="content-2-item-lf">
                                            <div><img src="http://zushouyou.cn${element.pic}" alt="" /></div>
                                        </div>
                                        <div>
                                            <span class="user-name-text">${element.nickname}</span>
                                            <div class="start-back">
                                                <p class="start-front" style="width:${Math.floor(element.translate)*20}%"></p>
                                            </div>
                                        </div>
                                        <p>
                           <span>${datatime.getHours()>10? datatime.getHours():"0"+ datatime.getHours()}:${datatime.getMinutes()>10? datatime.getMinutes():"0"+ datatime.getMinutes()}:${datatime.getSeconds()>10? datatime.getSeconds():"0"+ datatime.getSeconds()}</span>
                                            <span>${datatime.getFullYear()}-${datatime.getMonth()+1>10? datatime.getMonth()+1:"0"+ (datatime.getMonth()+1)}-${datatime.getDate()>10? datatime.getDate():"0"+ datatime.getDate()}</span>
                                        </p>
                                    </div>
                                    <p>
                                        ${element.content}

                                    </p>

                                </div>
                            </div>`;
                    }
                    //中评
                    if (element.lever == 2) {
                        zhong_html += ` <div class="content-2-item">
                                <div class="content-2-item-rt">

                                    <div class="user-msg-box">
                                        <div class="content-2-item-lf">
                                            <div><img src="http://zushouyou.cn${element.pic}" alt="" /></div>
                                        </div>
                                        <div>
                                            <span class="user-name-text">${element.nickname}</span>
                                            <div class="start-back">
                                                <p class="start-front" style="width:${Math.floor(element.translate)*20}%"></p>
                                            </div>
                                        </div>
                                        <p>
                                          <span>${datatime.getHours()>10? datatime.getHours():"0"+ datatime.getHours()}:${datatime.getMinutes()>10? datatime.getMinutes():"0"+ datatime.getMinutes()}:${datatime.getSeconds()>10? datatime.getSeconds():"0"+ datatime.getSeconds()}</span>
                                            <span>${datatime.getFullYear()}-${datatime.getMonth()+1>10? datatime.getMonth()+1:"0"+ (datatime.getMonth()+1)}-${datatime.getDate()>10? datatime.getDate():"0"+ datatime.getDate()}</span>
                                        </p>
                                    </div>
                                    <p>
                                        ${element.content}

                                    </p>

                                </div>
                            </div>`;
                    }
                }


                //添加到页面上
                $('.content-2-container-1>div.container').html(all_html);
                $('.content-2-container-2>div.container').html(hao_html);
                $('.content-2-container-3>div.container').html(zhong_html);
                $('.content-2-container-4>div.container').html(cha_html);


            }
        });


    },
    zuhaoDescription: function () {
        //租号说明
        //加载用户评价
        //console.log(AccountDetail.sid)


        fetch("http://zushouyou.cn/Api/index/hire", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default'
            // body: form
        }).then((response) => response.json()).then(function (data) {

            if (data.code == 200) {
                //显示用户评价
                $(".content-3-front").html(data.data.content);
            }
        })
    },
    ModalShow: function () {
        $(".account-detail-content").on("click", ".select-modal-show span", function () {

            // })
            // $(".select-modal-show span").click(function () {
            $(".modal-meal").show();
            $("body").addClass("overflow-hidden");
        });
    },
    ModalHide: function () {
        $(".close-modal-meal").click(function () {
            $(this).parent(".modal-meal").hide();
            $("body").removeClass("overflow-hidden");
        });
    },
    ModalSelect: function () {
        $('.select-meal-content').on("click", "div", function () {

            $(".select-modal-show span").html($(this).html());
            AccountDetail.money_select = $(this).data("text");
            //console.log( AccountDetail.money_select)
            $(".select-modal-show span.money-box").css("color", "#333");
            $(this).parents(".modal-meal").hide();
            $("body").removeClass("overflow-hidden");
        });
    },
    SelectBox: function () {
        //切换评价 商品信息。。。
        $(".account-detail-title>div").click(function () {
            $(this).addClass("active").siblings(".active").removeClass("active");
            $(".account-detail-content ." + $(this).data("item")).show().siblings().hide();
            if ($(this).hasClass("zuhao-content")) {
                var ow = $(".content-3-front").css("height").slice(0, -2); //上传图片的高
                $(".content-3-back").css("height", ow - 10 + "px");
            }

        });
    },
    shareShowHide: function () {
        //点击分享按钮

        $(".share").click(function (e) {
            e.preventDefault();
            $(".share-mark").show();
            $("body").addClass("overflow-hidden");
        });
        // 关闭分享
        $(".share-close").click(function (e) {
            e.preventDefault();
            $(".share-mark").hide();
            $("body").removeClass("overflow-hidden");
        });


    },
    SelectEvaluate: function () {
        //选择评价
        //$(".account-detail-content").on("click",".content-2-title>div", function () {
        //    $(this).addClass("active").siblings(".active").removeClass("active");
        //    $(".account-detail-content ."+$(this).data("item")).show().siblings().hide();
        //});
        $('.content-2-title').on("click", "div", function () {
            // $(".content-2-title>div").click(function () {
            $(this).addClass("active").siblings(".active").removeClass("active");
            $(".account-detail-content ." + $(this).data("item")).show().siblings().hide();
        });
    },
    collectFun: function () {
        //收藏按钮

        $('.collect').click(function (e) {
            // console.log( AccountDetail.sid)
            e.preventDefault();

            if (loginName) {
                if ($(this).hasClass("active")) {
                    //取消收藏
                    $(this).removeClass("active");
                    var form = new FormData();
                    form.append("uid", loginName); // 
                    form.append("commodity_id", AccountDetail.sid); // 
                    fetch("http://zushouyou.cn/Api/index/cancel_shou_cell", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {

                        }
                    })

                } else {
                    // 收藏
                    $(this).addClass("active");

                    var form = new FormData();
                    form.append("uid", loginName); // 
                    form.append("commodity_id", AccountDetail.sid); // 
                    fetch("http://zushouyou.cn/Api/index/cell", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form
                    }).then((response) => response.json()).then(function (data) {
                        //console.log(data);
                        if (data.code == 200) {

                        }
                    })
                }
            } else {
                window.location.href = "login.html";
            }

        });
        // $(".fixed-btn-box").on("click",".collect.active",function (e) { 
        // //  $('.collect').click(function (e) {  
        //     // 取消收藏
        //     e.preventDefault();
        //     console.log(1)
        //     if(loginName){
        //        $(this).removeClass("active");
        //     }

        // });
    },
    hireImmediately: function () {
        //立即租用
        $(".rent").click(function (e) {
            e.preventDefault();
            if (loginName) {


                if (AccountDetail.money_select) {
                    //判断他有没有绑定手机

                    var form_1 = new FormData();
                    form_1.append("uid", loginName); // 

                    fetch("http://zushouyou.cn/Api/index/bind", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form_1
                    }).then((response) => response.json()).then(function (data) {
                       
                       
                            if (data.data == 1) {
                                //已绑定手机
                                var form = new FormData();
                                form.append("uid", loginName); // 

                                form.append("id", AccountDetail.id); // 
                                form.append("money", AccountDetail.money_select); // 
                                //保存接口
                                fetch("http://zushouyou.cn/Api/index/immediately_pay", {
                                    method: 'POST',
                                    //headers: myHeaders,
                                    mode: 'cors',
                                    cache: 'default',
                                    body: form
                                }).then((response) => response.json()).then(function (data) {
                                    //console.log(data);
                                    if (data.code == 200) {
                                        //成功就跳转
                                         window.location.href = `pay.html?id=${AccountDetail.id}`;
                                    }
                                });

                            } else {
                                window.location.href = "bind_phone.html";
                            }
                        
                    })
                    //跳转到支付也

                    //id uid money3 :"money3" 还没付钱 $_RESE['name']  
                    //json



                } else {
                    //没有选择套餐
                    $(".select-modal-show span.money-box").css("color", "#f00");

                }

            } else {
                //跳到登录页
                window.location.href = "login.html";
            }
        });
    }


};

$(function () {
    AccountDetail.init();
})