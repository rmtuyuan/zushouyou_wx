// fetch('/users', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Hubot',
//     login: 'hubot',
//   })
// })
(function ($) {
    //获取url参数的封装函数
    //decodeURI() 和 decodeURIComponent()
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
})(jQuery);

//fetch  的方法
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
//myHeaders.append("Content-Length", content.length.toString());
//myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

// fetch("",  { 
//                 method: 'POST',
//                 headers: myHeaders,
//                 mode: 'cors',
//                 cache: 'default' ,
//                 body:JSON.stringify({})
//              })
// .then(function(response){
//     // do something...
// })
// fetch(url).then(function(response) {
//   return response.json();
// }).then(function(data) {
//   console.log(data);
// })

//loginname  获取
var loginName = null; //全局 loginName
var cookie_name = "zushouyouid";
$(function () {
    //loginName
    //$.cookie("tenda_user",loginName,{expires:7});
    //var loginName= $.cookie(cookie_name);
    // $.cookie(cookie_name,'') //清空cookie
    loginName = $.cookie(cookie_name);
  
   

})

