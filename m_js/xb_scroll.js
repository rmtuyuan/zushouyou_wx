 (function ($, window, document, undefined) {

     $.fn.xb_scroll = function (options) {
         var scroll_config = {
             "speed": 25,
             "isMaxHeight": false,
             "barOffTop": 2,
             "barOffBottom": 2,
             "barOffRight": 2,
             "boxWidth": 10,
             "barWidth": 10,
             "childPanel": "._panel-box",
             "boxClass": "_scroll_box",
             "barClass": "_scroll_bar"
         }

         var opts = $.extend({}, scroll_config, options)
         var w = {};
         w.FlagName = "_Prefix";
         var elem = $(this),
             id = $(this).attr("id"),
             elChild;

         elem.css({
             "position": "absolute",
             "overflow": "hidden"
         });
         elChild = elem.find(opts.childPanel);
         $(elChild[0]).css({
             "position": "relative",
             "width": "100%",
             "top": "0"
         });
         $(elChild[1]).css({
             "position": "absolute",
             "width": "100%",
             "bottom": "0",
             "display": "block"
         });

         if (opts.isMaxHeight) {
             var sham = $("<div style='position:relative;background:transparent;z-index:-1;height:" +
                 elChild.outerHeight() + "px'></div>");
             sham.appendTo(elem);
         }

         var jqScrollBox = $("<div style='position:absolute;width:" + opts.boxWidth + "px;top:" + opts.barOffTop + "px;right:" + opts.barOffRight + "px;bottom:" + opts.barOffBottom + "px;border-radius: 5px;background: rgba(255,255,255,0.3);'></div>");
         jqScrollBox.addClass(opts.boxClass);
         var jqScrollBar = $("<div style='position:absolute;width:" + opts.barWidth + "px;top:" + opts.barOffTop + "px;right:" + opts.barOffRight + "px;border-radius: 5px;background: rgba(255,255,255,0.5);'></div>");
         jqScrollBar.addClass(opts.barClass);
         jqScrollBox.appendTo(elem);
         jqScrollBar.appendTo(elem);

         var iRate = elem.innerHeight() / elChild.outerHeight();
         var iScrollBoxHeight = jqScrollBox.innerHeight();
         var iScrollBarHeight = Math.round(iRate * iScrollBoxHeight);
         if (iRate >= 1) {
             jqScrollBox.hide();
             jqScrollBar.css("height", 0);
         } else {
             jqScrollBar.css("height", iScrollBarHeight);
         }
         var iMinTop = elem.innerHeight() - elChild.outerHeight();
         var sMaxTop = iScrollBoxHeight - iScrollBarHeight + opts.barOffTop;

         var sMouseWheel = "mousewheel";
         if (!("onmousewheel" in document)) { /*浏览器鼠标滚动事件的简单兼容*/
             sMouseWheel = "DOMMouseScroll";
         }
         elem.on(sMouseWheel, function (ev) {
             ev.preventDefault();
             ev = ev.originalEvent;
             if (iRate >= 1)
                 return;
             if (ev.wheelDelta) {
                 iWheelDelta = ev.wheelDelta / 120;
             } else {
                 iWheelDelta = -ev.detail / 3;
             }
             if (iMinTop > 0) {
                 elChild.css("top", 0);
                 return;
             }
             var iTop = parseInt(elChild.css("top"));
             var iTop = iTop + opts.speed * iWheelDelta;
             iTop = iTop > 0 ? 0 : iTop;
             iTop = iTop < iMinTop ? iMinTop : iTop;
             elChild.css("top", iTop);
             fnScrollContent(elem, elChild, jqScrollBox, jqScrollBar, opts.barOffTop);
         });

         var isS_B = false,
             doc_py, barTop, conTop; /*滚动条拖拽*/
         jqScrollBar.on("mousedown", function (ev) {
             isS_B = true;
             elem.css({
                 "-moz-user-select": "none",
                 "-khtml-user-select": "none",
                 "user-select": "none"
             });
             //jqScrollBar.css({"background":"#eee"});
             barTop = parseInt(jqScrollBar.css("top"));
             conTop = parseInt(elChild.css("top"));
         });
         $(document).on("mousedown", function (ev) {
             if (isS_B)
                 doc_py = ev.pageY;
         });
         $(document).on("mousemove", function (ev) {
             if (isS_B) {
                 var rate = ev.pageY - doc_py;

                 var sTop = barTop + rate;
                 sTop = sTop < opts.barOffTop ? opts.barOffTop : sTop;
                 sTop = sTop > sMaxTop ? sMaxTop : sTop;
                 jqScrollBar.css("top", sTop);

                 var jqCon_rate = elChild.outerHeight() * (rate / iScrollBoxHeight) * -1;
                 var iTop = conTop + jqCon_rate;
                 iTop = iTop > 0 ? 0 : iTop;
                 iTop = iTop < iMinTop ? iMinTop : iTop;
                 elChild.css("top", iTop);
             }
         });
         $(document).on("mouseup", function (ev) {
             elem.css({
                 "-moz-user-select": "",
                 "-khtml-user-select": "",
                 "user-select": ""
             });
             //jqScrollBar.css({"background":"rgba(255,255,255,0.5)"});
             isS_B = false;
         });
         /*滚动事件*/
         var touch_py;
         var rate;
         elem[0].addEventListener('touchstart', function (ev) {
             ev.preventDefault();
             var touch = ev.targetTouches[0];
             isS_B = true;
             if (isS_B) {
                 touch_py = touch.pageY;
             }

             elem.css({
                 "-moz-user-select": "none",
                 "-khtml-user-select": "none",
                 "user-select": "none"
             });
             //jqScrollBar.css({"background":"#eee"});
             barTop = parseInt(jqScrollBar.css("top"));
             conTop = parseInt(elChild.css("top"));


         }, false);
         elem[0].addEventListener('touchmove', function (ev) {
             ev.preventDefault();
             if (isS_B) {
                 var touch = ev.targetTouches[0];
                 rate = (touch_py - touch.pageY) * -1;


             }


         }, false);
         elem[0].addEventListener('touchend', function (ev) {
             ev.preventDefault();
             var brate = -1 * rate;
             var target = ev.target;
             if ($(target).parents("._panel-box").hasClass("modal-content-front")) {
                 if (rate < 0) {
                     rate += parseInt($(elChild[0]).css("top").slice(0, -2));
                 } else {
                     rate = parseInt($(elChild[0]).css("top").slice(0, -2)) + rate;
                 }

                 //console.log(parseInt(elChild.css("height").slice(0,-2)));
                 //console.log()
                 if (rate < -1 * parseInt($(elChild[0]).css("height").slice(0, -2)) + 270) {
                     $(elChild[0]).css("top", -1 * parseInt($(elChild[0]).css("height").slice(0, -2)) + 270 + "px");
                 } else if (rate > 0) {
                     $(elChild[0]).css("top", 0 + "px");
                 } else {
                     $(elChild[0]).css("top", rate + "px");
                 }
                 $(elChild[1]).css("bottom", "0")
             } else {
               




                 console.log(parseInt($(".modal-content-back").css("height").slice(0, -2)));
                 
                
                 if (parseInt($(".modal-content-back p").length) * 45 > 225) {
                            
                         rate = parseInt($(elChild[1]).css("top").slice(0, -2)) + rate;
                        
                     if (rate < (-1 * parseInt($(".modal-content-back p").length) * 45  + 225)) {
                         $(elChild[1]).css("top", (-1 * parseInt($(".modal-content-back").css("height").slice(0, -2)) + 270 )+ "px");
                       
                     } else if (rate > 0) {
                         $(elChild[1]).css("top", 0 + "px");
                     } else {
                         $(elChild[1]).css("top", rate + "px");
                     }
                 } else {

                     $(elChild[1]).css("bottom", 0 + "px");

                 }



             }




             elem.css({
                 "-moz-user-select": "",
                 "-khtml-user-select": "",
                 "user-select": ""
             });
             //jqScrollBar.css({"background":"rgba(255,255,255,0.5)"});
             isS_B = false;

         }, false);

         elChild.bind('DOMNodeInserted', function (e) { /*容器内元素添加*/
             fnContentResize();
         });
         elChild.bind('DOMNodeRemoved', function (e) { /*容器内元素移除*/
             setTimeout(function () {
                 fnContentResize();
             }, 100);
         });

         function fnContentResize() /*容器内元素变动更新滚动*/ {
             if (opts.isMaxHeight) {
                 sham.css({
                     "height": elChild.outerHeight() + "px"
                 });
             }
             iRate = elem.innerHeight() / elChild.outerHeight();
             if (iRate >= 1) {
                 jqScrollBox.hide();
                 jqScrollBar.css("height", 0);
                 elChild.css("top", 0);
                 return;
             }
             jqScrollBox.show();
             iScrollBoxHeight = jqScrollBox.outerHeight();
             iScrollBarHeight = Math.round(iRate * iScrollBoxHeight);
             jqScrollBar.css("height", iScrollBarHeight);
             iMinTop = elem.innerHeight() - elChild.outerHeight();
             sMaxTop = iScrollBoxHeight - iScrollBarHeight;
             var nowConTop = parseInt(elChild.css("top"));
             fnScrollContent(elem, elChild, jqScrollBox, jqScrollBar, 0, 0);
             if (nowConTop < iMinTop) {
                 elChild.css("top", iMinTop);
                 jqScrollBar.css("top", sMaxTop);
             }
         }

         function fnScrollContent(jqWrapper, jqContent, jqFollowWrapper, jqFlollowContent, iOffset) {
             var rate = parseInt(jqContent.css("top")) / (jqContent.outerHeight() - jqWrapper.innerHeight()) //卷起的比率
             var iTop = (jqFlollowContent.outerHeight() - jqFollowWrapper.innerHeight()) * rate +
                 iOffset;
             jqFlollowContent.css("top", iTop);

         }

         elem.data(w.FlagName, true);
     }

 })(jQuery, window, document);

 //调用
 $(function () {
     $(".modal-content-btm").xb_scroll({
         "isMaxHeight": true
     });
 })