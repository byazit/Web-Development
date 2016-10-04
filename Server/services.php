
<?php include('includes/head.php'); ?>
<?php include('includes/header.php'); ?>
<?php 
	$extraHdd= exec('df -T -h /dev/sda2');
	$mainHdd= exec('df -T -h /dev/root');
	for($i=22;$i<37;$i++){
		if($i==35){
				$free_ex=$extraHdd[$i-1].$extraHdd[$i];
				$free_main=$mainHdd[$i-2].$mainHdd[$i-1].$mainHdd[$i];
		}
		// didn't fix if disk size is in KB or MB
		//echo $extraHdd[$i]."+".$i."<br>";
		if ($i==23){
				$full_ex=$extraHdd[$i-1].$extraHdd[$i];
				$full_main=$mainHdd[$i-2].$mainHdd[$i-1].$mainHdd[$i];
		}
	}
/*
	echo "<br>".$free_main;
	echo $full_main;
	echo $dataSize;
*/
?>
<!--start HDD size--->
    <script src="js/Chart.js"></script>
		<script  type="text/javascript">
		var free_main="<?php echo $free_main; ?>";
		var full_main="<?php echo $full_main; ?>";
		var free_ex="<?php echo $free_ex; ?>";
		var full_ex="<?php echo $full_ex; ?>";
//		alert(used);
		var pieData;
		var myPie;
		var free = 40;
		var used = 40;
		if(typeof(EventSource)!=="undefined")
		{
			var source=new EventSource("getHddInfo.php");
			source.onmessage=function(event)
				{
					// must have float sent to grapth
					updatePie(parseFloat(free_ex),parseFloat(full_ex)-parseFloat(free_ex));
					updatePieMain(parseFloat(free_main),parseFloat(full_main)-parseFloat(free_main));
//					updateChart(1,parseFloat(event.data));

					// print the rtesult as text in result div
					document.getElementById("result").innerHTML+='[' + event.data + ']' + "<br>";

				};
		}
		else
		{
			document.getElementById("result").innerHTML="Sorry, your browser does not support server-sent events...";
		}

		function updatePie(new_free,new_used)
		{
			free = new_free;
			used = new_used;

			pieData = [
			{
				value : used,
				color : "#FF0000"
			},
			{
				value : free,
				color : "#69D2E7"
			}];
			extraHdd=new Chart(document.getElementById("extraHdd").getContext("2d")).Pie(pieData);
		}
		function updatePieMain(new_free,new_used)
		{
			free = new_free;
			used = new_used;

			pieData = [
			{
				value : used,
				color : "#FF0000"
			},
			{
				value : free,
				color : "#69D2E7"
			}];
			myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);
		}

		window.onload = function ()
		{

			pieData = [
			{
				value : used,
				color : "#FF0000"
			},
			{
				value : free,
				color : "#69D2E7"
			}];

//				myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);
		updatePie(used,free);
		}
</script>
<!---end HDD size script---->
	<hr>
      <div class="row">
        <div class="span8">
			
			<div class="well">
			<h1 style="color:black">Services</h1>
<div class="row">
		<?php include('includes/temp.php'); ?>
		<?php include('db/sT2.php'); ?>
</div>
<div class="row">
		<?php include('db/envTemp.php'); ?>
		<?php include('db/envHum.php'); ?>
</div>
<hr>

		<?php include('includes/hdd.php'); ?>
<!--
<div class="ulPath">
					<ul>
<hr>
						<li>Sed non velit tincidunt eros pulvinar</li>
						<li>Nulla condimentum elit</li>
						<li>Sed non velit tincidunt eros pulvinar</li>
						<li>Nulla condimentum elit</li>
					</ul>
					<p>In interdum rhoncus pharetra. Vivamus diam sem, commodo faucibus vestibulum dictum, suscipit id 
					nulla. Sed est tortor, imperdiet vel pellentesque in, egestas at diam. Donec auctor suscipit dignissim. 
					Donec enim quam, accumsan a feugiat ac, adipiscing nec ipsum. Pellentesque habitant morbi tristique 
					senectus et netus et malesuada fames ac turpis egestas. Nullam placerat consequat nibh. Nulla erat justo, 
					pharetra eu dignissim at, sollicitudin eu arcu.</p>
					<ol>
						<li>Sed non velit tincidunt eros pulvinar</li>
						<li>Nulla condimentum elit</li>
						<li>Sed non velit tincidunt eros pulvinar</li>
						<li>Nulla condimentum elit</li>
					</ol>
					<p>Phasellus suscipit purus in enim pharetra id viverra ante porta. Vestibulum faucibus dictum eleifend. 
					Pellentesque enim orci, tristique id ultrices at, posuere eu diam. Aliquam vel pharetra justo. Ut rutrum 
					pellentesque dolor quis fringilla. Donec tempor eleifend nisi quis ullamcorper. Nullam quis massa ante, 
					at ullamcorper mi. Proin dictum mi fermentum risus sodales posuere. Fusce sollicitudin sagittis pulvinar. 
					Proin eu ipsum ac neque aliquet posuere. Maecenas a mauris nisi.</p>
	</div> -->
			</div>
        </div>

		<div class="span4">
			<p><h3>Deep Sky<small> By <a href="http://commons.wikimedia.org/wiki/File:Nature_1.jpg">Srawat56</a><small><h3></p>
			<a href=#"><img src="img/thumb1.jpg" alt="Thumbnail"></a>
			<p><h3>Deep Sky<small> By <a href="http://commons.wikimedia.org/wiki/File:Nature_1.jpg">Srawat56</a><small><h3></p>
			<a href=#"><img src="img/thumb1.jpg" alt="Thumbnail"></a>
        </div>
      </div>
	  <!--Start second row of columns-->
	  <div class="row">
		<div class="span4">
			<p><h3>Column One</h3></span></p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat sem vel nibh bibendum auctor. 
			Nullam non magna in quam egestas blandit a a justo. Integer vel rhoncus tellus. 
			Vivamus et iaculis tortor. Quisque fermentum arcu dolor. Duis mollis libero et 
			ipsum euismod sed gravida sem pretium. Aliquam eu eros at velit laoreet rhoncus. 
			Nulla a urna eu diam cursus tempor.</p>
		</div>
		<div class="span4">
			<p><h3>Column Two</h3></span></p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat sem vel nibh bibendum auctor. 
			Nullam non magna in quam egestas blandit a a justo. Integer vel rhoncus tellus. 
			Vivamus et iaculis tortor. Quisque fermentum arcu dolor. Duis mollis libero et 
			ipsum euismod sed gravida sem pretium. Aliquam eu eros at velit laoreet rhoncus. 
			Nulla a urna eu diam cursus tempor.</p>
		</div>
		<div class="span4">
			<p><h3>Column Three</h3></span></p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat sem vel nibh bibendum auctor. 
			Nullam non magna in quam egestas blandit a a justo. Integer vel rhoncus tellus. 
			Vivamus et iaculis tortor. Quisque fermentum arcu dolor. Duis mollis libero et 
			ipsum euismod sed gravida sem pretium. Aliquam eu eros at velit laoreet rhoncus. 
			Nulla a urna eu diam cursus tempor.</p>
		</div>
	  </div>

      <hr>
<?php include('includes/footer.php'); ?>

