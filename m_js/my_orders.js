//我的订单
myOrders = {
    init: function () {
        this.dataLoad();
        this.ClickDiv();
    },
    dataLoad: function () {
        //加载数据
        var form2 = new FormData();
       // console.log(loginName)
        form2.append("uid", loginName); // 
        form2.append("page", 1);
        fetch("http://zushouyou.cn/Api/Index/order", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form2
        }).then((response) => response.json()).then(function (data) {
            console.log(data);
            if (data.code == 200) {

                var html='';
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    html+=` <div class="account-content-item authenticated ${element.upper_id==1?"pwd-login":""}"data-id=${element.id} data-type=1 data-indexi=${i}>
                <div class="container">
                    <h3>${element.title}</h3>
                    <p>${element.game_name}/${element.large_name}/${element.server_name}</p>
                     <div class="account-msg-item accout-pwd-text">
                        <b>用户名:</b>
                        <!--<p> <span>被投诉 <span>5</span>次 <i class="ren">认</i> <i class="bao">保</i> <i class="shang">商</i> </span>-->
                        <p class="rent-msg ">
                            <span>${element.accout}</span>
                            <!--<a href="#" class="text-purple dis-none">未认证</a>-->
                        </p>
                        <p> <button class="copy-btn" data-clipboard-text="${element.accout}">复制</button</p>
                    </div>
                    <div class="account-msg-item accout-pwd-text">
                        <b>密码:</b>
                        <!--<p> <span>被投诉 <span>5</span>次 <i class="ren">认</i> <i class="bao">保</i> <i class="shang">商</i> </span>-->
                        <p class="rent-msg ">
                            <span>${element.password}</span>
                            <!--<a href="#" class="text-purple dis-none">未认证</a>-->
                        </p>
                        <p> <button class="copy-btn" data-clipboard-text="${element.password}">复制</button</p>
                    </div>
                    <div class="account-msg-item scan-text">
                        <b>上号方式:</b>
                       
                        <p class="rent-msg ">
                            <span>上号器上号 <b>点击扫一扫扫码上号器二维码</b></span>
                         
                        </p>

                    </div>
                    <div class="account-msg-item self-msg-item">
                        <b>租用倒计时:</b>
                        <p> <span class="time-count" data-time='${element.stoptime-element.currenttime}'> <b>00</b> : <b>00</b> : <b>00</b></span></p>
                    </div>

                </div>
                <div class="account-msg-item my-loves-item">
                    <div class="container">
                        <p><span>账号有问题 <a href="complain.html">点击投诉</a></span></p>
                        <p class="scan-text">扫一扫</p>
                    </div>
                </div>
            </div>`;
                }


                $(".order-ing").html(html);
                if($('.time-count').data("time")>0){
                     myOrders.stopTime($('.time-count').data("time"), $('.time-count'));
                }else{
                     $('.time-count').html(` <b>00</b> : <b>00</b> : <b>00</b>`);
                }
               

            }
        });
        fetch("http://zushouyou.cn/Api/Index/completed", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form2
        }).then((response) => response.json()).then(function (data) {
            console.log(data);
            if (data.code == 200) {
                var over_html='';
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                     var dateParms = element.starttime;


                    if (dateParms instanceof Date) {
                        var datatime = dateParms;
                    }
                    //判断是否为字符串

                    if ((typeof dateParms == "string") && dateParms.constructor == String) {

                        //将字符串日期转换为日期格式
                        var datatime = new Date(parseInt(dateParms) * 1000);

                    }
                    over_html+=` <div class="account-content-item authenticated ${element.state==3?"":"evaluated"}" data-id=${element.id} data-type='2' data-indexi=${i}>
                <div class="container">
                    <h3>${element.title}</h3>
                    <p>${element.game_name}/${element.large_name}/${element.server_name}</p>
                    <div class="account-msg-item">
                        <b>租用日期:</b>
                        <!--<p> <span>被投诉 <span>5</span>次 <i class="ren">认</i> <i class="bao">保</i> <i class="shang">商</i> </span>-->
                        <p class="rent-msg ">
                        <span>
                             ${datatime.getFullYear()}-${datatime.getMonth()+1>10? datatime.getMonth()+1:"0"+ (datatime.getMonth()+1)}-${datatime.getDate()>10? datatime.getDate():"0"+ datatime.getDate()}
                            &nbsp; ${datatime.getHours()>=10? datatime.getHours():"0"+ datatime.getHours()}:${datatime.getMinutes()>10? datatime.getMinutes():"0"+ datatime.getMinutes()}:${datatime.getSeconds()>10? datatime.getSeconds():"0"+ datatime.getSeconds()}
                             </span>
                          
                            <a href="#" class="text-purple dis-none">未认证</a>
                        </p>
                    </div>
                    <div class="account-msg-item self-msg-item">
                        <b>租金套餐:</b>
                        <p> <span> ${element.hour}   ${element.waste}元</span></span>
                            </span>
                        </p><i class="hide">特价</i>
                    </div>



                </div>
                <div class="account-msg-item my-loves-item">
                    <div class="container">
                        <!--<span>删除发布</span>-->
                        <a href="go_evaluation.html?id=${element.id}">去评价</a>
                    </div>
                </div>
            </div>`;
                    
                }
                $(".order-done").html(over_html);
            }
        });

        //根据type判断是完成还是租用中
        

    },
    stopTime: function (diff, mark) {
        //倒计时
        var hour = 00;
        var minute = 00;
        var second = 00;
        var diff = parseInt(diff / 1000);
        if (diff > 0) {
            hour = Math.floor(diff / 60 / 60);
            minute = Math.floor(diff / 60) - hour * 60;
            second = Math.floor(diff) - minute * 60 - hour * 60 * 60;
        }
           if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute <10 ) {
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

            if (diff <= 0 || diff === NaN) {
                mark.html(` <b>00</b> : <b>00</b> : <b>00</b>`);
                clearInterval(timer);
                timer = null;
            }
        }, 1000);

    },
    ClickDiv:function () {
        //点击跳转到我租用详情
        $(".my-publish-box ").on("click",".account-content-item>.container",function (e) {  
                var id=$(this).parent().data("id");
                var indexi=$(this).parent().data("indexi");
                    var type=$(this).parent().data("type");
                var target=e.target;
               
                if(!$(target).hasClass("copy-btn")){
                    window.location.href=`my_rent_account.html?id=${id}&indexi=${indexi}&type=${type}`;
                }
        });
      }
};




$(function () {
    myOrders.init();
})