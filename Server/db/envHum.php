<script src="js/jquery.js"></script>
<script type="text/javascript" src="js/canvasjs.min.js"></script>
<script type="text/javascript">
$(document).ready(function () {

  $.getJSON("db/envHumDB.php", function (result) {
		mResult=result;
    var chart = new CanvasJS.Chart("chartContainerSaveHum", {
			title:{
        text: "Room Humidity in every minute",
				fontSize: 15,    
      },
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
          dataPoints: result,
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
<div class="middleTemp" id="chartContainerSaveHum"></div>

