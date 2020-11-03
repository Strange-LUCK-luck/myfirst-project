<?php
    $count = $_GET["count"];
    $num = 20;
    $ber = $num * $count;
    $conn = mysqli_connect("localhost","root","root","demo");

    $sql = "SELECT * FROM goods limit $ber,$num";

    $rel = mysqli_query($conn,$sql);

    $data = mysqli_fetch_all($rel,MYSQLI_ASSOC);

    echo json_encode($data);

?>