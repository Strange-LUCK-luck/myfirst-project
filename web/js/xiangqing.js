;
(function () {
  var username = window.location.search.slice(1);
  var gouwuc = document.getElementsByClassName("gouwuc")[0];
  var shopid = location.hash.slice(1);
  var listdata = JSON.parse(localStorage.getItem("listname"));
  var xqing = document.getElementsByClassName("xqingbox")[0];
  if (!username) {
    alert("请登录");
    window.location.href = "/demo/web/html/dengl.html";
  } else if (username !== document.cookie) {
    alert("请重新登录");
    window.location.href = "/demo/web/html/dengl.html";
  };
  // console.log(listdata);
  for (let i in listdata) {
    if (listdata[i].goods_id === shopid) {
      console.log(listdata[i].goods_name);
      var pinpai = listdata[i].cat_three_id || "";
      xqing.innerHTML = `<div class="row no-gutters">
            <div class="col-md-4">
              <img src="${listdata[i].goods_big_logo}" class="card-img" alt="" style="height:100%">
            </div>
            <div class="col-md-8">
              <div class="card-body d-flex justify-content-between flex-column"
              style="height:100%">
                <h5 class="card-title">${listdata[i].cat_id}${listdata[i].cat_two_id}</h5>
                <h5 class="card-title">${pinpai}</h5>
                <p class="card-text">${listdata[i].goods_name}</p>
                <h5 class="card-text" style="color: red">￥${listdata[i].goods_price}</h5>
                <button type="button" class="btn btn-outline-danger gouwuche" listdataid="${listdata[i].goods_id}">加入购物车
                </button>
              </div>
            </div>
          </div>`;
    }
  };
  xqing.addEventListener("click", function (e) {
    if (e.target.className.includes("gouwuche")) {
      if (username) {
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
  gouwuc.onclick = function () {
    if (username) {
      window.location.href = `./shop.html${window.location.search}`;
    } else {
      gouwuc.innerHTML = "请登录";
      setTimeout(function () {
        window.location.href = `./dengl.html`;
      }, 2000);
    }
  };
})();