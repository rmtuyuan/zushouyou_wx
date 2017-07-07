/**
 * Created by Administrator on 2017/6/9.
 */
$(function () {
    var ok = false;
    $(".textarea-box>textarea").keyup(function () {
        var leng = $(this).val().length;
        if (leng > 0) {
            ok = true;
        } else {
            ok = false;
        }
        if (leng <= 300) {
            $(".m-count").html(leng)
        }

    });

    $(".textarea-box>textarea").blur(function () {
        var leng = $(this).val().length;
        if (leng > 0) {
            ok = true;
        } else {
            ok = false;
        }
        if (leng <= 300) {
            $(".m-count").html(leng)
        }

    });


    $(".login-btn.next-step").click(function (e) {
        e.preventDefault();
       if (ok) {
            var form = new FormData();
        form.append("uid", loginName); // 文件对象
        form.append("content", $(".feedback-content").val()); // 文件对象

        form.append("status", 2); // 
        fetch("http://zushouyou.cn/Api/Index/feedback", {
            method: 'POST',
            //headers:{"Content-type": "application/json; charset=UTF-8" },
            mode: 'cors',
            // cache: 'no-cache',
            body: form
        }).then((response) => response.json()).then(function (data) {
            //console.log(data)
            if (data.code == 200) {
                window.location.href='index.html';
            }
        });
       }
    });
})