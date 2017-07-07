//个人中心

var uesrCenter = {
    init: function () {
        this.dataLoad();
    },
    dataLoad: function () {
        //加载数据

        var form = new FormData();
        form.append("uid", loginName); // 

        fetch("http://zushouyou.cn/Api/Index/ge", {
            method: 'POST',
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: form
        }).then((response) => response.json()).then(function (data) {
            console.log(data);
            if (data.code == 200) {
                $(".user-logo-box").html(` <a href="personal_msg.html"> <img src="http://zushouyou.cn${data.data.img}" alt=""></a>
        <span>${data.data.nickname} <i>${data.data.lever==1?"普通":"商家"}</i></span>`);
                $(".user-money-text").html(` <div>
        <b>${data.data.wallet}</b>
        <span>账户余额</span>
    </div>
     <div>
        <b>${data.data.integral}</b>
        <span>积分</span>
    </div>`);
            }
        })
    }
}

$(function () {
    uesrCenter.init();
});