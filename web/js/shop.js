;
(function () {
    // 获取用户名
    var username = window.location.search.slice(1);
    var listbox = document.getElementById("shoplist");
    var gouwuche = document.getElementById("gouwuche");
    var zong = document.getElementById("zongji");
    var head = document.getElementById("head");
    var searchname = window.location.search;

    if (!username) {
        alert("请登录");
        window.location.href = "/demo/web/html/dengl.html";
    } else if (username !== document.cookie) {
        alert("请重新登录");
        window.location.href = "/demo/web/html/dengl.html";
    }

    function get(username, listbox, url, obj) {
        var username = username;
        var listbox = listbox;
        var callback = obj;
        var url = url;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var rel = JSON.parse(xhr.responseText);
                callback && callback(rel);
            }
        }
        xhr.open("get", url + "?" + "username=" + username, true);
        xhr.send();
    }
    get(username.split("=")[1], listbox, "/demo/php/shop.php", function (rel) {
        // 将获取的数据保存到本地
        rel.forEach((value) => {
            value.isChecked = false;
        })
        localStorage.setItem("shopxinxi", JSON.stringify(rel));
        randen();
        jisuan();
    })
    // 定义渲染页面方法
    function randen() {
        listbox.innerHTML = "";
        var local = [];
        // 从本地获取数据
        var shopdata = JSON.parse(localStorage.getItem("shopxinxi")) || [];
        // 判定是否全选
        var xuanze = shopdata.every(function (value) {
            return value.isChecked;
        });

        console.log(xuanze)
        head.innerHTML = `<li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
            <input type="checkbox" id="quanxuan" class="quanxuan" ${xuanze ? 'checked' : ''}>
            <span>全选</span>
        </div>
        <span>信息</span>
        <span id="save">保存</span>
    </li>`;

        // quanxuancheck.isChecked = xuanze;

        // console.log(quanxuancheck.isChecked);

        // console.log(shopdata)
        shopdata.forEach((value) => {
            listbox.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
       <input id="shopcheck" data-goodsid="${value.goods_id}" type="checkbox" ${value.isChecked ? "checked" : ""}>
       <img src="${value.goods_small_logo}" alt="" style="height: 4rem;">
       <p style="width: 25rem;"><a href="./xiangqing.html${searchname}#${value.goods_id}" style="color:black;">${value.goods_name}</a><span style="display:block;color:red">${value.goods_price}</span></p>
       <div>
           <span class="badge badge-primary badge-pill pointer" id="jian" data-goodsid="${value.goods_id}">-</span>
           <span class="badge badge-primary badge-pill">${value.count}</span>
           <span class="badge badge-primary badge-pill pointer" id="jia" data-goodsid="${value.goods_id}">+</span>
           <span class="badge badge-primary badge-pill pointer" id="shan" data-goodsid="${value.goods_id}">删除</span>
       </div>
   </li>`;
            var id = {
                "username": username.split("=")[1],
                "goods_id": value.goods_id,
                "countss": `${value.count}`,
            };
            local.push(id);
        });
        localStorage.setItem("meirxinxi", JSON.stringify(local));
    }

    // 定义计算总金额的方法
    function jisuan() {
        var shopdata = JSON.parse(localStorage.getItem("shopxinxi")) || [];
        var zongjine = 0;
        shopdata.forEach((value) => {
            if (value.isChecked) {
                zongjine += value.goods_price * value.count;
            }
        })
        zong.innerHTML = `总计：￥${zongjine.toFixed(2)}`;
        // console.log(zongjine);
    }
    // 绑定增加,减少，删除
    gouwuche.addEventListener("click", function (e) {
        if (e.target.id === "jian") {
            // console.log("aaa")
            var shopdata = JSON.parse(localStorage.getItem("shopxinxi")) || [];
            var id = e.target.getAttribute("data-goodsid");
            var goods = shopdata.find(function (value) {
                return value.goods_id === id;
            });
            goods.count = parseInt(goods.count) - 1;
            if (goods.count <= 0) {
                goods.count = 1;
                alert("请至少买一件");
            }
            localStorage.removeItem("shopxinxi");
            localStorage.setItem("shopxinxi", JSON.stringify(shopdata));
            randen();
            jisuan();
        }
    })

    gouwuche.addEventListener("click", function (e) {
        if (e.target.id === "jia") {
            // console.log("aaa")
            var shopdata = JSON.parse(localStorage.getItem("shopxinxi")) || [];
            var id = e.target.getAttribute("data-goodsid");
            var goods = shopdata.find(function (value) {
                return value.goods_id === id;
            });
            goods.count = parseInt(goods.count) + 1;
            if (goods.count <= 0) {
                goods.count = 1;
                alert("请至少买一件");
            }
            // console.log(goods.count)
            localStorage.removeItem("shopxinxi");
            localStorage.setItem("shopxinxi", JSON.stringify(shopdata));
            randen();
            jisuan();
        }
    })

    gouwuche.addEventListener("click", function (e) {
        if (e.target.id === "shan") {
            // console.log("aaa")
            var shopdata = JSON.parse(localStorage.getItem("shopxinxi")) || [];
            // 获取这条数据的id
            var id = e.target.getAttribute("data-goodsid");
            // 根据id定位数据的索引
            var index = shopdata.findIndex(function (value) {
                return value.goods_id === id;
            });
            // 索引删除元素
            shopdata.splice(index, 1);

            localStorage.removeItem("shopxinxi");
            localStorage.setItem("shopxinxi", JSON.stringify(shopdata));
            console.log(JSON.parse(localStorage.getItem("shopxinxi")))
            randen();
            jisuan();
        }
    })

    // 绑定全选、单选
    gouwuche.addEventListener("click", function (e) {
        if (e.target.id === "quanxuan") {
            var shopdata = JSON.parse(localStorage.getItem("shopxinxi")) || [];
            shopdata.forEach(function (value) {
                value.isChecked = e.target.checked;
            });
            localStorage.removeItem("shopxinxi");
            localStorage.setItem("shopxinxi", JSON.stringify(shopdata));
            randen();
            jisuan();
            push();
        }
    });
    gouwuche.addEventListener("click", function (e) {
        if (e.target.id === "shopcheck") {
            var shopdata = JSON.parse(localStorage.getItem("shopxinxi")) || [];
            var id = e.target.getAttribute("data-goodsid");
            var goods = shopdata.find(function (value) {
                return value.goods_id === id;
            })
            goods.isChecked = e.target.checked;
            // console.log(goods);
            localStorage.removeItem("shopxinxi");
            localStorage.setItem("shopxinxi", JSON.stringify(shopdata));
            // console.log(JSON.parse(localStorage.getItem("shopxinxi")));
            randen();
            jisuan();
        }
    });
    gouwuche.addEventListener("click", function (e) {
        if (e.target.className.includes("dongzuo")) {
            var shopdata = JSON.parse(localStorage.getItem("shopxinxi")) || [];

            var obj = `${shopdata.value}`;
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {

                }
            };

            xhr.open("post", "/demo/php/shop_push.php", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(obj);
        }
    });
    // 绑定保存事件
    gouwuche.addEventListener("click", function (e) {
        if (e.target.id === "save") {
            var str = "data=" + JSON.stringify(window.localStorage.meirxinxi) + "&username=" + username;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var arr = JSON.parse(xhr.responseText);
                    if(arr.error){
                        alert(arr.data);
                    }else{
                        alert(arr.data);
                    }
                }
            }
            xhr.open("post", "/demo/php/change.php", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(str);
        }
    })
})();