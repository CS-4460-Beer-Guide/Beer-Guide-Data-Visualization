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
	  		formatted_data.push({x: parseFloat(json_data[i].abv), y: parseFloat(json_data[i].ibu), name: json_data[i].name, family: json_data[i].family, sub_family: json_data[i].sub_family, region: json_data[i].region});
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
			        		min: 0,
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
			                    headerFormat: '',
			                    pointFormat: '<strong>Beer name:</strong> {point.name} <br> <strong>Region:</strong> {point.region} <br> <strong>ABV: </strong> {point.x} <br> <strong>IBU:</strong> {point.y}'
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