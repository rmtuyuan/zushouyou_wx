//更新首页的内容
//获取字符串的长度
function getTextWidth(str) {
    var w = $('body').append($('<span stlye="display:none;" id="textWidth"/>')).find('#textWidth').html(str).width();
    $('#textWidth').remove();
    return w;
}

var index = {
    init: function () {
        //加载时显示页面内容
        this.bannerLoad();
        this.noticeLoad();
        this.latelyLoad();
        this.hotLoad();
        this.phoneLoad();
        this.pcLoad();
        this.clickFaxian();
    },
    bannerLoad: function () {
        //轮播图
        fetch("http://zushouyou.cn/Api/Index/flash", {
            method: 'POST',
            //headers:{"Content-type": "application/json; charset=UTF-8" },
            mode: 'cors'
            // cache: 'no-cache',
            // body: form
        }).then((response) => response.json()).then(function (data) {

            var banner_html = ``;
            if (data.code == 200) {
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    banner_html += `<li><a href="https://${element.url}?id=${i}"><img src="http://zushouyou.cn${element.pic}" alt="${element.title}"></a></li>`;
                }
                $(".banner-container").html(banner_html);

                //轮播
                bannerListFn(
                    $(".banner"),
                    $(".img-btn-list"),
                    $(".left-btn"),
                    $(".right-btn"),
                    3000,
                    true
                );
            }


        });

    },
    noticeLoad: function () {
        // 公告
        fetch("http://zushouyou.cn/Api/Index/tranlate", {
            method: 'POST',
            //headers:{"Content-type": "application/json; charset=UTF-8" },
            mode: 'cors'
            // cache: 'no-cache',
            // body: form
        }).then((response) => response.json()).then(function (data) {

            
            var html_1 = '';
            for (var i = 0; i < data.data.length; i++) {
                var element = data.data[i];
                html_1 += `<li>${element.title}</li>`;
            }
            $(".game-notice-ul").html(html_1);
            //console.log(getTextWidth( $(".game-notice-ul>li").html()));



            //    $(".game-notice-ul>li").html().length>20
            if (data.data.length > 1) {
                setInterval(function () {
                    // $('ul :first').css('background', 'red');  

                    $(".game-notice-ul").css("transition", "all .3s").css("margin-top", "-.5rem");

                    if (parseInt($(".game-notice-ul").css("margin-top").slice(0, -2)) == -50) {
                        $(".game-notice-ul").children().first().clone(true).appendTo(".game-notice-ul");
                        $('.game-notice-ul>:first').remove();
                        $(".game-notice-ul").css("transition", "all 0s").css("margin-top", "0rem");
                    }

                }, 1000);
            }

        })
    },
    latelyLoad: function () {
        //最近使用
        fetch("http://zushouyou.cn/Api/Index/lately", {
            method: 'POST',
            //headers:{"Content-type": "application/json; charset=UTF-8" },
            mode: 'cors'
            // cache: 'no-cache',
            // body: form
        }).then((response) => response.json()).then(function (data) {
            // console.log(data);
            if (data.code == 200) {
                var lately_html = '';
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    lately_html += `<div>
                            <a href="gameList_next.html?gameid=${element.id}&shop=${element.shop_id}" class=""><img src="http://zushouyou.cn${element.fimg}" alt=""/></a>
                            <span>${element.name}</span>
                        </div>`;
                }
                $('.lately-box .search-content').html(lately_html);
            } else {
                $('.lately-box').hide();
            }
        })
    },
    hotLoad: function () {
        //热门游戏
        fetch("http://zushouyou.cn/Api/Index/hot", {
            method: 'POST',
            //headers:{"Content-type": "application/json; charset=UTF-8" },
            mode: 'cors'
            // cache: 'no-cache',
            // body: form
        }).then((response) => response.json()).then(function (data) {

            if (data.code == 200) {
                var hot_html = '';
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    hot_html += `<div>
                            <a href="gameList_next.html?gameid=${element.id}&shop=${element.shop_id}" class=""><img src="http://zushouyou.cn${element.fimg}" alt=""/></a>
                            <span>${element.name}</span>
                        </div>`;
                }
                $('.hot-box .search-content').html(hot_html);
            }
        });
    },
    phoneLoad: function () {
        //手机游戏
        fetch("http://zushouyou.cn/Api/Index/mobile", {
            method: 'POST',
            //headers:{"Content-type": "application/json; charset=UTF-8" },
            mode: 'cors'
            // cache: 'no-cache',
            // body: form
        }).then((response) => response.json()).then(function (data) {
            var leng = 3;
            if (data.code == 200) {
                var phone_html = '';
                for (var i = 0; i < leng; i++) {
                    var element = data.data[i];
                    phone_html += `<div>
                            <a href="gameList_next.html?gameid=${element.id}&shop=${element.shop_id}" class=""><img src="http://zushouyou.cn${element.fimg}" alt=""/></a>
                            <span>${element.game_name}</span>
                        </div>`;
                }
                $('.phone-box .search-content').html(phone_html);
            }
        });

    },
    pcLoad: function () {
        //pc游戏
        fetch("http://zushouyou.cn/Api/Index/computer", {
            method: 'POST',
            //headers:{"Content-type": "application/json; charset=UTF-8" },
            mode: 'cors'
            // cache: 'no-cache',
            // body: form
        }).then((response) => response.json()).then(function (data) {
            var leng = 3;
            if (data.code == 200) {
                var pc_html = '';
                for (var i = 0; i < leng; i++) {
                    var element = data.data[i];
                    pc_html += `<div>
                            <a href="gameList_next.html?gameid=${element.id}&shop=${element.shop_id}" class=""><img src="http://zushouyou.cn${element.fimg}" alt=""/></a>
                            <span>${element.game_name}</span>
                        </div>`;
                }
                $('.pc-box .search-content').html(pc_html);
            }
        });
    },
    clickFaxian:function () {  
        $(".faxian-btn").click(function (e) {  
             e.preventDefault();
             alert("敬请期待!");
        })
    }




}


$(function () {
    if (loginName) {
        //loginName 存在
        $(".user-not-login").hide();
        $(".user-ok-login").show();
    }
    index.init();
    // var form = new FormData();
    // form.append("id", loginName); // 文件对象
    // form.append("fpass", $("#re_pwd").val()); // 文件对象
    // form.append("password", $("#re_pwd_1").val()); // 文件对象
    // form.append("pass", $("#re_pwd_2").val()); // 文件对象

});