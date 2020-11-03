<?php
    $username = $_GET['username'];

    $conn = mysqli_connect("localhost","root","root","demo");

    $sql = "SELECT * FROM shopxinxi WHERE username='$username'";

    $sul = mysqli_query($conn,$sql);

    $data = mysqli_fetch_all($sul,MYSQLI_ASSOC);

    $b = array();

    // print($data);

    foreach($data as $date){
        // echo json_encode($date['goods_id']);
        $a = $date['goods_id'];
        $count = $date['counts'];
        // echo json_encode($a);
        $sql1 = "SELECT * FROM goods WHERE goods_id='$a'";
        $val = mysqli_query($conn,$sql1);
        $shuju = mysqli_fetch_array($val,MYSQLI_ASSOC);
        $shuju["count"] = $count;
        // echo json_encode($shuju);
        // $shop = array_push($shuju,$count);
        array_push($b,$shuju);
    }

    echo json_encode($b);

?>