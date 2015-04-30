<html>
<body>
<h1><font color='red'>Please follow the menu!</font></h1>
<font color='green'>
<p>1. getPartDetails method (example V10-0001) </p>
<p>2. getPartByOENumber method (example OE NO: 357 905 851 D) </p>
<p>3. getPartMake method (audi , vw , citroen etc. Example V10-0001 )</p>
<p>4. getPartPrice method  (example V10-0001)</p>
<p>5. isAvailable method  (example V10-0001)</p>
<p>6. getPartsByMake method  (example FORD)</p>
</font>


  <form action="<?php $_PHP_SELF ?>" method="GET">

<select name="name">
  <option value="0">Select</option>
  <option value="1">Part ID</option>
   <option value="2">OE Number</option>
   <option value="3">Make</option>
   <option value="4">Price</option>
   <option value="5">Available</option>
   <option value="6">Parts Make</option>
 </select> 
  Parameter: <input type="text" name="parameter" />
  <input type="submit"/>
  </form>
</body>
</html>
<?php

class partsCSVparser{
	
	public $readCSV;	
	public $arrp= array();
	function readCSV(){	$this->readCSV=fopen("Test_Parts_List.csv", "r");	}

	function getPartDetails($id){
		while ($row = fgetcsv($this->readCSV,'',';')) {
			if ($row[0] == $id) {          
					$c = count($row);
            for ($x=0;$x<$c;$x++)
            {
                $this->arrp[]=$row[$x];
            }
			}   
		}
		return $this->arrp;
	}

	function getPartByOENumber($id){
		while ($row = fgetcsv($this->readCSV,'',';')) {
			if ($row[2] == $id) {
					$c = count($row);
            for ($x=0;$x<$c;$x++)
            {
                $this->arrp[]=$row[$x];
            }
			}   
		}
		return $this->arrp;
	}

	function getPartMake($id){
		while ($row = fgetcsv($this->readCSV,'',';')) {
			if ($row[0] == $id) {
					$c = count($row);
            for ($x=1;$x<2;$x++)
            {
                $this->arrp[]=$row[$x];
            }
			}   
		}
		return $this->arrp;
	}

	function getPartPrice($id){
		while ($row = fgetcsv($this->readCSV,'',';')) {
			if ($row[0] == $id) {
					$c = count($row);
            for ($x=3;$x<4;$x++)
            {
                $this->arrp[]=$row[$x];
            }

			}   
		}
		return $this->arrp;
	}

	function isAvailable($id){
		while ($row = fgetcsv($this->readCSV,'',';')) {
			if ($row[0] == $id) {
					$this->arrp[] = $row;
			}   
		}
		return $this->arrp;
	}

	function getPartsByMake($id){
		while ($row = fgetcsv($this->readCSV,'',';')) {
			if ($row[1] == $id) {     					
					$c = count($row);
            for ($x=0;$x<1;$x++)
            {
                $this->arrp[]=$row[$x];
            }
			}    
		}
		return $this->arrp;
		fclose($globalRead);
	}
} 

$param=$_GET["parameter"];
$name=$_GET["name"];

$realPrint= new partsCSVparser;
$realPrint-> readCSV();
switch($name){
	case "1":
		$arr=$realPrint-> getPartDetails($param);
		break;
	case "2":
		$arr=$realPrint-> getPartByOENumber($param);
		break;
	case "3":
		$arr=$realPrint-> getPartMake($param);
		break;
	case "4":
		$arr=$realPrint-> getPartPrice($param);
		break;
	case "5":
		$arr=$realPrint-> isAvailable($param);
		break;
	case "6":
		$arr=$realPrint-> getPartsByMake($param);
		break;
	default:
	  echo "";
}

/*foreach ($realPrint->arrp as $k => $v){
	echo implode(',',array_keys($v));
	echo implode(',',$v);
}
*/

	if($arr){
		if($name == '1'|| $name=='2'){
			echo "<table border='1'><tr><td>V/V</td><td>Make</td><td>OE NO</td><td>PRICE eur</td><td>AVAILABLE (09.09.13)</td><td>DESCRIPTION</td><td>WEIGHT</td></tr><tr>";
			$c = count($realPrint->arrp);
      for ($x=0;$x<$c;$x++)
      {
          echo "<td>".$realPrint->arrp[$x]."</td>";
      }
			echo "</tr></table>";
		}

		else if($name=='3'){
			echo "<table border='1'><tr><td>Make</td></tr>";
			$c = count($realPrint->arrp);
      for ($x=0;$x<$c;$x++)
      {
          echo "<tr><td>".$realPrint->arrp[$x]."</td></tr>";
      }
			echo "</table>";
		}

		else if($name=='4'){
			echo "<table border='1'><tr><td>PRICE eur</td></tr>";					
			$c = count($realPrint->arrp);
      for ($x=0;$x<$c;$x++)
      {
          echo "<tr><td>".$realPrint->arrp[$x]."</td></tr>";
      }
			echo "</table>";
		}

		else if($name=='5'){
			$c = count($row);
      for ($x=0;$x<$c;$x++)
      {
          $arr[$x];
      }
			echo "<font color='green'><strong>True</strong></font>";
		}
		else{
			echo "<table border='1'><tr><td>--V/V(  parts id's )--</td></tr></table>";						
			echo "<table border='1'>";					
					$c = count($realPrint->arrp);
            for ($x=0;$x<$c;$x++)
            {
                echo "<tr><td>".$realPrint->arrp[$x]."</td></tr>";
            }
						echo "</table>";
		}
	}
	else if($name=='5'){
		echo "<font color='red'><strong>!!! False !!!</strong></font>";
	}
	else 
		echo "<font color='red'><strong>!!! I couldn't find any information related your search. Please try again !!!</strong></font>"; 





?>


