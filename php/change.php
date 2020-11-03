<?php
    $conn = mysqli_connect("localhost","root","root","demo");
    // 清理之前表内的数据 思路 先查询有几条 循环删除
    $name = $_POST['username'];
    $name1 = explode("=",$name);
    $name2 = $name1[1];
    $shan = "SELECT * FROM shopxinxi WHERE username='$name2'";
    $chanchu = mysqli_query($conn,$shan);
    $xunhuan = mysqli_num_rows($chanchu);
    $shancu = "DELETE FROM shopxinxi WHERE username='$name2'";
    for($dd = 0; $dd < $xunhuan; $dd++){
        mysqli_query($conn,$shancu);
    };
    
    // 获取最大的主键值
    $str = "SELECT MAX(index_id) index_id FROM shopxinxi;";
    $resouse = mysqli_query($conn,$str);
    $val = mysqli_fetch_all($resouse,MYSQLI_ASSOC);
    $index_count = $val[0]['index_id'];
    $data_serch = $index_count;
    // 获取要插入的数据
    $data = html_entity_decode($_POST["data"],true);
    $data1 = json_decode($data);
    $data2 = substr($data1,2,-2);
    // 分割成数组
    $xhr = explode("},{",$data2);
    // 定义比较值,保存插入了几条,与查询结果对比
    $shuliang = 0;
    // 循环插入数据
    foreach($xhr as $a){
        // print_r($a);
        $b = explode(",",$a);
        $arrvalue = array();
        // 循环分离需要的值
        foreach($b as $c){
            $push = explode(":",$c);
            $pushvlaue = substr($push[1],1,-1);  
            array_push($arrvalue,$pushvlaue);
        };
        // 主键值
        $data_serch = $data_serch + 1;
        // 用户名
        $username = $arrvalue[0];
        // 商品id
        $goods_id = $arrvalue[1];
        // 商品数量
        $count = (int)$arrvalue[2];
        // 开始插入
        $tring = "INSERT INTO shopxinxi (index_id,username,goods_id,counts) VALUE ($data_serch,'$username','$goods_id',$count)";
        $resouse = mysqli_query($conn,$tring);
        $resu = $arrvalue[0];
        // 每插入一条查询一次
        $chaxun = "SELECT * FROM shopxinxi WHERE username='$resu'";
        $cha = mysqli_query($conn,$chaxun);
        $shuliang = mysqli_num_rows($cha);
        // print_r($shuliang);
    };
    // 比较查询结果返回给js的数据
    // print_r(count($xhr));
    if($shuliang == count($xhr)){
        echo json_encode(array('error' => 0,'data' => "保存成功"));
    }else{
        echo json_encode(array("error" => 1,"data" => "保存失败"));
    };
    // print_r($xhr);
?>