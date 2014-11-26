window.BeerCharts = window.BeerCharts || {};

BeerCharts.render_scatter_plot = function(branch, family, sub_family) {
	var formatted_data = [];
	$.ajax({
	  url: '/api/beers',
	  cache: true,
	  dataType: "json",		  
	  data: {	
				branch: branch,
				family: family,
				sub_family: sub_family
		},
	  success: function(json_data){
	  	for(i=0; i < json_data.length; i++) {
	  		formatted_data.push([parseFloat(json_data[i].abv), parseFloat(json_data[i].ibu)])
	  	}
			BeerCharts.scatter_plot = new Highcharts.Chart({
					        chart: {
				        	renderTo: 'scatter_plot',
			            type: 'scatter',
			            zoomType: 'xy'
			        },
			        title: {
			            text: 'ABV vs IBU for '+ formatted_data.length + ' beers'
			        },
			        subtitle: {
			            text: 'sub title text goes here'
			        },
			        xAxis: {
			            title: {
			                enabled: true,
			                text: 'Alcohol by volume % (ABV)'
			            },
			            startOnTick: true,
			            endOnTick: true,
			            showLastLabel: true
			        },
			        yAxis: {
			            title: {
			                text: 'International Bitterness Unit (IBU)'
			            }
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'left',
			            verticalAlign: 'top',
			            x: 100,
			            y: 70,
			            floating: true,
			            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
			            borderWidth: 1
			        },
			        plotOptions: {
			            scatter: {
			                marker: {
			                    radius: 5,
			                    states: {
			                        hover: {
			                            enabled: true,
			                            lineColor: 'rgb(100,100,100)'
			                        }
			                    }
			                },
			                states: {
			                    hover: {
			                        marker: {
			                            enabled: false
			                        }
			                    }
			                },
			                tooltip: {
			                    headerFormat: '<b>{series.name}</b><br>',
			                    pointFormat: '{point.x} ABV, {point.y} IBU'
			                }
			            }
			        },
			        series: [{
			            name: 'Beer',
			            color: 'rgba(223, 83, 83, .5)',
			            data: formatted_data
			
			        }]
			    });
	  }
	});
	
}