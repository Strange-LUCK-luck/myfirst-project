;
(function () {
    // 获取用户名
    var name = document.getElementById("user");
    // 提示框
    var help = document.getElementById("help");
    // 两个密码
    var passw1 = document.getElementById("passw1");
    var passw2 = document.getElementById("passw2");
    // 两个按钮
    var sub = document.getElementById("sub");
    var sub1 = document.getElementById("sub1");
    // 开关，以防多次点击触发提交
    var looki = false;
    //定义正则表达式
    var str = /^[a-zA-Z]\w{2,9}$/;
    // 焦点失去时验证
    name.onblur = function () {
        // 测试正则
        var pd = str.test(name.value);
        // 判定正则，成功往下走
        if (!pd) {
            help.style.color = "red";
            name.style.border = "2px solid red";
            help.innerHTML = "请输入正确的用户名";
            looki = false;
            return;
        }
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var cuowu = JSON.parse(xhr.responseText);
                // 判定是否有错
                if (cuowu.error === 0) {
                    name.style.border = "2px solid green";
                    help.innerHTML = cuowu.date;
                    looki = true;
                } else {
                    help.style.color = "red";
                    help.innerHTML = cuowu.date;
                    name.style.border = "2px solid red";
                    looki = false;
                };
            };
        };
        xhr.open("get", "/demo/php/zuche.php?username=" + name.value + "&", true);
        xhr.send();
    };
    // 验证两次密码是否错误
    passw2.onblur = function () {
        if (passw1.value !== passw2.value) {
            passw1.style.border = "2px solid red";
            passw2.style.border = "2px solid red";
            looki = false;
            alert("密码不一致");
            return;
        }
        passw1.style.border = "2px solid green";
        passw2.style.border = "2px solid green";
        looki = true;
    };
    // 注册按钮事件
    sub.onclick = function () {
        // 检查开关
        if (!looki) {
            help.style.color = "red";
            name.style.border = "2px solid red";
            console.log("请再次检查");
            return;
        }
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var fanhui = JSON.parse(xhr.responseText);
                if (fanhui.error) {
                    alert(fanhui.date);
                } else {
                    alert(fanhui.date);
                    looki = true;
                }
            };
        };
        xhr.open("get", "/demo/php/zuche1.php?username=" + name.value + "&password=" + passw2.value + "&", true);
        xhr.send();
        // 关闭开关
        looki = false; 
        return false;
    };
    sub1.onclick = function () {
        location.href = "./dengl.html";
        return false;
    }
})();