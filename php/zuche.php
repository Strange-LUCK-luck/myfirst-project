<?php
    $name = $_GET["username"];

    $conn = mysqli_connect("localhost","root","root","demo");

    $sql = "SELECT * FROM user WHERE userinfo='$name'";

    $result = mysqli_query($conn, $sql);

    $fh = mysqli_num_rows($result);

    if($fh == 0){
        echo json_encode(array("error" => 0,"date" => "恭喜可以使用"));
    }
    else{
        echo json_encode(array("error" => 1,"date" => "用户名被占用"));
    }
?>