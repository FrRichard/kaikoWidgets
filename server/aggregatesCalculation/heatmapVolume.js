var _ = require('underscore');

var heatmapVolume = function(data, exchange, pair) {

	var data = JSON.parse(data);
	var aggregate = { t:[], v:[], c: [], exchange: exchange, pair: pair, total: 0 };

	aggregate.t = data.t.reduce(function(a, b, index) {
		if (a.indexOf(b) < 0) a.push(b);
		if (!aggregate.v[a.indexOf(b)]) aggregate.v[a.indexOf(b)] = 0;
		if (!aggregate.c[a.indexOf(b)]) aggregate.c[a.indexOf(b)] = 0;
		aggregate.v[a.indexOf(b)] += data.v[index];
		aggregate.c[a.indexOf(b)] = data.c[index];
		return a;
	}, []);

	_.each(aggregate.v, function(v) {
		aggregate.total = aggregate.total + v;
	})

	return aggregate;

}

module.exports = heatmapVolume;