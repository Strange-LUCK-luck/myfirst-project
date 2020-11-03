<?php
    $username = $_POST["username"];
    $password = $_POST["password"];

    $conn = mysqli_connect("localhost","root","root","demo");

    $sql = "SELECT * FROM user WHERE userinfo='$username'";

    $result = mysqli_query($conn, $sql);

    $panding = mysqli_fetch_array($result);

    if($panding['password'] == $password){
        echo json_encode(array("error" => 0,"date" => "成功登录"));
    }
    else{
        echo json_encode(array("error" => 1,"date" => "用户名或密码错误"));
    }
?>