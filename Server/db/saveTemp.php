
<link rel="stylesheet" href="db/jqx.base.css" type="text/css" />
<script type="text/javascript" src="db/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="db/jqxcore.js"></script>
<script type="text/javascript" src="db/jqxchart.js"></script>	
<script type="text/javascript" src="db/jqxdata.js"></script>
<script type="text/javascript">
	$(document).ready(function () {
		var source =
		{
			 datatype: "json",
			 datafields: [
				 { name: 'OrderDate', type: 'date'},
				 { name: 'Quantity'},
				 { name: 'ProductName'}
			],
			url: 'db/data.php'
		};		
		
	   var dataAdapter = new $.jqx.dataAdapter(source,
		{
			autoBind: true,
			async: false,
			downloadComplete: function () { },
			loadComplete: function () { },
			loadError: function () { }
		});
		
	 // prepare jqxChart settings
		var settings = {
			title: "Saved system temperature",
			description: "Temperature in every minute",
			showLegend: true,
			padding: { left: 5, top: 5, right: 5, bottom: 5 },
			titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
			source: dataAdapter,
			categoryAxis:
				{
					text: 'Category Axis',
					textRotationAngle: 0,
					dataField: 'OrderDate',
					formatFunction: function (value) {
						return $.jqx.dataFormat.formatdate(value, 'dd/MM/yyyy');
					},
					showTickMarks: true,
					tickMarksInterval: Math.round(dataAdapter.records.length / 6),
					tickMarksColor: '#888888',
					unitInterval: Math.round(dataAdapter.records.length / 6),
					showGridLines: true,
					gridLinesInterval: Math.round(dataAdapter.records.length / 3),
					gridLinesColor: '#888888',
					axisSize: 'auto'                    
				},
			colorScheme: 'scheme05',
			seriesGroups:
				[
					{
						type: 'line',
						valueAxis:
						{
							displayValueAxis: true,
							description: 'Temperature',
							//descriptionClass: 'css-class-name',
							axisSize: 'auto',
							tickMarksColor: '#888888',
							unitInterval: 0,
							minValue: 44,
							maxValue: 55                          
						},
						series: [
								{ dataField: 'Quantity', displayText: 'Time' }
						  ]
					}
				]
		};
		// setup the chart
		$('#jqxChart').jqxChart(settings);
	});
</script>

<div class="tempDiv" id="jqxChart" style="height: 300px; width:auto;"></div>

