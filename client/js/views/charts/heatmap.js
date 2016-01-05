define('heatmapChart', ['d3', 'moment'], function(d3, moment) {

	var heatmapChart = function() {
		this.init = function(el) {
			var self = this;
			this.margin = {
				top: 100,
				right: 110,
				left: 170,
				bottom: 100
			}

			this.height = $(el).height() - this.margin.bottom - this.margin.top;
			this.width = $(el).width() - this.margin.left - this.margin.right;

			this.svg = d3.select(el).append('svg')
				.attr('class', 'heatmap')
				.attr('width', this.width + this.margin.left + this.margin.right)
				.attr('height', this.height + this.margin.top + this.margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

			this.svg.append('text')
				.text('Total (BTC)')
				.attr('class', 'totallabel')
				.attr('x', function() {
					return self.width + 10;
				})
				.attr('y', function() {
					return -15;
				});

			this.svg.append('text')
				.text('Last hour volume heatmap')
				.attr('class', 'heatmapTitle')
				.attr('x', function() {
					return -self.margin.left + 15;
				})
				.attr('y', function() {
					return -self.margin.top +50;
				});
			this.svg.append('text')
				.attr('id', 'updateTimer')
				.attr('x', function() {
					return -self.margin.left + 15;
				})
				.attr('y', function() {
					return -self.margin.top +80;
				});

			this.svg.append('text')
				.attr('id', 'volumeDetails')
				.attr('x', function() {
					return self.width;
				})
				.attr('y', function() {
					return -15;
				})
				.attr('text-anchor', 'end');


			this.timeScale = d3.time.scale().range([0, self.width]);
		};


		this.update = function(data) {
			this.updateTimer();
			d3.selectAll('rect').remove();
			var minmax = this.getMinMax(data);
			this.colorScale =  d3.scale.linear()
					.range(['#BCCCBC','#052E06'])
					.domain([minmax.min, minmax.max/8, minmax.max]);
			
			var self = this;
			d3.select('.xaxis').remove();
			this.blockNumber = (data.qs.to -data.qs.from)/60;
			this.gridSize = {
				width: Math.floor(this.width/this.blockNumber),
				height: self.height/data.data.length 
			}
			var parsedData = this.orderData(data);

			this.timeScale.domain([data.qs.from, data.qs.to + 60000]);

			this.xAxis = d3.svg.axis()
				.orient("bottom")
				.scale(self.timeScale)
				.ticks(20);

			this.svg.append("g")
	            .attr("class", "xaxis")   
	            .attr("transform", "translate(0," + (self.height + 40) + ")")
	            .call(self.xAxis)
	            .selectAll("text")
	            	.style("text-anchor", "end")
	            	.attr("transform", "rotate(-65)");

			this.draw(parsedData);

		};


		this.draw = function(data) {
			var self = this;
			//default background
			var heatmapBg = self.svg.selectAll('.defaultVolume').data(data.data);
			heatmapBg.enter().append("rect")
					.attr('class','defaultVolume')
				    .attr("x", 0)
					.attr("y", function(d,i) { 
						return (self.gridSize.height+5)*i;
					})
					.attr("width", function() {
						return self.width;
					})
					.attr("height", function() {
						return self.gridSize.height;
					});
			// platform label names
			var exchangelabel = self.svg.selectAll('.exchangelabel').data(data.data);
			exchangelabel.enter().append('text')
				.attr('class', 'exchangelabel')
				.attr('x', -self.margin.left +15)
				.attr('y', function(d,i) {
					return (self.gridSize.height+5)*i+(self.gridSize.height/1.6);
				})
				.text(function(exchange,i) {
					return (exchange.exchange+'  '+exchange.pair.slice(0,3) + '/' + exchange.pair.slice(3,6)).toUpperCase();
				});

			//total volume
			var totallabel = self.svg.selectAll('.total').data(data.data);
			totallabel.enter().append('text')
				.attr('class', 'total')
				.attr('x', self.width+15)
				.attr('y', function(d,i) {
					return (self.gridSize.height+5)*i+(self.gridSize.height/1.6);
				})
				.text(function(exchange,i) {
					return Math.floor(exchange.total*100)/100;
				});

			// heatmap
			_.each(data.data, function(exchange, i) {
				_.each(exchange.t,  function(d,j) {

					self.svg.append("rect")
				    .attr("x", function() { 
				    	return self.timeScale(d);
				    })
					.attr("y", function() { 
						return (self.gridSize.height+5)*i;
					})
					.attr("class", exchange.exchange + "rect")
					.attr("width", function() {
						return self.gridSize.width;
					})
					.attr("height", function() {
						return self.gridSize.height;
					})
					.attr('data-time', function() {
						return d
					})
					.attr('data-value', function() {
						return exchange.v[j];
					})
					.style("fill", function(){
						var color = self.colorScale(exchange.v[j]);
						return color;
					})
					.on('mouseover', function() {
						d3.select(this).style('fill', 'rgb(63, 85, 197)');
						var start = moment(d3.select(this).attr('data-time')*1).format('hh:mm');
						var end = moment(d3.select(this).attr('data-time')*1 +60000).format('hh:mm');
						var value = Math.floor(d3.select(this).attr('data-value')*100)/100;
						d3.select('#volumeDetails').text('Volume from ' + start + ' to ' + end + ' :   ' + value + ' BTC');
					})
					.on('mouseout', function() {
						var color = self.colorScale(exchange.v[j]);
						d3.select(this).style('fill',color);
						d3.select('#volumeDetails').text('');
					});
				})

				// heatmap.exit().remove();
				
			});

		};

		this.orderData = function(data) {
			data.data.sort(function(a,b) {
				return b.total - a.total;
			})
			_.each(data.data, function(d, j) {
				_.each(d.t, function(t, i) {
					data.data[j].t[i] = t * 1000;
				})
			})
			data.qs.to = data.qs.to*1000;
			data.qs.from = data.qs.from*1000;
			return data;
		};

		this.updateTimer = function() {
			var lastUpdate = 0;
			d3.select('#updateTimer').text(function(){
				return 'Updated 0sec ago';
			});
			var interval = setInterval(function() {
				lastUpdate += 1;
				d3.select('#updateTimer').text(function() {
					return 'Updated ' + lastUpdate + 'sec ago';
				})
				if(lastUpdate >= 60) {
					clearInterval(interval);
				}				
			}, 1000);

		}

		this.getMinMax = function(data) {
			var mins =  [];
			var maxs = [];
			_.each(data.data, function(d) {
				mins.push(d3.min(d.v));
			})
			_.each(data.data, function(d) {
				maxs.push(d3.max(d.v));
			})
			var min = d3.min(mins);
			var max = d3.max(maxs);
			return { min:min, max:max };
		}

	}

	return heatmapChart;

});