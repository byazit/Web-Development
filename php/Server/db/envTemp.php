<script src="js/jquery.js"></script>
<script type="text/javascript" src="js/canvasjs.min.js"></script>
<script type="text/javascript">
$(document).ready(function () {

  $.getJSON("db/fatchEnvDB.php", function (result) {
		mResult=result;
    var chart = new CanvasJS.Chart("chartContainerSaveTemp", {
			title:{
        text: "Room Temperature in &degC every minute",
				fontSize: 15,    
      },
			axisX:{
				title:"Time"
			 },
			axisY:{
				title:"Temperature",
				includeZero: false
			 },			
      data: [
			{
					type: "spline",
					color: "RoyalBlue",
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

<div class="leftTemp" id="chartContainerSaveTemp"></div>

