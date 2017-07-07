



$("#user_logo_file").change(function () {

            var fileObj = this.files[0]; // 获取文件对象
            var FileController = "http://192.168.12.106:8080/tengda_crm/customer/saveCpic.do"; // 接收上传文件的后台地址
            // FormData 对象
            var form = new FormData();
            form.append("customer_id", "ff422a979b1b43b6ab26d923d3e25e0c"); // 可以增加表单数据
            form.append("file", fileObj); // 文件对象
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        // alert("成");
                        var json_1 = JSON.parse(data.currentTarget.responseText);
                       
                        $("#user_logo_file").siblings("img").attr("src", json_1.picurl);
                        // http://192.168.12.106:8080/photo20170616/35a7b57835ca4160885f861cbf926aa0.png
                    } else {
                        alert("请检查网络重新上传");
                    
                    }
                }
            };
            xhr.send(form);
            xhr.onload = function () {
                // 
            };

        })