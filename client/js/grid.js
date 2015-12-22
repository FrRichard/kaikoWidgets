define('grid', ['gridstack','dashboard_conf'], function(Gridstack, Conf) {
	var grid = function(type) {
		var options = {
	  			width: 12,
                                resizable: false,
	    };
	    var gridstack = $('.grid-stack').gridstack(options).data('gridstack');
	    
	    //clean previous grid
	    gridstack.remove_all();

	    _.each(Conf[type], function(widget) {
	    	gridstack.add_widget( '<div class=grid-stack-item > <div class="grid-stack-item-content" id={id}> </div> </div>'.replace('{id}',widget.id),
	    		widget.col,
	    		widget.row,
	    		widget.width,
	    		widget.height
	    	);
	    });
	 
	}

	return grid;
});