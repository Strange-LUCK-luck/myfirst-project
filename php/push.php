<?php
    $count = 1;
    $goods_id = $_GET["goods_id"];
    $username = $_GET["username"];

    $conn = mysqli_connect("localhost","root","root","demo");
    $sql = "SELECT MAX(index_id) index_id FROM shopxinxi";
    $rel = mysqli_query($conn,$sql);
    $neirong = mysqli_fetch_all($rel,MYSQLI_ASSOC);
    $data_serch = $neirong[0]['index_id'];

    // 获取对比的名字和商品id是否相同，获取数量
    $bijiao = "SELECT counts from shopxinxi where username='$username' and goods_id=$goods_id";

    $rel_push = mysqli_query($conn,$bijiao);
    $data_push = mysqli_fetch_row($rel_push);
    // echo json_encode($data_push);

    if($data_push !== null){
        $count = $count + $data_push[0];
        $gaibian = "UPDATE shopxinxi SET counts = $count WHERE username='$username' and goods_id=$goods_id";
        mysqli_query($conn,$gaibian);
        $arr = array("error" => 0, "date" => "您的宝贝又添多了");
        echo json_encode($arr);
    }else if($data_serch !== null){
        $data_serch = (int)$data_serch + 1;
        $count = (int)$count;
        $sql_push = "INSERT INTO shopxinxi (index_id,username,goods_id,counts) VALUE ($data_serch,'$username','$goods_id',$count)";
        mysqli_query($conn,$sql_push);
        $arr = array("error" => 0, "date" => "成功加入购物车");
        echo json_encode($arr);
    }else{
        $arr = array("error" => 1, "date" => "加入购物车失败");
        echo json_encode($arr);
    };

    // $data = mysqli_num_rows($rel);

    // $sql_push = "INSERT INTO shopxinxi(index,username,goods_id,count) VALUE ($data,$username,$goods_id,$count)"

?>