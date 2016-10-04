<?php		
	include('connect.php');
	$date = date('Y-m-d');
	$time = date('Y-m-d H:i:s');
	$temperature = exec('cat /sys/class/thermal/thermal_zone0/temp');
	$temperature=$temperature/1000;
	$con = mysqli_connect($hostname, $username, $password,$database);

	if (mysqli_connect_errno())
		{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
	mysqli_query($con,"INSERT INTO saveTemp (temperature, date, time)
	VALUES ('$temperature', '$date','$time')");

	mysqli_close($con);
?>
