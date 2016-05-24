

	<script>
			var yValue = 0;
			var i=0;
			var xVal = 0;
			var yVal = 40;	
			var updateInterval = 1000;
			var dataLength = 500; // number of dataPoints visible at any point
			var chart;
			var dps;
			var minVal=45;
			var maxVal=48;



			if(typeof(EventSource)!=="undefined")
			{
				var source=new EventSource("demo_sse.php");
				source.onmessage=function(event)
					{
						// must have float sent to grapth
						updateChart(1,parseFloat(event.data));

						// print the rtesult as text in temp div
						document.getElementById("temp").innerHTML = 'Current system temperature: '+event.data+' &degC';

					};
			}
			else
			{
				document.getElementById("temp").innerHTML="Sorry, your browser does not support server-sent events...";
			}

			window.onload = function ()
			{

				dps = []; // dataPoints

				chart = new CanvasJS.Chart("chartContainer",{
					title :{
						text: ""
					},
			axisX:{
				title:"Time"
			 },
				axisY:{
				title:"Temperature",
					includeZero: false,
				},
					data: [{
						type: "spline",
						dataPoints: dps 
					}]
				});

				updateChart(0,yValue); 
			}

			function updateChart(count,yValue)
			{
			
				//count = count || 1;
				// count is number of times loop runs to generate random dataPoints.
				for (var j = 0; j < count; j++) {	
					//yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
					dps.push({
						x: xVal,
						y: yValue
					});
					xVal++;
				};

				if (dps.length > dataLength)
				{
					dps.shift();				
				}
			
				chart.render();		

			};

			// generates first set of dataPoints
		

			// update chart after specified time. 
			//setInterval(function(){updateChart()}, updateInterval); 
	</script>
	<script type="text/javascript" src="js/canvasjs.min.js"></script>
			<div class="leftTemp">
					<h1 class="middle">System Temperature in &degC</h1>
					<div id="chartContainer"></div>
					<p id="temp"></p>
			</div>

		<!--
		Employee List :
		 <select>
			<option value="Select">Select</option>}
			 <option value="Moyed">Moyed Ansari</option>
			 <option value="Asad">Asadullah</option>
			 <option value="Usman">Usman Ali</option>
		 </select> -->

