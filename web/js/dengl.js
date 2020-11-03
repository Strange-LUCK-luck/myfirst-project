;
(function () {
    // 获取用户名和密码
    var user = document.getElementById("user");
    var password = document.getElementById("password");
    // 获取提示的容器
    var help = document.getElementById("help");
    // 获取登录和注册按钮
    var btn = document.getElementById("sub");
    var btn1 = document.getElementById("sub1");

    // 绑定登录事件
    btn1.addEventListener("click", function (e) {
        // 清除默认
        e.preventDefault();
        // 判断登录是否为空
        if (!user.value) {
            help.innerHTML = "请输入用户名和密码";
            password.style.borderColor = "red";
            user.style.borderColor = "red";
            return;
        };
        if(!password.value){
            help.innerHTML = "请输入用户密码";
            password.style.borderColor = "red";
            return;
        }

        // 用户名和密码
        var str = "username=" + user.value + "&password=" + password.value;
        // 发请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var panding = JSON.parse(xhr.responseText);
                // 判定是否登录成功
                if (!panding.error) {
                    password.style.borderColor = "";
                    user.style.borderColor = "";
                    console.log(panding);
                    help.innerHTML = "登录成功";
                    document.cookie = `username=${user.value};password=${password.value};max-age=-1;path=/`;
                    document.cookie = `username=${user.value};max-age=3600;path=/`;
                    // 登录成功跳转
                    setTimeout(function () {
                        window.location.href = `../html/list.html?username=${user.value}`;
                    }, 1000);
                } else {
                    password.style.borderColor = "red";
                    user.style.borderColor = "red";
                    help.innerHTML = panding.date;
                }
            }
        };
        xhr.open("post", "/demo/php/dengl.php", true);
        // 请求头
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(str);
    })
    // 点击注册跳转
    btn.onclick = function () {
        location.href = "./zuche.html";
        return false;
    }
})();