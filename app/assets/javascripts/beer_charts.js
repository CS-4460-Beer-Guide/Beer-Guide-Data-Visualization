window.BeerCharts = window.BeerCharts || {};
BeerCharts.formatted_series = [];
BeerCharts.json_data;

BeerCharts.remove_beers_series = function (series_name) {
	for (i=0; i<BeerCharts.scatter_plot.series.length; i++) {
		if (BeerCharts.scatter_plot.series[i].name == series_name) {
			BeerCharts.scatter_plot.series[i].remove(true);
		}
	}
}
BeerCharts.add_beers_series = function (type, type_name) {
	var formatted_series = [];
	$.ajax({
	  url: '/api/beers',
	  cache: true,
	  dataType: "json",		  
	  async: false,
	  data: {	
				type: type,
				type_name: type_name
		},
	  success: function(json_data){
	  	for(i=0; i < json_data.length; i++) {
	  		formatted_series.push({name: json_data[0].type, data: [] });
		  		for(j=0; j < json_data[i].data.length; j++) {

			  		formatted_series[i].data.push({x: parseFloat(json_data[i].data[j].abv), 
			  																		y: parseFloat(json_data[i].data[j].ibu), 
			  																		name: json_data[i].data[j].name, 
			  																		family: json_data[i].data[j].family, 
			  																		sub_family: json_data[i].data[j].sub_family, 
			  																		region: json_data[i].data[j].region,
			  																		brewery: json_data[i].data[j].brewery});		  
		  		}

	  																	
	  	}
	  	
	  	BeerCharts.scatter_plot.addSeries(formatted_series[0], true);
			
	  }
	});	
}



BeerCharts.render_scatter_plot = function() {
	BeerCharts.scatter_plot = new Highcharts.Chart({
					        chart: {
				        	renderTo: 'scatter_plot',
			            type: 'scatter',
			            zoomType: 'xy'
			        },
			        title: {
			            text: 'ABV vs IBU'
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
			                    pointFormat: '<strong>Beer name:</strong> {point.name} <br> <strong>Family:</strong> {point.family} <br><strong>Sub-family:</strong> {point.sub_family} <br> <strong>Region:</strong> {point.region} <br> <strong>Brewery:</strong> {point.brewery} <br> <strong>ABV: </strong> {point.x}% <br> <strong>IBU:</strong> {point.y}'
			                }
			            }
			        },
			        series: []
    });
    
    BeerCharts.scatter_plot.addSeries(BeerCharts.formatted_series[0], true);
	
}