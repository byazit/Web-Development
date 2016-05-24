<?php

header('Content-Type: application/json');
include('connect.php');
$con = mysqli_connect($hostname, $username, $password,$database);
//$con = mysqli_connect("localhost","root","#3417#","northwind");

// Check connection
if (mysqli_connect_errno($con))
{
    echo "Failed to connect to DataBase: " . mysqli_connect_error();
}else
{
    $data_points = array();
    
    $result = mysqli_query($con, "SELECT * FROM saveTemp ORDER BY id DESC 
        LIMIT 0,100");
    
    while($row = mysqli_fetch_array($result))
    {        
        $point = array("label" => $row['time'] , "y" => $row['temperature']);
        
        array_push($data_points, $point);        
    }
    
    echo json_encode($data_points, JSON_NUMERIC_CHECK);
}
mysqli_close($con);




?>
