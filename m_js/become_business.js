


//入驻规则
$(function () {
    fetch("http://zushouyou.cn/Api/Index/settled", {
        method: 'POST',
        //headers: myHeaders,
        mode: 'cors',
        cache: 'default'
        // body: form
    }).then((response) => response.json()).then(function (data) {
        if (data.code == 200) {
            $('.rz-content').html(data.data.content);
        }

    });

    var chk_ok=false;
    $("#read_agreement_chk").change(function () {
        if ($(this).is(":checked")) {
            $(this).siblings("span").addClass("active");
            chk_ok=true;
        } else {
            $(this).siblings("span").removeClass("active");
             chk_ok=false;
        }
    });



    $(".open-btn").click(function (e) {  
        e.preventDefault(); 
        if(chk_ok){
            window.location.href='opening_service.html';
        }
    });
})