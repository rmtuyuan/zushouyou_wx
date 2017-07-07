//显示内容
//id=2&system_id=2&server_id=1&game_large_id=1
var accountList = {
    id: null, //游戏id
    system_id: null, //系统id
    server_id: null, //服务器id
    game_large_id: null, //大区id
    shop_id: null, //游戏类型id
    lease_id: 0, //状态
    pid: 0, //价格
    dataContent: null, //符合游戏id 的所有号
    init: function () {
        //获取参数

        this.id = $.getUrlParam("id");
        this.system_id = $.getUrlParam("system_id");
        this.server_id = $.getUrlParam("server_id");
        this.game_large_id = $.getUrlParam("game_large_id");
        this.shop_id = $.getUrlParam("shop_id");
        this.modalFun();
        this.dataLoad();
        this.gameLargeLoad();
        this.selectModal();
    },
    //处理数据  

    dataLoadFun: function (form) {
        //页面主体数据加载 封装函数函数  重复调用
        // 根据参数 获取大区 和服务器
        fetch("http://zushouyou.cn/Api/index/mobile_games", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            console.log(data);
            if (data.code == 200) {
                //判断 特价商品
                var accountlist_html = "";
                if (data.data.ball) {
                    //有特价商品
                    accountlist_html += ` <div class="account-content-item" data-id="${data.data.ball.id}">
        <div class="container">
            <h3>${data.data.ball.title}</h3>
            <p>${data.data.ball.game_name}/${data.data.ball.game_large_name}/${data.data.ball.server_name}</p>
            <div class="account-msg-item">
                <b>租户信息:</b><p> <span>被投诉 <span>${data.data.ball.number}</span>次 <i class="ren hide-${data.data.ball.sesame_credit}">认</i> <i class="bao hide-${data.data.ball.bid}">保</i> <i class="shang hide-${data.data.ball.sid}">商</i> </span></p>
            </div>
            <div class="account-msg-item self-msg-item">
                <b>租金:</b> <p><span>${data.data.ball.money}元/次<span></span></span></p><i>特价</i>
            </div>
            <div class="account-msg-item ">
                <b>账号状态:</b> <p> <span>可租用<span></span></span></p>
            </div>
            <div class="account-msg-item self-msg-item">
                <b>租用倒计时:</b><p> <span class="time-count" data-time="${data.data.ball.stoptime-data.data.ball.currenttime}"> <b></b> : <b></b> : <b></b></span></p> <a href="account_detail.html?id=${data.data.ball.id}">立即租用</a>
            </div>
        </div>
    </div>`;

                }
                //没有特价商品

                //判断是什么状态的



                for (var i = 0; i < data.data.feiball.length; i++) {
                    var element = data.data.feiball[i];
                    if (element.lease_id == 1) {
                        //待租用
                        accountlist_html += ` <div class="account-content-item" data-id="${element.id}">
        <div class="container">
            <h3>${element.title}</h3>
            <p>${element.game_name}/${element.game_large_name}/${element.server_name}</p>
            <div class="account-msg-item">
                <b>租户信息:</b><p> <span>被投诉 <span>${element.number}</span>次 <i class="ren hide-${element.sesame_credit}">认</i> <i class="bao hide-${element.bid}">保</i> <i class="shang hide-${element.sid}">商</i> </span></p>
            </div>
            <div class="account-msg-item self-msg-item">
                <b>租金:</b> <p><span>${element.money}元/次<span></span></span></p><i class="hide">特价</i>
            </div>
            <div class="account-msg-item ">
                <b>账号状态:</b> <p> <span>可租用<span></span></span></p>
            </div>
            <div class="account-msg-item self-msg-item">
                <b class="visi-hide">租用倒计时:</b><p class="visi-hide"> <span class="time-count" data-time="${element.stoptime-element.currenttime}"> <b></b> : <b></b> : <b></b></span></p> <a href="account_detail.html?id=${element.id}">立即租用</a>
            </div>
        </div>
    </div>`;

                    } else if (element.lease_id == 2) {
                        //租用中

                        accountlist_html += ` <div class="account-content-item" data-id="${element.id}">
        <div class="container">
            <h3>${element.title}</h3>
            <p>${element.game_name}/${element.game_large_name}/${element.server_name}</p>
            <div class="account-msg-item">
                <b>租户信息:</b><p> <span>被投诉 <span>${element.number}number</span>次 <i class="ren hide-${element.sesame_credit}">认</i> <i class="bao hide-${element.bid}">保</i> <i class="shang hide-${element.sid}">商</i> </span></p>
            </div>
            <div class="account-msg-item self-msg-item">
                <b>租金:</b> <p><span>${element.money}元/次<span></span></span></p><i class="hide">特价</i>
            </div>
            <div class="account-msg-item ">
                <b>账号状态:</b> <p> <span>租用中<span></span></span></p>
            </div>
            <div class="account-msg-item self-msg-item">
                <b >租用倒计时:</b><p > <span class="time-count" data-time="${element.stoptime-element.currenttime}"> <b></b> : <b></b> : <b></b></span></p> <a  style='display;none;' href="account_detail.html?id=${element.id}">立即租用</a>
            </div>
        </div>
    </div>`;
                    } else {
                        //已下架

                        accountlist_html += ` <div class="account-content-item" data-id="${element.id}">
        <div class="container">
            <h3>${element.title}</h3>
            <p>${element.game_name}/${element.game_large_name}/${element.server_name}</p>
            <div class="account-msg-item">
                <b>租户信息:</b><p> <span>被投诉 <span>${element.number}number</span>次 <i class="ren hide-${element.sesame_credit}">认</i> <i class="bao hide-${element.bid}">保</i> <i class="shang hide-${element.sid}">商</i> </span></p>
            </div>
            <div class="account-msg-item self-msg-item">
                <b>租金:</b> <p><span>${element.money}元/次<span></span></span></p><i class="hide">特价</i>
            </div>
            <div class="account-msg-item ">
                <b>账号状态:</b> <p> <span>已下架<span></span></span></p>
            </div>
            <div class="account-msg-item self-msg-item">
                <b  class="visi-hide">租用倒计时:</b><p  class="visi-hide"> <span class="time-count" data-time="${element.stoptime}"> <b></b> : <b></b> : <b></b></span></p> <a  style='display;none;' href="account_detail.html?id=${element.id}">立即租用</a>
            </div>
        </div>
    </div>`;
                    }

                }




                //添加数据
                $('.list-container').html(accountlist_html);
                if($('.time-count').data("time")>0){
                     accountList.stopTime($('.time-count').data("time"), $('.time-count'));
                }else{
                     $('.time-count').html(` <b>00</b> : <b>00</b> : <b>00</b>`);
                }
            }
        })


    },
    dataLoad: function () {
        var form = new FormData();
        form.append("id", accountList.id); // 
        form.append("system_id", accountList.system_id); // 
        form.append("server_id", accountList.server_id); // 
        form.append("game_large_id", accountList.game_large_id); // 
        form.append("lease_id", accountList.lease_id); // 
        form.append("pid", accountList.pid); // 
        this.dataLoadFun(form);
    },

    gameLargeLoad: function () {
        // 大区数据加载
        var form = new FormData();
        form.append("shop_id", accountList.shop_id); // 
        // 根据参数 获取大区 和服务器
        fetch("http://zushouyou.cn/Api/index/game_large", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if (data.code == 200) {
                // gameList.game_large_data = data.data; //大区数据保存在本地
                var game_large_html = '';
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    game_large_html += ` <div class="account-modal-item" data-id='${element.id}'>
                    <div class="container">
                        <span> ${element.name}</span>
                        <i class="fa fa-check"></i>
                    </div>
                </div>`;
                }
                $('.game-large-id-box').html(game_large_html);
            }
        })
    },
    modalFun: function () {
        //模态框的显示和关闭
        $(".account-class-item").click(function () {
            $(this).addClass("active").siblings(".active").removeClass("active");
            $(".account-modal-content ." + $(this).data("item")).show().siblings().hide().parents(".account-class-modal").show();
            $("body").addClass("overflow-hidden");
        });
        $(".close-account-modal").click(function () {
            $(this).parents(".account-class-modal").hide();
            $("body").removeClass("overflow-hidden");
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
         if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
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
              if (hour < 10) {
            hour = "0" + hour;
        }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }

            mark.html(` <b>${hour}</b> : <b>${minute}</b> : <b>${second}</b>`);
            
            if (diff <= 0) {
                    clearInterval(timer);
                mark.html(` <b>00</b> : <b>00</b> : <b>00</b>`);
            
                timer = null;
            }
        }, 1000);

    },
    selectModal: function () {
        //条件选择
        $(".account-modal-content").on("click", ".account-modal-item", function () {
            $(this).addClass("active").siblings(".active").removeClass("active");
            //        $(this).find("span").html();
            $(".account-class ." + $(this).parent("div").data("item")).find("span").html($(this).find("span").html());
            //更新页面内容
            if ($(this).parent("div").hasClass("lease-id-box")) {
                //租用状态
                accountList.lease_id = $(this).data("leaseid");
            }
            if ($(this).parent("div").hasClass("pid-box")) {
                //价格
                accountList.pid = $(this).data("pid");
            }
            if ($(this).parent("div").hasClass("game-large-id-box")) {
                //大区
                accountList.game_large_id = $(this).data("id");
            }

            //console.log(accountList.lease_id, accountList.pid, accountList.game_large_id)
            accountList.dataLoad();

            $(this).parents(".account-class-modal").hide();
            $("body").removeClass("overflow-hidden");
            //ajax 更新页面内容
        })
    }

};


$(function () {
    //页面加载初始化
    accountList.init();
})