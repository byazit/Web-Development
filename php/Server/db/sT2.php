<script src="js/jquery.js"></script>
<script type="text/javascript" src="js/canvasjs.min.js"></script>
<script type="text/javascript">
$(document).ready(function () {

  $.getJSON("db/data2.php", function (result) {
		mResult=result;
    var chart = new CanvasJS.Chart("chartContainerSave", {
			axisX:{
				title:"Time"
			 },
			axisY:{
				title:"Temperature",
				includeZero: false,
			 },			
      data: [
			{
					type: "spline",
          dataPoints: result
      }/*,
			{        
        type: "column",
        dataPoints: result
      }*/
		        ]
    });

    chart.render();
  });
});
</script>
	<div class="middleTemp">
		<h1 class="middle">System Temperature in &degC in every minute</h1>
		<div id="chartContainerSave"></div>
	</div>
