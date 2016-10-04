<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = exec('cat /sys/class/thermal/thermal_zone0/temp');
$time=$time/1000;
echo "data:{$time}\n\n";
flush();
?>
