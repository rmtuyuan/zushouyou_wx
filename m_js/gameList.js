var gameList = {
    init: function () {
        var gameStyle = $.getUrlParam("gamestyle");
        if (gameStyle == 11) {
            //手机游戏
            this.phoneLoad();
        } else {
            this.pcLoad();
        }
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
console.log(data)
            if (data.code == 200) {
                var phone_html = '';
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    phone_html += ` <div>
                <a href="gameList_next.html?gameid=${element.id}&shop=${element.shop_id}" class="link">
                    <div>
                        <img src="http://zushouyou.cn${element.fimg}" alt=""/>
                    </div>
                    <p>${element.game_name}</p>
                </a>
            </div>`;
                }
                $('.game-list-box').html(phone_html);
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
            console.log(data)
            if (data.code == 200) {
                var pc_html = '';
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    pc_html += ` <div>
                <a href="gameList_next.html?gameid=${element.id}&shop=${element.shop_id}" class="link">
                    <div>
                        <img src="http://zushouyou.cn${element.fimg}" alt=""/>
                    </div>
                    <p>${element.game_name}</p>
                </a>
            </div>`;

                }
                $('.game-list-box').html(pc_html);
            }
        });
    }
}


$(function () {
    var ow = $(".game-list-box>div>a>div").css("width"); //上传图片的高
    $(".game-list-box>div>a>div").css("height", ow);
    gameList.init();
})