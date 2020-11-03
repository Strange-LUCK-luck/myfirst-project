<?php
    $name = $_GET["username"];
    $password = $_GET["password"];

    $conn = mysqli_connect("localhost","root","root","demo");

    $sql = "INSERT INTO user(userinfo,password) VALUE ('$name','$password')";

    $result = mysqli_query($conn, $sql);

    $fh = mysqli_affected_rows($conn);

    if($fh == 0){
        echo json_encode(array("error" => 0,"date" => "注册失败"));
    }
    else{
        echo json_encode(array("error" => 1,"date" => "注册成功"));
    }
?>