/**
 * Created by Administrator on 2017/6/12.
 */
var gameList = {
    updataImgHt: null,
    id:null,//游戏id
    system_id:3,//系统id
    server_id:0,//服务器id
    game_large_id:0,//大区id
    server_data:null,//服务器数据
    game_large_data:null,//大区数据
    shop_id: null,//游戏类型id
    init: function () {
        this.id=$.getUrlParam("gameid");
        this.shop_id=$.getUrlParam("shop");


        this.ModalHide();
        this.ModalShow();
      
        this.dataLoad();
        this.selectChoice();
        this.clickNext();
    },

    dataLoad: function () {
        //加载数据
        var gameStyle = $.getUrlParam("shop");
        if(gameStyle==11){
            //手机游戏
                $('.phone-game').show().siblings(".game-choice-box").hide();
        }else{
            //电脑游戏
            $('.pc-game').show().siblings(".game-choice-box").hide();
            this.system_id=3;
        }
        var form = new FormData();
        form.append("shop_id", gameStyle); // 
        // 根据参数 获取大区 和服务器
        fetch("http://zushouyou.cn/Api/index/game_large", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);
            if(data.code==200){
                //请求成功
                gameList.game_large_data= data.data;//大区数据保存在本地
                var game_large_html='';
                for (var i = 0; i < data.data.length; i++) {
                    var element =  data.data[i];
                    game_large_html+=`<p data-id='${element.id}'> ${element.name} </p>`;
                }
                $('.game-large-id-box').html(game_large_html);
            }
        });
          fetch("http://zushouyou.cn/Api/index/server", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data);                           
            if(data.code==200){
                //请求成功
                 gameList.server_data= data.data;//服务器数据保存在本地
                //  var server_id_html='';
                // for (var i = 0; i < data.data.length; i++) {
                //     var element =  data.data[i];
                //     server_id_html+=`<p data-id='${element.id}'> ${element.name} </p>`;
                // }
                // $('.server-id-box').html(server_id_html);
            }
        });
        
    },
    ModalShow: function () {
        //点击弹出modal框
        $(".choice-item>div>span").click(function () {
            $("body").addClass("overflow-hidden");
            $("." + $(this).data("class")).show().siblings("div").hide();
              if (!gameList.game_large_id) {
                  var  server_id_html='';
                      for (var i = 0; i <  gameList.server_data.length; i++) {
                    var element =  gameList.server_data[i];
                  
                           server_id_html+=`<p data-id='${element.id}'> ${element.name} </p>`;
                 
                    
                }
                 $('.server-id-box').html(server_id_html);
                }

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
         $(".modal-content>div.choice-modal").on("click","p",function () {  
        // $(".modal-content>div.choice-modal>p").click(function () {
            var text = $(this).html();
            
            $(this).parents(".modal-select").hide();
            $("body").removeClass("overflow-hidden");
            $(".choice-item  span." + $(this).parent("div").data("item")).html(text);
            //更新各个属性
            if($(this).parent(".choice-modal").hasClass("system-id-box")){
                //操作系统
                gameList.system_id=$(this).data("systemid");

            }else if ($(this).parent(".choice-modal").hasClass("game-large-id-box")) {
                //大区选择  根据选择筛选 服务器 显示
                  var server_id_html='';
                for (var i = 0; i <  gameList.server_data.length; i++) {
                    var element =  gameList.server_data[i];
                    if($(this).data("id")==element.game_large_id){
                           server_id_html+=`<p data-id='${element.id}'> ${element.name} </p>`;
                    }
                    
                }
                 $('.server-id-box').html(server_id_html);
                 gameList.game_large_id=$(this).data("id");

            }else{
                //server-id-box 服务器选择
                 gameList.server_id=$(this).data("id");
            }


        });
    },
    clickNext: function () {
        //点击下一步 跳转
        $(".ipt-box").on("click" , "a", function (e) {  
             e.preventDefault();
             window.location.href =`account_list.html?id=${ gameList.id}&system_id=${ gameList.system_id}&server_id=${ gameList.server_id}&game_large_id=${ gameList.game_large_id}&shop_id=${gameList.shop_id}`;
        } );
          
    }

};

$(function () {
    gameList.init();
})