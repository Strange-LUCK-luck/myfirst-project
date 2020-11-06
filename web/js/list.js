;
(function () {
    // 获取商品的容器
    var listbox = document.getElementsByClassName("listbox")[0];
    // 获取上一页
    var shang = document.getElementById("shangbtn");
    // 下一页
    var xia = document.getElementById("xiabtn");
    // 页面定位
    var countlist = parseInt(location.hash.slice(1)) || 0;
    // 页底页数的列表
    var yemianlist = document.getElementsByClassName("yemianlist");
    // 顶部的购物车
    var gouwuc = document.getElementsByClassName("gouwuche")[0];
    // 获取大容器，绑定页底的页数点击事件
    var yedi = document.getElementById("yedi");
    // 获取search检查是否是登录过来
    var searchname = window.location.search;
    // console.log(countlist);
    List(yemianlist, countlist, searchname);
    Get(listbox, countlist, function () {});
    // 定义一个get请求函数 渲染数据
    function Get(box, countlist, obj) {
        var listbox = box;
        var countlist = countlist;
        var callback = obj;
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var rel = JSON.parse(xhr.responseText);
                rel.forEach((value) => {
                    listbox.innerHTML += `
                  <div class="card mb-5 ml-3" style="max-width: 440px;">
                  <div class="row no-gutters">
                    <div class="col-md-4 d-flex" style="align-items: center;">
                      <img src="${value.goods_small_logo}" class="card-img-top imges">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body d-flex justify-content-lg-between flex-column">
                        <p class="card-title text-danger" style="height:4.3rem;overflow: hidden;"><a href="./xiangqing.html${searchname}#${value.goods_id}" style="text-decoration: none;color:black" target="_self">${value.goods_name}</a></p>
                        <h4 class="card-text text-truncate" style="color: red;">￥${value.goods_price}</h4>
                        <a class="btn btn-primary maidongxi" listdataid="${value.goods_id}">加入购物车</a>
                      </div>
                    </div>
                  </div>
                </div>`;
                });
                callback && callback();
                localStorage.clear();
                localStorage.setItem("listname", JSON.stringify(rel));
            }
        }

        xhr.open("get", "/demo/php/list.php?count=" + countlist, true);

        xhr.send();
    }
    // 定义一个页底的函数  跟着页面变化
    function List(yemianlist, countlist, searchname) {
        var yemianlist = yemianlist;
        var countlist = countlist - 1;
        for (let i in yemianlist) {
            // console.log(yemianlist[i]);

            yemianlist[i].innerHTML = `<a href="./list.html${searchname}#${countlist}" class="dingwei">${countlist}</a>`;
            countlist += 1;
            if (countlist <= 1) {
                yemianlist[i].innerHTML = "";
            };
        }
    };
    // 绑定上一页事件
    shang.onclick = function () {
        countlist -= 1;
        if (countlist < 0) {
            countlist = 0;
            alert("这是第一页");
            return;
        }
        var yemianlist = document.getElementsByClassName("yemianlist");
        List(yemianlist, countlist, searchname);
        listbox.innerHTML = "";
        Get(listbox, countlist, function () {});
    };
    // 绑定下一页事件
    xia.onclick = function () {
        countlist += 1;
        if (countlist < 0) {
            countlist = 0;
            alert("这是第一页");
            return
        }
        var yemianlist = document.getElementsByClassName("yemianlist");
        List(yemianlist, countlist, searchname);
        listbox.innerHTML = "";
        Get(listbox, countlist, function () {});
    }
    // 购物车按钮添加css样式和绑定点击事件
    var obj = {
        "display": "block",
        "margin": "0px auto",
    }
    for (let i in obj) {
        gouwuc.style[i] = obj[i]
    }
    // 点击去购物车
    gouwuc.onclick = function () {
        if (searchname) {
            window.location.href = `./shop.html${searchname}`;
        } else {
            gouwuc.innerHTML = "请登录";
            setTimeout(function () {
                window.location.href = `./dengl.html`;
            }, 2000);
        }
    }
    // 页面底部的点击
    yedi.addEventListener("click", function (e) {
        if (e.target.className === "dingwei") {
            console.log("000")
            var cl = parseInt(location.hash.slice(1)) || 0;
            var cl1 = cl - 1;
            listbox.innerHTML = "";
            List(yemianlist, cl1, searchname);
            Get(listbox, cl1, function () {});
            console.log(cl)
        }
    })
    // 点击加入购物车
    yedi.addEventListener("click", function (e) {
        var mai = document.getElementsByClassName("maidongxi");
        if (e.target.className.includes("maidongxi")) {
            e.preventDefault();
            if (searchname) {
                var goodsid = e.target.getAttribute("listdataid");
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var rel = JSON.parse(xhr.responseText) || [];
                        if (rel.error) {
                            alert(rel.date);
                        } else {
                            alert(rel.date);
                        }
                    }
                }
                xhr.open("get", "/demo/php/push.php" + window.location.search + "&count=1&goods_id=" + goodsid, true);
                xhr.send();

            } else {
                for (let i in mai) {
                    mai[i].innerHTML = "请登录";
                }
                setTimeout(function () {
                    window.location.href = `./dengl.html`;
                }, 2000);
            }
        }
    });
})();