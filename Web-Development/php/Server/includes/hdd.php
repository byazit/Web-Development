<?php 
	$ip=$_SERVER['REMOTE_ADDR'];
//$ip="94.255.149.252";
?>

<div id="tempHdd">
	<h3>Main storage</h3>
	<div class="hddInfo">
		<?php 
		//getting information for HDD
			$info= exec('df -T -h /dev/root');
			echo "<br>Size  Used  Free<br>";
			for($i=20;$i<37;$i++)
				echo $info[$i];
				if($i==25)
					echo "   ";
				echo $info[$i];
				if($i==30)
					echo "   ";
				echo $info[$i];
		?>
	</div>
	<div>
		<canvas id="canvas" height="70" width="70"></canvas>
	</div>
</div>

<div id="tempHdd2">
	<h3>Extra storage</h3>
	<div class="hddInfo">
		<?php 
		//getting information for HDD
			$info= exec('df -T -h /dev/sda2');
			echo "<br>Size  Used  Free<br>";
			for($i=20;$i<37;$i++)
				echo $info[$i];
				if($i==25)
					echo "   ";
				echo $info[$i];
				if($i==30)
					echo "   ";
				echo $info[$i];
		?>
	</div>
	<div>
		<canvas id="extraHdd" height="70" width="70"></canvas>
	</div>
</div>

<div class="ssh">
	<h3>SSH</h3>
	<?php 
	//getting information for HDD
		echo $info= exec('who -q');
	?>
</div>
	<?php
		/*echo shell_exec('python hello.py');
		echo	shell_exec('whoami');
		for($i=3;$i<=4;$i++)
		{
		}*/
			$fp = fopen("counterlog.txt", "r");
			if(!$fp)
				echo "error";

			// Get the existing count 
			$count = fread($fp, 1024); 

			// Close the file 
			fclose($fp); 
?>
	<script>
	$.get("http://ipinfo.io", function(response) {
		  console.log(response.city,response.country);
	}, "jsonp");
	</script>

	<?php
		date_default_timezone_set('Europe/Zurich');
		$info = getdate();
		$date = $info['mday'];
		$month = $info['mon'];
		$year = $info['year'];
		$hour = $info['hours'];
		$min = $info['minutes'];
		$sec = $info['seconds'];

		$current_date = "$date/$month/$year at $hour:$min:$sec";
		
		$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}"));
			// Add 1 to the existing count
			//avoid developer IP 
			if($ip!="192.168.0.107" and $ip!="94.255.149.252"){
				$count = $count + 1;
				$ip_info = fopen("ip.csv", "a");
				if(!$ip_info)
					echo "error";
				fwrite($ip_info,$ip.",".$details->city.",".$details->region.",".$details->country.",".$details->loc.",".$current_date."\r\n"); 
			}
			// Display the number of hits 
			// If you don't want to display it, comment out this line 
				echo "<div class='hit'><h3>Hit</h3>".$count."</div><br>";
			//echo "<p>Page views:"  "</p>"; 

			// Reopen the file and erase the contents 
			$fp = fopen("counterlog.txt", "w");
			if(!$fp)
				echo "error";
			fwrite($fp, $count);
 
			// Close the file 
			fclose($fp);
//read line number
if($ip=="192.168.0.1007"){
	echo "<html><body><table border='1'>\n\n";
	$f = fopen("ip.csv", "r");
	while (($line = fgetcsv($f)) !== false) {
		      echo "<tr>";
		      foreach ($line as $cell) {
		              echo "<td>" . htmlspecialchars($cell) . "</td>";
		      }
		      echo "</tr>\n";
	}
	fclose($f);
	echo "\n</table></body></html>";

/*
	$lines = file('ip.csv');
	// Loop through our array, show HTML source as HTML source; and line numbers too.
	foreach ($lines as $line_num => $line) {
		echo "<br>Line #<b>{$line_num}</b> : " . htmlspecialchars($line) . "\n";
// send an email with add ip
/*		if($line_num==10){
			$to      = 'byazit@gmail.com';
			$subject = 'all ip address';
			$message = htmlspecialchars($line);
			$headers = 'RaspberryPi' . "\r\n" .
				'Reply-To: RaspberryPi' . "\r\n" .
				'X-Mailer: PHP/' . phpversion();
			mail($to, $subject, $message, $headers);
		}

	}*/
	$info= shell_exec('faillog -u root');
	echo "<p class='textColor'>";
	for($i=40;$i<100;$i++)
		echo $info[$i];
	echo "</p>";
}
	?>
