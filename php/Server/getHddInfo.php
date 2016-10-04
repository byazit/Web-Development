<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
//$time = exec('cat /sys/class/thermal/thermal_zone0/temp');
$time = exec('df -T -h /dev/root');
//$hdd = exec('df -T -h /dev/sda2');
//echo $time;
//$time=$time/1000;
echo "data:{$time[39]}{$time[40]}\n\n";
ob_flush();
echo "data:{$hdd[39]}{$time[40]}\n\n";
flush();
sleep(120);
?>
