//我的发布

var myPublish = {
    init: function () {
        this.dataLoad();
        this.resetPwd();
        this.delPublish()
    },
    dataLoad: function () {
        //加载数据
        //确认发布  fetch
        var form = new FormData();
        form.append("uid", loginName);
        form.append("page", 1);
        fetch("http://zushouyou.cn/Api/index/us_release", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
           // console.log(data);
            if (data.code == 200) {

                //   2租用中  3已下架
                var can_html = ''; //1待租用
                var ing_html = ''; //   2租用中
                var done_html = ''; //  3已下架
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    if (element.lease_id == 1) {
                        can_html += ` <div class="account-content-item ${element.sesame_credit==2?"authenticated":""}">
                <div class="container">
                    <h3>${element.title}</h3>
                    <p>  <p>${element.game_name}/${element.large_name}/${element.server_name}</p></p>
                    <div class="account-msg-item">
                        <b>租户信息:</b>
                        <!--<p> <span>被投诉 <span>5</span>次 <i class="ren">认</i> <i class="bao">保</i> <i class="shang">商</i> </span>-->
                        <p class="rent-msg ">
                            <span>已认证</span>
                            <a href="#" class="text-purple dis-none">未认证</a>
                        </p>
                    </div>
                    <div class="account-msg-item self-msg-item">
                        <b>租金:</b>
                        <p><span>${element.money}元/次<span></span></span>
                        </p><i class="hide">特价</i>
                    </div>
                    <div class="account-msg-item ">
                        <b>账号状态:</b>
                        <p> <span>可租用<span></span></span>
                        </p>
                    </div>
                    <!--<div class="account-msg-item self-msg-item">
                        <b>租用倒计时:</b>
                        <p> <span> <b>03</b> : <b>21</b> : <b>29</b></span></p>
                    </div>-->

                </div>
                <div class="account-msg-item my-loves-item">
                    <div class="container">
                        <a href="#" class="">去认证</a>
                        <a href="revise_publish.html?id=${element.id}&type=1 &lei=${element.lei}&leaseid=1 ">修改内容</a>
                    </div>
                </div>
            </div>`;
                    }
                    if (element.lease_id == 2) {
                        ing_html += `<div class="account-content-item ${element.sesame_credit==2?"authenticated":""}">
                <div class="container">
                   <h3>${element.title}</h3>
                    <p>  <p>${element.game_name}/${element.large_name}/${element.server_name}</p></p>
                    <div class="account-msg-item">
                        <b>租户信息:</b>
                        <!--<p> <span>被投诉 <span>5</span>次 <i class="ren">认</i> <i class="bao">保</i> <i class="shang">商</i> </span>-->
                        <p class="rent-msg ">
                            <span>已认证</span>
                            <a href="#" class="text-purple dis-none">未认证</a>
                        </p>
                    </div>
                    <div class="account-msg-item self-msg-item">
                        <b>租金:</b>
                        <p><span>${element.money}元/次<span></span></span>
                        </p><i class="hide">特价</i>
                    </div>
                    <div class="account-msg-item ">
                        <b>账号状态:</b>
                        <p> <span class="" >租用中<span></span></span>
                        </p>
                    </div>
                    <div class="account-msg-item self-msg-item">
                        <b>租用倒计时:</b>
                        <p> <span class="time-count" data-time="${element.stoptime-element.currenttime}"> <b>03</b> : <b>21</b> : <b>29</b></span></p>
                    </div>

                </div>
                <!--<div class="account-msg-item my-loves-item">
                    <div class="container">
                        <a href="#" class="">去认证</a>
                        <a href="revise_publish.html">修改内容</a>
                    </div>
                </div>-->
            </div>`;
                    }
                    if (element.lease_id == 3) {
                        done_html += ` <div class="account-content-item ${element.sesame_credit==2?"authenticated":""}">
                <div class="container">
                  <h3>${element.title}</h3>
                    <p>  <p>${element.game_name}/${element.large_name}/${element.server_name}</p></p>
                    <div class="account-msg-item">
                        <b>租户信息:</b>
                        <!--<p> <span>被投诉 <span>5</span>次 <i class="ren">认</i> <i class="bao">保</i> <i class="shang">商</i> </span>-->
                        <p class="rent-msg authenticated">
                            <span>已认证</span>
                            <a href="#" class="text-purple dis-none">未认证</a>
                        </p>
                    </div>
                    <div class="account-msg-item self-msg-item">
                        <b>租金:</b>
                        <p><span>${element.money}元/次<span></span></span>
                        </p><i class="hide">特价</i>
                    </div>
                    <div class="account-msg-item ">
                        <b>账号状态:</b>
                        <p> <span>待上架<span></span></span>
                        </p>
                    </div>
                    <!--<div class="account-msg-item self-msg-item">
                        <b>租用倒计时:</b>
                        <p> <span> <b>03</b> : <b>21</b> : <b>29</b></span></p>
                    </div>-->

                </div>
                <div class="account-msg-item my-loves-item">
                    <div class="container">
                        <a href="#" class="pwd-modal-show" data-text='${element.game_name}/${element.large_name}/${element.server_name}' data-id='${element.id}' data-accout="${element.accout}" data-password="${element.password}">修改密码并上架</a>
                        <a href="revise_publish.html?id=${element.id}&type=2&lei=${element.lei}&leaseid=1">修改其他内容</a>
                    </div>
                </div>
            </div>`;
                    }

                }
                $(".publish-can").html(can_html);
                $(".publish-wait").html(done_html);

                $(".publish-ing").html(ing_html);
                myPublish.stopTime($('.time-count').data("time"), $('.time-count'));
            }
        });

        fetch("http://zushouyou.cn/Api/index/to_examine", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            console.log(data);
            if (data.code == 200) {
                var verfiy_html = '';
                for (var j = 0; j < data.data.length; j++) {
                    var element = data.data[j];
                    verfiy_html += `<div class="account-content-item authenticated ${element.state==1?"":"dont-publish"} ">
                <div class="container">
                   <h3>${element.title}</h3>
                     <p>${element.game_name}/${element.large_name}/${element.server_name}</p>
                    <div class="account-msg-item">
                        <b>租户信息:</b>
                       
                        <p class="rent-msg ">
                            <span>已认证</span>
                            <a href="#" class="text-purple dis-none">未认证</a>
                        </p>
                    </div>
                    <div class="account-msg-item self-msg-item">
                        <b>租金:</b>
                        <p><span>${element.money}元/次<span></span></span>
                        </p><i class="hide">特价</i>
                    </div>
                    <div class="account-msg-item account-state ">
                        <b>账号状态:</b>
                        <p>
                             <span>待审核</span>
                            <span class="text-purple"> 审核失败</span>
                        </p>
                    </div>
                    <div class="account-msg-item ${element.state==1?"dont-publis-reason":""} ">
                        <b>失败原因:</b>
                        <p> <span class="text-purple">${element.news}<span></span></span>
                        </p>
                    </div>
                   

                </div>
                <div class="account-msg-item my-loves-item">
                    <div class="container">
                          <span data-id=${element.id}>删除发布</span>
                        <a href="revise_publish.html?id=${element.id}&type=2&lei=${element.lid}&leaseid=2">修改内容</a>
                    </div>
                </div>
            </div>`;
                }
                $(".publish-verfiy").html(verfiy_html);
            }
        });
    },
    stopTime: function (diff, mark) {
        //倒计时
        var hour = 0;
        var minute = 0;
        var second = 0;
        var diff = parseInt(diff / 1000);
        if (diff > 0) {
            hour = Math.floor(diff / 60 / 60);
            minute = Math.floor(diff / 60) - hour * 60;
            second = Math.floor(diff) - minute * 60 - hour * 60 * 60;
        }
        if (minute < 9) {
            minute = "0" + minute;
        }
        if (second < 9) {
            second = "0" + second;
        }
        mark.html(` <b>${hour}</b> : <b>${minute}</b> : <b>${second}</b>`);

        var timer = setInterval(function () {
            diff--;
            if (diff > 0) {
                hour = Math.floor(diff / 60 / 60);
                minute = Math.floor(diff / 60) - hour * 60;
                second = Math.floor(diff) - minute * 60 - hour * 60 * 60;
            }
            if (minute < 9) {
                minute = "0" + minute;
            }
            if (second < 9) {
                second = "0" + second;
            }

            mark.html(` <b>${hour}</b> : <b>${minute}</b> : <b>${second}</b>`);

            if (diff <= 0 || diff === NaN) {
                mark.html(` <b>00</b> : <b>00</b> : <b>00</b>`);
                clearInterval(timer);
                timer = null;
            }
        }, 1000);

    },
    resetPwd: function () {
        //修改密码
        var id = null;
        $(".my-publish-box").on("click", ".pwd-modal-show", function (e) {
            e.preventDefault();
            //$(".pwd-modal-show").click(function(){
            //获取当前的 密码 
            id = $(this).data("id");
            $(".text-h3").html($(this).data("text"));
            $(".accout-span").html($(this).data("accout"));
            $(".pwd-span").html($(this).data("password"));
            $("body").addClass("overflow-hidden");
            //更新内容
            $(".my-publis-modal").show();

        });

        $(".my-publis-modal input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).css("border-color", "#999");
            } else {
                $(this).removeClass("actived");
                $(this).css("border-color", "#f00");
            }
        });
        $(".my-publis-modal input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).css("border-color", "#999");
            } else {
                $(this).removeClass("actived");
                $(this).css("border-color", "#f00");
            }
        });

        //点击提交保存
        $(".save-pwd-btn").click(function (e) {
            e.preventDefault();
            //判断是否
            if ($(".my-publis-modal input").length == $(".my-publis-modal input.actived").length) {
                if ($(".pwd-ipt1").val() == $(".pwd-ipt2").val()) {
                    var form = new FormData();
                    form.append("uid", loginName);
                    form.append("id", id);
                    form.append("password", $(".pwd-ipt1").val());
                    form.append("pass", $(".pwd-ipt2").val());
                    fetch("http://zushouyou.cn/Api/index/change_password", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form
                    }).then((response) => response.json()).then(function (data) {
                        if (data.code == 200) {
                            //成功
                            $("body").removeClass("overflow-hidden");
                            $(this).parents(".my-publis-modal").hide();
                            $(".text-h3").html("");
                            $(".accout-span").html("");
                            $(".pwd-span").html("");
                            $(".my-publis-modal input").val("");
                        }
                    });
                }


            } else {
                // 有没填

                $(".my-publis-modal input").css("border-color", "#f00");
                $(".my-publis-modal input.actived").css("border-color", "#999");
            }
        });

    },
    delPublish: function () {
        //删除发布
        $(".my-loves-box").on("click", ".my-loves-item span", function () {
            var id = $(this).data("id");
            var form = new FormData();
            form.append("uid", loginName);
            form.append("id", id);

            fetch("http://zushouyou.cn/Api/index/delete_to_examine ", {
                method: 'POST',
                //headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: form
            }).then((response) => response.json()).then(function (data) {
                console.log(data);
                if (data.code == 200) {

                }
            })
            $(this).parents(".account-content-item").remove();
        });

    }
}


$(function () {
    myPublish.init();
})